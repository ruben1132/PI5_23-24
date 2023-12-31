'use client';

// react
import React, { ChangeEvent, useEffect, useState } from 'react';

// react bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Accordion, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from 'react-bootstrap/CloseButton';

// notification component
import { notify } from '@/components/notification/Notification';

// custom hooks
import { useFetchData, useSubmitData } from '@/util/customHooks';

// models
import { TaskPlanning, TaskPlanningWithTasks } from '@/models/TaskPlanning';

// config
import config from '../../../config/config';
import { Task, TaskWithUser } from '@/models/Task';

interface Props {
    item: {
        value: TaskPlanningWithTasks;
    };
    action: string;
    reFetchData: () => void;
    close: () => void;
}

export default function TaskPlanningForm(props: Props) {
    // fetchers
    const selectBoxTasksDataFetch = useFetchData(config.mptAPI.baseUrl + config.mptAPI.routes.tasksapproved); // fetch approved tasks

    // form submitter
    const planningForm = useSubmitData(config.mptAPI.baseUrl + config.mptAPI.routes.plannings, 'POST');

    // inputs
    const [tasks, setTasks] = useState<TaskWithUser[]>([]);

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // updates the floor and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set floor data
        let item: TaskPlanning = {
            tasks: [],
        };
        item.id = props.item.value?.id;
        item.tasks = tasks.map((item) => item.id);

        // submit data
        let res = await planningForm.submit(item);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Planning added successfully`);
    };

    // filter data so it removes the element(s) already selected
    const filteredSelectBoxData = selectBoxTasksDataFetch?.data?.filter((item: TaskWithUser) => {
        return !tasks?.some((task) => task.id === item.id);
    });

    // add the selected value
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const selectedType = selectBoxTasksDataFetch.data.find((type: TaskWithUser) => type.id === selectedValue);

        const newArray: TaskWithUser[] = [...tasks, selectedType];
        setTasks(newArray);
    };

    const handleRemoveTask = (id: TaskWithUser) => {
        const newArray = tasks.filter((item) => item.id !== id.id);
        setTasks(newArray);
    };

    return (
        <Form>
            {props.action === 'add' ? (
                <Row>
                    <Col sm={4}>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="select">Tasks</Form.Label>
                            <Form.Select onChange={handleSelect} id="select">
                                <option defaultChecked={true}>select a task</option>
                                {filteredSelectBoxData?.map((item: TaskWithUser) => (
                                    <option key={item.id} value={item.id}>
                                        {item.taskType} {' - ' + item.user.name} {' - ' + item.lastUpdated}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col sm={8}>
                        <Form.Group className="mb-8">
                            <Form.Label htmlFor="taskList"></Form.Label>
                            <Accordion >
                                {tasks?.map((item: TaskWithUser, i: number) => (
                                    <Accordion.Item eventKey={i.toString()} key={item.id}>
                                        <Accordion.Header>
                                            {i + ' - ' + item.taskType + ' - ' + item.lastUpdated}
                                            <CloseButton onClick={() => handleRemoveTask(item)} />
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <b>path:</b> {' '}
                                            {item.path.map((pathItem, i) => (
                                                <span key={i}>
                                                    {pathItem}
                                                    {i !== item.path.length - 1 && ' ► '}
                                                </span>
                                            ))}
                                            <br />
                                            <br />
                                            <b>robot movements:</b> {' '}
                                            {item.robotMovements.length === 0 && 'whole floor'}
                                            {item.robotMovements.map((pathItem, index) => (
                                                <span key={index}>
                                                    {`[${pathItem.map((c, i) => `(${c.x}, ${c.y})`).join(', ')}]`}
                                                    {index !== item.robotMovements.length - 1 && ' ► '}
                                                </span>
                                            ))}

                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        
                        </Form.Group>
                    </Col>
                </Row>
            ) : (
                <>
                    <Row>
                        <Col sm={12}>

                            <Accordion >
                                {props.item?.value.tasks.map((item: Task, i: number) => (
                                    <Accordion.Item eventKey={i.toString()} key={item.id}>
                                        <Accordion.Header> {i + ' - ' + item.taskType + ' - ' + item.lastUpdated}</Accordion.Header>
                                        <Accordion.Body>
                                            <b>path:</b> {' '}
                                            {item.path.map((pathItem, i) => (
                                                <span key={i}>
                                                    {pathItem}
                                                    {i !== item.path.length - 1 && ' ► '}
                                                </span>
                                            ))}
                                            <br />
                                            <br />
                                            <b>robot movements:</b> {' '}
                                            {item.robotMovements.length === 0 && 'whole floor'}
                                            {item.robotMovements.map((pathItem, index) => (
                                                <span key={index}>
                                                    {`[${pathItem.map((c, i) => `(${c.x}, ${c.y})`).join(', ')}]`}
                                                    {index !== item.robotMovements.length - 1 && ' ► '}
                                                </span>
                                            ))}

                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </Col>
                    </Row>
                </>
            )}

            <br />
            {props.action === 'add' && (
                <Row>
                    <Col sm={12}>
                        <Form.Group className="mb-12">
                            <Button
                                variant="primary"
                                onClick={handleSubmitData}
                                disabled={tasks?.length === 0 || !enabled}
                            >
                                Create
                            </Button>{' '}
                        </Form.Group>
                    </Col>
                </Row>
            )}
        </Form>
    );
}
