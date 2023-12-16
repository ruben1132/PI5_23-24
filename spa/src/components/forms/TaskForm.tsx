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
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

// notification component
import { notify } from '@/components/notification/Notification';

// config
import config from '../../../config';

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
import { SurveillanceTask } from '@/models/SurveillanceTask';
import { PickupDeliveryTask } from '@/models/PickupDeliveryTask';
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
    const taskType = useFormSelectBoxInput('');
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
        config.mgiAPI.baseUrl +
            (taskType.value === 'Surveillance'
                ? config.mptAPI.routes.taskSurveillance
                : config.mptAPI.routes.taskPickupdelivery),
        props.action === 'edit' ? 'PUT' : 'POST',
    );

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);
    // updates the floor and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set task data
        let item: Task = {
            ...props.item.value,
        };
        item.id = props.item.value?.id;
        // item.path = path.value;

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
        notify.success(`Floor ${props.action == 'edit' ? 'edited' : 'added'} successfully`);
    };

    const handleFindPath = async () => {
        setEnabled(false);

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
                console.log(elev);

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
        const query = '?algorithm=' + algorith.value + '&origin=' + formatedOrig + '&destiny=' + formatedDest;

        setEnabled(true); // enable buttons
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
                        selectedValue={origin.value}
                        setValue={origin.handleLoad}
                        data={passagesDataFecher.data}
                        isError={passagesDataFecher.isError}
                        isLoading={passagesDataFecher.isLoading}
                    />
                );
            case 'elevator':
                return (
                    <ElevatorSelectBox
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
                        selectedValue={destiny.value}
                        setValue={destiny.handleLoad}
                        data={passagesDataFecher.data}
                        isError={passagesDataFecher.isError}
                        isLoading={passagesDataFecher.isLoading}
                    />
                );
            case 'elevator':
                return (
                    <ElevatorSelectBox
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

    return (
        <Form>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Task type</Form.Label>
                        <Form.Select onChange={taskType.handleChange}>
                            <option defaultChecked={true}>Select a type</option>
                            <option value={'Surveillance'}>Surveillance</option>
                            <option value={'PickupDelivery'}>Pickup & Delivery</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
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
            </Row>
            <br />
            {taskType.value === 'Surveillance' ? (
                <>
                    <Row>
                        <Col sm={6}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Building</Form.Label>
                                <BuildingSelectBox
                                    data={buildingsDataFecher.data}
                                    setValue={building.handleLoad}
                                    selectedValue={building.value}
                                    isLoading={buildingsDataFecher.isLoading}
                                    isError={buildingsDataFecher.isError}
                                    data-testid="building-sb"
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Floor</Form.Label>
                                <FloorSelectBox
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
                                <Form.Select onChange={handleChangeOriginType}>
                                    <option defaultChecked={true}>Select a type</option>
                                    <option value={'room'}>Room</option>
                                    <option value={'passage'}>Passage</option>
                                    <option value={'elevator'}>Elevator</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Type of Destiny</Form.Label>
                                <Form.Select onChange={handleChangeDestinyType}>
                                    <option defaultChecked={true}>Select a type</option>
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
                                <Form.Label htmlFor="select">Destinity</Form.Label>
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
                                />
                            </Form.Group>
                        </Col>
                        {props.action === 'edit' && (
                            <Col sm={6}>
                                <Form.Group className="mb-6">
                                    <Form.Label htmlFor="select">Confirmation Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={(props.item.value as PickupDeliveryTask)?.confirmationCode}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            navigator.clipboard.writeText(confirmationCode.value);
                                            notify.success('Confirmation code copied to clipboard');
                                        }}
                                        disabled={true}
                                    />
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
                            <>
                                <Button type="button" variant="success" onClick={handleFindPath}>
                                    Approve
                                </Button>{' '}
                                <Button type="button" variant="danger" onClick={props.close}>
                                    Reject
                                </Button>
                            </>
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
