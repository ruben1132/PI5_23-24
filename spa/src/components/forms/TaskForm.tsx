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
import { useFormStringInput, useFormStringInputWithRegex, useSubmitData, useDeleteData, useFetchData } from '@/util/customHooks';

// model
import { Tasks, TasksWithBuildings } from '@/models/Tasks';
import { Building } from '@/models/Building';

interface Props {
    item: {
        value: TasksWithBuildings;
    };
    action: string;
    reFetchData: () => void;
    close: () => void;
}
    export default function TaskForm(props: Props) {

    // form submitter
    const tasksForm = useSubmitData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.tasks,
        props.action === 'edit' ? 'PUT' : 'POST',
    );

    // deleter
    const TasksDeleter = useDeleteData(config.mgiAPI.baseUrl + config.mgiAPI.routes.tasks + props.item?.value.id);

    // inputs
    const TaskBuildinginicial = useFormStringInput(props.item.value?.buildinginicial?.id);
    const TaskFloorInicial = useFormStringInput(props.item.value?.floorInicial?.id);
    const TaskRoomInicial = useFormStringInput(props.item.value?.roomInicial?.id);
    const TaskBuildingFinal = useFormStringInput(props.item.value?.buildingFinal?.id);
    const TaskfloorFinal = useFormStringInput(props.item.value?.floorFinal?.id);
    const TaskRoomFinal = useFormStringInput(props.item.value?.roomFinal?.id);
    const Tasktype = useFormStringInput(props.item.value?.type?.id);

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);
    // updates the floor and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set task data
        let item: Tasks = {
            ...props.item.value,
            buildinginicial: props.item.value?.buildinginicial.id,
            floorInicial: props.item.value?.floorInicial?.id,
            roomInicial: props.item.value?.roomInicial?.id,
            buildingFinal: props.item.value?.buildingFinal?.id,
            floorFinal: props.item.value?.floorFinal?.id,
            roomFinal: props.item.value?.roomFinal?.id,
            type: props.item.value?.type?.id,
        };
        item.id = props.item.value?.id;

        item.buildinginicial = TaskBuildinginicial.value;
        item.floorInicial = TaskFloorInicial.value;
        item.roomInicial = TaskRoomInicial.value;
        item.buildingFinal = TaskBuildingFinal.value;
        item.floorFinal = TaskfloorFinal.value;
        item.roomFinal = TaskRoomFinal.value;
        item.type = Tasktype.value;
        

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
     // handle for selecting a building
     const handleSelectbuilidingInicial = (e: ChangeEvent<HTMLSelectElement>) => {
        TaskBuildinginicial.handleLoad(e.target.value);
    }; 
    const handleSelectbuilidingFinal = (e: ChangeEvent<HTMLSelectElement>) => {
        TaskBuildingFinal.handleLoad(e.target.value);
    };
     const handleSelectFloorInicial = (e: ChangeEvent<HTMLSelectElement>) => {
        TaskFloorInicial.handleLoad(e.target.value);
    }; 
    const handleSelectFloorFinal = (e: ChangeEvent<HTMLSelectElement>) => {
        TaskfloorFinal.handleLoad(e.target.value);
    const handleSelectRoomInicial = (e: ChangeEvent<HTMLSelectElement>) => {
        TaskBuildinginicial.handleLoad(e.target.value);
    }; 
    const handleSelectRoomFinal = (e: ChangeEvent<HTMLSelectElement>) => {
        TaskRoomFinal.handleLoad(e.target.value);
    }; 
    const handleSelectType = (e: ChangeEvent<HTMLSelectElement>) => {
        Tasktype.handleLoad(e.target.value);
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
            </Row>
        </Form>
    );
}
    
}
