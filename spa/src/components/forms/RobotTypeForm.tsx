'use client';

// react
import React, { ChangeEvent, useEffect, useState } from 'react';

// react bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from 'react-bootstrap/CloseButton';

// notification component
import { notify } from '@/components/notification/Notification';

// custom hooks
import { useFetchData, useSubmitData, useDeleteData, useFormStringInputWithRegex } from '@/util/customHooks';

// models
import { RobotType, RobotTypeWithTaskTypes } from '@/models/RobotType';

// config
import config from '../../../config';
import { TaskType } from '@/models/TaskType';
import TaskTypeSelectBox from '../selectBoxes/TaskTypeSelectBox';

interface Props {
    item: {
        value: RobotTypeWithTaskTypes;
    };
    action: string;
    reFetchData: () => void;
    close: () => void;
}

export default function RobotTypeForm(props: Props) {
    // fetchers
    const selectBoxTaskTypesDataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.tasktypes); // fetch task types

    // form submitter
    const robotTypeForm = useSubmitData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.robottypes,
        props.action === 'edit' ? 'PUT' : 'POST',
    );

    // deleter
    const robotTypeDeleter = useDeleteData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.robottypes + props.item?.value.id,
    );

    // inputs
    const robotTypeName = useFormStringInputWithRegex(props.item.value?.type, /^[A-Za-z0-9]{1,25}$/);
    const robotTypeBrand = useFormStringInputWithRegex(props.item.value?.brand, /^.{1,50}$/);
    const robotTypeModel = useFormStringInputWithRegex(props.item.value?.model, /^.{1,100}$/);
    const [tasksAllowed, setTasksAllowed] = useState<TaskType[]>([]); 

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // updates the floor and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set floor data
        let item: RobotType = {
            ...props.item.value,
            tasksAllowed: tasksAllowed.map((item) => item.id),
        };
        item.id = props.item.value?.id;
        item.type = robotTypeName.value;
        item.brand = robotTypeBrand.value;
        item.model = robotTypeModel.value;
        item.tasksAllowed = tasksAllowed.map((item) => item.id);

        // submit data
        let res = await robotTypeForm.submit(item);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Robot Type ${props.action == 'edit' ? 'edited' : 'added'} successfully`);
    };

    const handleDeleteData = async () => {
        setEnabled(false);

        // delete data
        let res = await robotTypeDeleter.del();

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Robot Type deleted successfully`);

        // close modal
        props.close();
    };

    // when the action changes, update the tasks allowed
    useEffect(() => {
        if (props.action === 'edit') {
            setTasksAllowed(props.item.value.tasksAllowed);
        }
    }, [props.action]);


    // filter data so it removes the element(s) already selected
    const filteredSelectBoxData = selectBoxTaskTypesDataFetch?.data?.filter((item: TaskType) => {
        return !tasksAllowed.some((task) => task.id === item.id);
    });

    // add the selected value
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const selectedType = selectBoxTaskTypesDataFetch.data.find((type: TaskType) => type.id === selectedValue);

        const newArray: TaskType[] = [...tasksAllowed, selectedType];
        setTasksAllowed(newArray);
    };

    const handleRemoveTaskType = (id: TaskType) => {
        const newArray = tasksAllowed.filter((item) => item.id !== id.id);
        setTasksAllowed(newArray);
    };

    return (
        <Form>
            {props.action === 'edit' && (
                <>
                    <Row>
                        <Col sm={12}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Robot Type ID</Form.Label>
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
                        <Form.Label htmlFor="select">Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="robot type's name..."
                            defaultValue={props.item.value?.type}
                            onChange={robotTypeName.handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="brand">Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="robot type's brand..."
                            defaultValue={props.item.value?.brand}
                            onChange={robotTypeBrand.handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="model">Model</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="robot type's model..."
                            defaultValue={props.item.value?.model}
                            onChange={robotTypeModel.handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Task Types</Form.Label>
                        <TaskTypeSelectBox
                         data={filteredSelectBoxData}
                         isError={selectBoxTaskTypesDataFetch.isError}
                         isLoading={selectBoxTaskTypesDataFetch.isLoading}
                         customHandleChange={handleSelect}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={6}></Col>
                <Col sm={6}>
                    <ListGroup>
                        {tasksAllowed?.map((item) => (
                            <ListGroup.Item key={item.id}>
                                <CloseButton onClick={() => handleRemoveTaskType(item)} />
                                {item.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-12">
                        {props.action === 'edit' ? (
                            <>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmitData}
                                    disabled={
                                        !robotTypeName.isValid ||
                                        !robotTypeBrand.isValid ||
                                        !robotTypeModel.isValid ||
                                        tasksAllowed.length === 0 ||
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
                                    !robotTypeName.isValid ||
                                    !robotTypeBrand.isValid ||
                                    !robotTypeModel.isValid ||
                                    tasksAllowed.length === 0 ||
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
