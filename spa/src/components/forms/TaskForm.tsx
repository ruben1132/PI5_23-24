'use client';

// react
import React, { ChangeEvent, useState } from 'react';

// react bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';

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
} from '@/util/customHooks';

// model
import { Task } from '@/models/Task';
import RoomSelectBox from '../selectBoxes/RoomSelectBox';
import FloorSelectBox from '../selectBoxes/FloorSelectBox';
import ElevatorSelectBox from '../selectBoxes/ElevatorSelectBox';
import { ElevatorWithFloors } from '@/models/Elevator';
import PassageSelectBox from '../selectBoxes/PassageSelectBox';
import { Passage, PassageWithFloor } from '@/models/Passage';
import { Floor } from '@/models/Floor';
import { Room, RoomWithFloor } from '@/models/Room';
import axios from 'axios';

interface Props {
    item: {
        value: Task;
    };
    action: string;
    reFetchData: () => void;
    close: () => void;
}
export default function TaskForm(props: Props) {
    const roomsDataFecher = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.rooms);
    const passagesDataFecher = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.passages);
    const elevatorsDataFecher = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.elevators);

    // form submitter
    const tasksForm = useSubmitData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.tasks,
        props.action === 'edit' ? 'PUT' : 'POST',
    );

    // deleter
    const taskDeleter = useDeleteData(config.mpAPI.baseUrl + config.mpAPI.routes.findPath + props.item?.value.id);

    // inputs
    const originType = useFormStringInput('room');
    const destinyType = useFormStringInput('room');
    const origin = useFormSelectBox(props.item.value?.origin);
    const destiny = useFormSelectBox(props.item.value?.destiny);
    const [path, setPath] = useState<Path>();
    const algorith = useFormSelectBoxInput('');

    const [origElevator, setOrigElevator] = useState<ElevatorWithFloors>({} as ElevatorWithFloors);
    const [destElevator, setDestElevator] = useState<ElevatorWithFloors>({} as ElevatorWithFloors);
    const origFloor = useFormSelectBox('');
    const destFloor = useFormSelectBox('');

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

    const handleDeleteData = async () => {
        setEnabled(false);

        // delete data
        let res = await taskDeleter.del();

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Task deleted successfully`);

        // close modal
        props.close();
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
                formatedOrig = 'elev(' + elev + ')';
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
                formatedDest = 'elev(' + elev + ')';
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
        const query = '?algoritmo=' + algorith.value + '&origem=' + formatedOrig + '&destino=' + formatedDest;

        try {
            const response = await axios(config.mpAPI.baseUrl + config.mpAPI.routes.findPath + query, {
                method: 'GET',
            });

            if (response.status === 200) {
                setEnabled(true);
                notify.success('Path found successfully!');
                setPath(response.data);
                return;
            } else {
                notify.warning('Coud not find a path');
            }
        } catch (err) {
            notify.error('Error while finding a path');
        }

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

    return (
        <Form>
            {props.action === 'edit' && (
                <>
                    <Row>
                        <Col sm={12}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Tasks ID</Form.Label>
                                <Form.Control type="text" defaultValue={props.item.value?.id} disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                </>
            )}
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
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Algorithm</Form.Label>
                        <Form.Select onChange={algorith.handleChange}>
                            <option defaultChecked={true}>Select a type</option>
                            <option value={'astar'}>A*</option>
                            <option value={'dfs'}>Depth-first search </option>
                            <option value={'bfs'}>Breadth-first search </option>
                            <option value={'bdfs'}>Better Depth-first search</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
                    <br />
            <Row>
                <Col sm={12}>
                    {path !==undefined && (
                        <Col sm={12}>
                            <Form.Group controlId="preview" className="mb-3">
                                <Form.Label>Path</Form.Label>
                                <Form.Control
                                    as={'textarea'}
                                    value={JSON.stringify(path, null, 2)}
                                    disabled={true}
                                    style={{ height: '600px' }}
                                />
                            </Form.Group>
                        </Col>
                    )}
                </Col>
            </Row>

            <br />
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-12">
                        {props.action === 'edit' ? (
                            <>
                                <Button
                                    variant="success"
                                    onClick={handleSubmitData}
                                    disabled={
                                        origin.value === '' ||
                                        origin.value === undefined ||
                                        destiny.value === '' ||
                                        destiny.value === undefined ||
                                        path === null ||
                                        algorith.value === '' ||
                                        !enabled
                                    }
                                >
                                    Add
                                </Button>

                                <Button variant="danger" onClick={handleDeleteData}>
                                    Delete
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="primary"
                                onClick={handleFindPath}
                                disabled={
                                    origin.value === '' ||
                                    origin.value === undefined ||
                                    destiny.value === '' ||
                                    destiny.value === undefined ||
                                    path === null ||
                                    algorith.value === '' ||
                                    !enabled
                                }
                            >
                                Find Path
                            </Button>
                        )}
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
