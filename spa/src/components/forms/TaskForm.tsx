'use client';

// react
import React, { ChangeEvent, useEffect, useState } from 'react';

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
import { useFormStringInput, useFormStringInputWithRegex, useSubmitData, useDeleteData, useFetchData } from '@/util/customHooks';

// model
import { Tasks, TasksWithLocationType } from '@/models/Task';


interface Props {
    item: {
        value: TasksWithLocationType;
    };
    action: string;
    reFetchData: () => void;
    close: () => void;
}
    export default function TaskForm(props: Props) {

    const selectBoxRoomDataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.rooms);
    const selectBoxElevatorDataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.elevators);
    const selectBoxPassageDataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.passages);
    // form submitter
    const tasksForm = useSubmitData(config.mgiAPI.baseUrl + config.mgiAPI.routes.tasks,props.action === 'edit' ? 'PUT' : 'POST',);

    // deleter
    const TasksDeleter = useDeleteData(config.mgiAPI.baseUrl + config.mgiAPI.routes.tasks + props.item?.value.id);

    // inputs
    
    const initialType = useFormStringInput(props.item.value?.initialType?.location);
    const finalType = useFormStringInput(props.item.value?.finalType?.location);
    const path = useFormStringInput(props.item.value?.path);
    

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);
    // updates the floor and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set task data
        let item: Tasks = {
            ...props.item.value,
            initialType: props.item.value?.initialType?.location,
            finalType: props.item.value?.finalType?.location
        };
        item.id = props.item.value?.id;
        item.initialType = initialType.value;
        item.finalType = finalType.value;
        item.path = path.value;

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
        let res = await TasksDeleter.del();

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
    // when floors load, load them to the select box
    useEffect(() => {
        // if there's no data, return
        if (!selectBoxRoomDataFetch.data || selectBoxRoomDataFetch.data.length <= 0) {
            return;
        }

        if(!props.item.value?.initialType?.location){
            initialType.handleLoad(selectBoxRoomDataFetch.data[0].location);
        }
    }, [selectBoxRoomDataFetch.data]);

    if (selectBoxRoomDataFetch.isLoading || selectBoxElevatorDataFetch.isLoading || selectBoxPassageDataFetch.isLoading) {
        return <Form>Loading...</Form>;
    }
    if (selectBoxRoomDataFetch.isError || selectBoxElevatorDataFetch.isError || selectBoxPassageDataFetch.isError) {
        return <Form>Error</Form>;
    }
    if (
        selectBoxRoomDataFetch.data === undefined ||
        selectBoxRoomDataFetch.data === null ||
        selectBoxRoomDataFetch.data.length <= 0
    ) {
        return <Form>Try adding rooms first!</Form>;
    }
    if(selectBoxElevatorDataFetch.data === undefined ||
        selectBoxElevatorDataFetch.data === null ||
        selectBoxElevatorDataFetch.data.length <= 0){
            return <Form>Try adding elevators first!</Form>;
        }
    if(selectBoxPassageDataFetch.data === undefined ||
        selectBoxPassageDataFetch.data === null ||
        selectBoxPassageDataFetch.data.length <= 0){
            return <Form>Try adding passages first!</Form>;
        }


    // filter data so it removes the element already selected
    const filteredSelectBoxData = selectBoxRoomDataFetch.data.filter(
        (item: any) => item.id !== props.item.value?.initialType?.location,
    );

    // handle for selecting a building
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        initialType.handleLoad(e.target.value);
    };

    return (
        <Form>
            {/* {props.action === 'edit' && (
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
                        <Form.Label htmlFor="select">Building Inicial</Form.Label>
                        <Form.Select
                                onChange={handleSelectbuilidingInicial}
                            >
                                {props.item.value?.buildinginicial?.id && (
                                    <option defaultChecked={true}>
                                        {props.item.value?.buildinginicial.code + ' - ' + props.item.value?.buildinginicial.name}
                                    </option>
                                )}
                        </Form.Select>
                    </Form.Group>
                </Col>
               
            </Row>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Floor Inicial</Form.Label>

                        <Form.Select
                            onChange={handleSelectFloorInicial}
                        >
                            {props.item.value?.floorInicial?.id && (
                                <option defaultChecked={true}>
                                    {props.item.value?.floorInicial.id + ' - ' + props.item.value?.floorInicial.number}
                                </option>
                            )}
                        </Form.Select>
                    </Form.Group>
                </Col>
               
            </Row>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Room Inicial</Form.Label>

                        <Form.Select
                            onChange={handleSelectRoomInicial}
                        >
                            {props.item.value?.roomInicial?.id && (
                                <option defaultChecked={true}>
                                    {props.item.value?.roomInicial.id + ' - ' + props.item.value?.roomInicial.number}
                                </option>
                            )}
                        </Form.Select>
                    </Form.Group>
                </Col>
               
            </Row>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Building Final</Form.Label>

                        <Form.Select
                            onChange={handleSelectbuilidingFinal}
                        >
                            {props.item.value?.buildingFinal?.id && (
                                <option defaultChecked={true}>
                                    {props.item.value?.buildingFinal.code + ' - ' + props.item.value?.buildingFinal.name}
                                </option>
                            )}
                        </Form.Select>
                    </Form.Group>
                </Col>
               
            </Row>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Floor Final</Form.Label>

                        <Form.Select
                            onChange={handleSelectFloorFinal}
                        >
                            {props.item.value?.floorFinal?.id && (
                                <option defaultChecked={true}>
                                    {props.item.value?.floorFinal.id + ' - ' + props.item.value?.floorFinal.number}
                                </option>
                            )}
                        </Form.Select>
                    </Form.Group>
                </Col>
               
            </Row>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Room Final</Form.Label>

                        <Form.Select
                            onChange={handleSelectRoomFinal}
                        >
                            {props.item.value?.roomFinal?.id && (
                                <option defaultChecked={true}>
                                    {props.item.value?.roomFinal.id + ' - ' + props.item.value?.roomFinal.number}
                                </option>
                            )}
                        </Form.Select>
                    </Form.Group>
                </Col>
               
            </Row>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Task Type</Form.Label>

                        <Form.Select
                            onChange={handleSelectType}
                        >
                            {props.item.value?.type?.id && (
                                <option defaultChecked={true}>
                                    {props.item.value?.type.id + ' - ' + props.item.value?.type.name}
                                </option>
                            )}
                        </Form.Select>
                    </Form.Group>
                </Col>
               
            </Row>
          
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-12">
                        {props.action === 'edit' ? (
                            <>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmitData}
                                    disabled={
                                        TaskBuildinginicial.value === '' ||
                                        TaskFloorInicial.value === undefined ||
                                        
                                        !enabled
                                    }
                                >
                                    Update
                                </Button>

                                <Button variant="danger" onClick={handleDeleteData}>
                                    Delete
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="success"
                                onClick={handleSubmitData}
                                disabled={
                                    TaskBuildinginicial.value === '' ||
                                    
                                    !enabled
                                }
                            >
                                Add
                            </Button>
                        )}
                    </Form.Group>
                </Col>
            </Row> */}
        </Form>
    );
}
