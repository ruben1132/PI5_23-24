'use client';

// react
import React, { ChangeEvent, useEffect, useState } from 'react';

// react bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faClipboard } from '@fortawesome/free-solid-svg-icons';

// notification component
import { notify } from '@/components/notification/Notification';

// config
import config, { userRole } from '../../../config';

// auth context
import { useAuth } from '@/context/AuthContext';

// custom hooks
import {
    useFormStringInput,
    useSubmitData,
    useDeleteData,
    useFetchData,
    useFormSelectBox,
    useFormSelectBoxInput,
    useFormStringInputWithRegex,
} from '@/util/customHooks';

// model
import { Task } from '@/models/Task';
import RoomSelectBox from '../selectBoxes/RoomSelectBox';
import FloorSelectBox from '../selectBoxes/FloorSelectBox';
import ElevatorSelectBox from '../selectBoxes/ElevatorSelectBox';
import { ElevatorWithFloors } from '@/models/Elevator';
import PassageSelectBox from '../selectBoxes/PassageSelectBox';
import { PassageWithFloor } from '@/models/Passage';
import { Floor } from '@/models/Floor';
import { RoomWithFloor } from '@/models/Room';
import axios from 'axios';
import { CreateSurveillanceTask, SurveillanceTask } from '@/models/SurveillanceTask';
import { CreatePickupDeliveryTask, PickupDeliveryTask } from '@/models/PickupDeliveryTask';
import BuildingSelectBox from '../selectBoxes/BuildingSelectBox';

interface Props {
    item: {
        value: SurveillanceTask | PickupDeliveryTask;
    };
    action: string;
    reFetchData: () => void;
    close: () => void;
}
export default function TaskForm(props: Props) {
    // auth context
    const { user } = useAuth();

    // data fetchers
    const roomsDataFecher = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.rooms);
    const passagesDataFecher = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.passages);
    const elevatorsDataFecher = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.elevators);
    const buildingsDataFecher = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings);

    const building = useFormStringInput('');

    const floorsDataFecher = useFetchData(
        `${config.mgiAPI.baseUrl}${config.mgiAPI.routes.floors}${
            building.value ? '/buildingId/' + building.value : ''
        }`,
    );

    // inputs
    const originType = useFormStringInput('room');
    const destinyType = useFormStringInput('room');
    const origin = useFormSelectBox((props.item.value as PickupDeliveryTask)?.origin);
    const destiny = useFormSelectBox((props.item.value as PickupDeliveryTask)?.destiny);
    const taskType = useFormSelectBoxInput(props.item.value.taskType ?? '');
    const algorith = useFormSelectBoxInput('');

    const [origElevator, setOrigElevator] = useState<ElevatorWithFloors>({} as ElevatorWithFloors);
    const [destElevator, setDestElevator] = useState<ElevatorWithFloors>({} as ElevatorWithFloors);
    const origFloor = useFormSelectBox('');
    const destFloor = useFormSelectBox('');

    // surveillance task inputs
    const phoneNumber = useFormStringInputWithRegex((props.item.value as SurveillanceTask)?.phoneNumber, /^9\d{8}$/);
    const floor = useFormSelectBox((props.item.value as SurveillanceTask)?.floorCode);

    // pickup delivery task inputs
    const pickupPersonName = useFormStringInput((props.item.value as PickupDeliveryTask)?.pickupPersonName);
    const pickupPersonPhoneNumber = useFormStringInputWithRegex(
        (props.item.value as PickupDeliveryTask)?.pickupPersonPhoneNumber,
        /^9\d{8}$/,
    );
    const deliveryPersonName = useFormStringInput((props.item.value as PickupDeliveryTask)?.deliveryPersonName);
    const deliveryPersonPhoneNumber = useFormStringInputWithRegex(
        (props.item.value as PickupDeliveryTask)?.deliveryPersonPhoneNumber,
        /^9\d{8}$/,
    );
    const taskDescription = useFormStringInput((props.item.value as PickupDeliveryTask)?.taskDescription);
    const confirmationCode = useFormStringInput((props.item.value as PickupDeliveryTask)?.confirmationCode);

    // form submitter
    const tasksForm = useSubmitData(
        config.mptAPI.baseUrl +
            (taskType.value === 'Surveillance'
                ? config.mptAPI.routes.taskSurveillance
                : config.mptAPI.routes.taskPickupdelivery),
        props.action === 'edit' ? 'PUT' : 'POST',
    );

    const taskFormApproval = useSubmitData(
        config.mptAPI.baseUrl + config.mptAPI.routes.tasks + '/' + props.item.value?.id,
        'PATCH',
    );

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // submits a task
    const handleSubmitData = async () => {
        setEnabled(false);

        let item: CreateSurveillanceTask | CreatePickupDeliveryTask | null = null;

        if (taskType.value === 'Surveillance') {
            item = {
                phoneNumber: phoneNumber.value,
                floorId: floor.value,
            };
        } else {
            const { originParsed, destinyParsed } = handleParse();

            item = {
                parsedOrigin: originParsed,
                originType: originType.value,
                origin: origin.value,
                parsedDestiny: destinyParsed,
                destinyType: destinyType.value,
                destiny: destiny.value,
                pickupPersonName: pickupPersonName.value,
                pickupPersonPhoneNumber: pickupPersonPhoneNumber.value,
                deliveryPersonName: deliveryPersonName.value,
                deliveryPersonPhoneNumber: deliveryPersonPhoneNumber.value,
                taskDescription: taskDescription.value,
            };
        }

        // submit data
        let res = await tasksForm.submit(item);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons
        // show alert
        notify.success(`Task ${props.action == 'edit' ? 'updated' : 'submitted'} successfully`);
    };

    // TODO: approve/reject a stask
    const handleUpdateData = async (isApproved: string) => {
        setEnabled(false);

        let item = {
            isApproved: isApproved,
        };

        // submit data
        let res = await taskFormApproval.submit(item);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons
        notify.success(`Task ${isApproved} successfully`); // show alert
        props.close(); // close modal
    };

    const handleParse = (): { originParsed: string; destinyParsed: string } => {
        let formatedOrig = '';
        let formatedDest = '';

        // finders
        const passFinder = (id: string): PassageWithFloor | undefined => {
            return passagesDataFecher.data.find((p: PassageWithFloor) => p.id === id);
        };

        const floorFinder = (id: string, type: string): Floor | undefined => {
            if (type === 'orig') {
                return origElevator.floorsAllowed.find((e: Floor) => e.id === id);
            }
            return destElevator.floorsAllowed.find((e: Floor) => e.id === id);
        };

        const roomFinder = (id: string): RoomWithFloor | undefined => {
            const cd = roomsDataFecher.data.find((r: RoomWithFloor) => r.id === id);
            return cd;
        };

        // format origin and destiny
        switch (originType.value) {
            case 'elevator':
                const elev = floorFinder(origFloor.value, 'orig');
                formatedOrig = 'elev(' + elev.code + ')';
                break;
            case 'passage':
                const pass = passFinder(origin.value);
                formatedOrig = 'pass(' + pass?.fromFloor.code + ',' + pass?.toFloor.code + ')';
                break;
            case 'room':
                const room = roomFinder(origin.value);
                formatedOrig = 'sala(' + room?.number + ')';
                break;
            default:
                break;
        }

        switch (destinyType.value) {
            case 'elevator':
                const elev = floorFinder(destFloor.value, 'dest');
                formatedDest = 'elev(' + elev.code + ')';
                break;
            case 'passage':
                const pass = passFinder(destiny.value);
                formatedDest = 'pass(' + pass?.fromFloor.code + ',' + pass?.toFloor.code + ')';
                break;
            case 'room':
                const room = roomFinder(destiny.value);
                formatedDest = 'sala(' + room?.number + ')';
                break;
            default:
                break;
        }

        // set query
        return { originParsed: formatedOrig, destinyParsed: formatedDest };
    };
    // handle for selecting origin type
    const handleChangeOriginType = (e: ChangeEvent<HTMLSelectElement>) => {
        originType.handleLoad(e.target.value);
    };

    // handle for selecting destiny type
    const handleChangeDestinyType = (e: ChangeEvent<HTMLSelectElement>) => {
        destinyType.handleLoad(e.target.value);
    };

    // filter select box for origin
    const OriginSelectBox = () => {
        switch (originType.value) {
            case 'room':
                return (
                    <RoomSelectBox
                        disabled={props.action === 'edit'}
                        selectedValue={origin.value}
                        setValue={origin.handleLoad}
                        data={roomsDataFecher.data}
                        isError={roomsDataFecher.isError}
                        isLoading={roomsDataFecher.isLoading}
                    />
                );
            case 'passage':
                return (
                    <PassageSelectBox
                        disabled={props.action === 'edit'}
                        selectedValue={origin.value ?? passagesDataFecher.data[0].id}
                        setValue={origin.handleLoad}
                        data={passagesDataFecher.data}
                        isError={passagesDataFecher.isError}
                        isLoading={passagesDataFecher.isLoading}
                    />
                );
            case 'elevator':
                return (
                    <ElevatorSelectBox
                        disabled={props.action === 'edit'}
                        selectedValue={origin.value ?? elevatorsDataFecher.data[0].id}
                        setValue={origin.handleLoad}
                        setObj={setOrigElevator}
                        data={elevatorsDataFecher.data}
                        isError={elevatorsDataFecher.isError}
                        isLoading={elevatorsDataFecher.isLoading}
                    />
                );
            default:
                return <></>;
        }
    };

    // filter select box for destiny
    const DestinySelectBox = () => {
        switch (destinyType.value) {
            case 'room':
                return (
                    <RoomSelectBox
                        disabled={props.action === 'edit'}
                        selectedValue={destiny.value}
                        setValue={destiny.handleLoad}
                        data={roomsDataFecher.data}
                        isError={roomsDataFecher.isError}
                        isLoading={roomsDataFecher.isLoading}
                    />
                );
            case 'passage':
                return (
                    <PassageSelectBox
                        disabled={props.action === 'edit'}
                        selectedValue={destiny.value ?? passagesDataFecher.data[0].id}
                        setValue={destiny.handleLoad}
                        data={passagesDataFecher.data}
                        isError={passagesDataFecher.isError}
                        isLoading={passagesDataFecher.isLoading}
                    />
                );
            case 'elevator':
                return (
                    <ElevatorSelectBox
                        disabled={props.action === 'edit'}
                        selectedValue={destiny.value ?? elevatorsDataFecher.data[0].id}
                        setValue={destiny.handleLoad}
                        setObj={setDestElevator}
                        data={elevatorsDataFecher.data}
                        isError={elevatorsDataFecher.isError}
                        isLoading={elevatorsDataFecher.isLoading}
                    />
                );
            default:
                return <></>;
        }
    };

    // when building changes, load the floors
    useEffect(() => {
        if (building.value) {
            floorsDataFecher.revalidate();

            floor.handleReset();
        }
    }, [building.value]);

    // when loads the buildings, select the first one
    useEffect(() => {
        if (buildingsDataFecher.data && buildingsDataFecher.data.length > 0) {
            building.handleLoad(buildingsDataFecher.data[0].id);
        }
    }, [buildingsDataFecher.data]);

    // when rooms load, select the first one
    useEffect(() => {
        if (roomsDataFecher.data && roomsDataFecher.data.length > 0) {
            origin.handleLoad(roomsDataFecher.data[0].id);
            destiny.handleLoad(roomsDataFecher.data[1]?.id ?? roomsDataFecher.data[0].id);
        }
    }, [roomsDataFecher.data]);

    return (
        <Form>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Task type</Form.Label>
                        <Form.Select onChange={taskType.handleChange} disabled={props.action === 'edit'}>
                            <option defaultChecked={true}>{props.item?.value?.taskType ?? 'Select a type'}</option>
                            <option value={'Surveillance'}>Surveillance</option>
                            <option value={'PickupDelivery'}>Pickup & Delivery</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                {props.action === 'add' && (
                    <Col sm={6}>
                        <Form.Group className="mb-6">
                            <Form.Label htmlFor="select">Algorithm</Form.Label>
                            <Form.Select onChange={algorith.handleChange}>
                                <option defaultChecked={true}>Select a algotithm</option>
                                <option value={'astar'}>A*</option>
                                <option value={'dfs'}>Depth-first search </option>
                                <option value={'bfs'}>Breadth-first search </option>
                                <option value={'bdfs'}>Better Depth-first search</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                )}
            </Row>
            <br />
            {taskType.value === 'Surveillance' ? (
                <>
                    <Row>
                        {props.action !== 'edit' && (
                            <Col sm={6}>
                                <Form.Group className="mb-6">
                                    <Form.Label htmlFor="select">Building</Form.Label>
                                    <BuildingSelectBox
                                        disabled={props.action === 'edit'}
                                        data={buildingsDataFecher.data}
                                        setValue={building.handleLoad}
                                        selectedValue={building.value}
                                        isLoading={buildingsDataFecher.isLoading}
                                        isError={buildingsDataFecher.isError}
                                        data-testid="building-sb"
                                    />
                                </Form.Group>
                            </Col>
                        )}

                        <Col sm={6}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Floor</Form.Label>
                                <FloorSelectBox
                                    disabled={props.action === 'edit'}
                                    setValue={floor.handleLoad}
                                    data={floorsDataFecher.data}
                                    isError={floorsDataFecher.isError}
                                    isLoading={floorsDataFecher.isLoading}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={6}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">
                                    Phone Number{' '}
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip id="tooltip-password">
                                                Phone number must start with the digit 9 and must have 9 digits.
                                            </Tooltip>
                                        }
                                    >
                                        <FontAwesomeIcon icon={faCircleInfo} size="xs" />
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={phoneNumber.value}
                                    onChange={phoneNumber.handleChange}
                                    disabled={props.action === 'edit'}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </>
            ) : (
                <>
                    <Row>
                        <Col sm={6}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Type of Origin</Form.Label>
                                <Form.Select onChange={handleChangeOriginType} disabled={props.action === 'edit'}>
                                    <option defaultChecked={true}>
                                        {(props.item?.value as PickupDeliveryTask)?.originType ?? 'Select a type'}
                                    </option>
                                    <option value={'room'}>Room</option>
                                    <option value={'passage'}>Passage</option>
                                    <option value={'elevator'}>Elevator</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Type of Destiny</Form.Label>
                                <Form.Select onChange={handleChangeDestinyType} disabled={props.action === 'edit'}>
                                    <option defaultChecked={true}>
                                        {(props.item?.value as PickupDeliveryTask)?.destinyType ?? 'Select a type'}
                                    </option>
                                    <option value={'room'}>Room</option>
                                    <option value={'passage'}>Passage</option>
                                    <option value={'elevator'}>Elevator</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={6}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Origin</Form.Label>
                                <OriginSelectBox />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Destiny</Form.Label>
                                <DestinySelectBox />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={6}>
                            {originType.value === 'elevator' && (
                                <Form.Group className="mb-6">
                                    <Form.Label htmlFor="select">Floor</Form.Label>
                                    <FloorSelectBox
                                        disabled={props.action === 'edit'}
                                        selectedValue={origFloor.value}
                                        setValue={origFloor.handleLoad}
                                        data={origElevator.floorsAllowed}
                                        isError={elevatorsDataFecher.isError}
                                        isLoading={elevatorsDataFecher.isLoading}
                                    />
                                </Form.Group>
                            )}
                        </Col>
                        <Col sm={6}>
                            {destinyType.value === 'elevator' && (
                                <Form.Group className="mb-6">
                                    <Form.Label htmlFor="select">Floor</Form.Label>
                                    <FloorSelectBox
                                        disabled={props.action === 'edit'}
                                        selectedValue={destFloor.value}
                                        setValue={destFloor.handleLoad}
                                        data={destElevator.floorsAllowed}
                                        isError={elevatorsDataFecher.isError}
                                        isLoading={elevatorsDataFecher.isLoading}
                                    />
                                </Form.Group>
                            )}
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={6}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Pickup Person Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={pickupPersonName.value}
                                    onChange={pickupPersonName.handleChange}
                                    disabled={props.action === 'edit'}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">
                                    Pickup Person's Phone Number{' '}
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip id="tooltip-password">
                                                Phone number must start with the digit 9 and must have 9 digits.
                                            </Tooltip>
                                        }
                                    >
                                        <FontAwesomeIcon icon={faCircleInfo} size="xs" />
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={pickupPersonPhoneNumber.value}
                                    onChange={pickupPersonPhoneNumber.handleChange}
                                    disabled={props.action === 'edit'}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={6}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Delivery Person Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={deliveryPersonName.value}
                                    onChange={deliveryPersonName.handleChange}
                                    disabled={props.action === 'edit'}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">
                                    Delivery Person's Phone Number{' '}
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip id="tooltip-password">
                                                Phone number must start with the digit 9 and must have 9 digits.
                                            </Tooltip>
                                        }
                                    >
                                        <FontAwesomeIcon icon={faCircleInfo} size="xs" />
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={deliveryPersonPhoneNumber.value}
                                    onChange={deliveryPersonPhoneNumber.handleChange}
                                    disabled={props.action === 'edit'}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />

                    <Row>
                        <Col sm={6}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={taskDescription.value}
                                    onChange={taskDescription.handleChange}
                                    disabled={props.action === 'edit'}
                                />
                            </Form.Group>
                        </Col>
                        {props.action === 'edit' && (
                            <Col sm={6}>
                                <Form.Group className="mb-6">
                                    <Form.Label htmlFor="select">Confirmation Code</Form.Label>
                                    <div
                                        style={{ position: 'relative', display: 'inline-block' }}
                                        onClick={() => {
                                            navigator.clipboard.writeText(confirmationCode.value);
                                            notify.success('Confirmation code copied to clipboard');
                                        }}
                                    >
                                        <Form.Control
                                            type="text"
                                            style={{
                                                cursor: 'pointer',
                                                position: 'absolute',
                                                opacity: 0,
                                                pointerEvents: 'none',
                                                backgroundColor: '#e9e9e9',
                                            }}
                                            disabled={true}
                                        />
                                        <Form.Control
                                            type="text"
                                            defaultValue={(props.item.value as PickupDeliveryTask)?.confirmationCode}
                                            style={{ cursor: 'pointer', backgroundColor: '#e9e9e9' }}
                                            readOnly
                                        />
                                        <FontAwesomeIcon
                                            icon={faClipboard}
                                            style={{
                                                position: 'absolute',
                                                cursor: 'pointer',
                                                right: '5px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: '#555',
                                            }}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                        )}
                    </Row>
                </>
            )}

            <br />
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-12">
                        {props.action === 'edit' ? (
                            user?.role.name !== userRole.UTENTE && (
                                <>
                                    <Button
                                        type="button"
                                        variant="success"
                                        onClick={() => handleUpdateData(config.states.APPROVED)}
                                    >
                                        Approve
                                    </Button>{' '}
                                    <Button
                                        type="button"
                                        variant="danger"
                                        onClick={() => handleUpdateData(config.states.REJECTED)}
                                    >
                                        Reject
                                    </Button>
                                </>
                            )
                        ) : (
                            <Button
                                variant="success"
                                onClick={handleSubmitData}
                                disabled={
                                    taskType.value === '' ||
                                    algorith.value === '' ||
                                    !enabled ||
                                    (taskType.value === 'Surveillance'
                                        ? !phoneNumber.isValid || floor.value === ''
                                        : origin.value === '' ||
                                          originType.value === '' ||
                                          destiny.value === '' ||
                                          destinyType.value === '' ||
                                          (originType.value === 'elevator' && origFloor.value === '') ||
                                          (destinyType.value === 'elevator' && destFloor.value === '') ||
                                          pickupPersonName.value === '' ||
                                          !pickupPersonPhoneNumber.isValid ||
                                          deliveryPersonName.value === '' ||
                                          !deliveryPersonPhoneNumber.isValid)
                                }
                            >
                                Add
                            </Button>
                        )}
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
