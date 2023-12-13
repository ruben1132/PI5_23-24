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
import { TaskPlanning, TaskPlanningWithTasks } from '@/models/TaskPlanning';

// config
import config from '../../../config';
import { TaskType } from '@/models/TaskType';
import TaskTypeSelectBox from '../selectBoxes/TaskTypeSelectBox';
import { Task } from '@/models/Task';

interface Props {
    item: {
        value: TaskPlanningWithTasks;
    };
    reFetchData: () => void;
    close: () => void;
}

export default function TaskPlanningForm(props: Props) {
    // fetchers
    const selectBoxTasksDataFetch = useFetchData(config.mptAPI.baseUrl + config.mptAPI.routes.tasks); // fetch tasks

    // form submitter
    const robotTypeForm = useSubmitData(config.mptAPI.baseUrl + config.mptAPI.routes.robottypes, 'POST');

    // deleter
    const robotTypeDeleter = useDeleteData(
        config.mptAPI.baseUrl + config.mptAPI.routes.planning + props.item?.value.id,
    );

    // inputs
    const [tasks, setTasks] = useState<Task[]>([]);
    const [allAprovedTasks, setAllAprovedTasks] = useState<boolean>(false);

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // updates the floor and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set floor data
        let item: TaskPlanning = {
            id: '',
            tasks: [],
        };
        item.id = props.item.value?.id;
        item.tasks = tasks.map((item) => item.id);

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
        notify.success(`Planning added successfully`);
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

    // load tasks on mount
    useEffect(() => {
        setTasks(props.item.value.tasks);
    }, []);

    // filter data so it removes the element(s) already selected
    const filteredSelectBoxData = selectBoxTasksDataFetch?.data?.filter((item: TaskType) => {
        return !tasks?.some((task) => task.id === item.id);
    });

    // add the selected value
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const selectedType = selectBoxTasksDataFetch.data.find((type: TaskType) => type.id === selectedValue);

        const newArray: Task[] = [...tasks, selectedType];
        setTasks(newArray);
    };

    const handleRemoveTask = (id: Task) => {
        const newArray = tasks.filter((item) => item.id !== id.id);
        setTasks(newArray);
    };

    return (
        <Form>
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-12">
                        <Form.Check
                            id="withPass"
                            type="checkbox"
                            defaultChecked={false}
                            onChange={(e) => setAllAprovedTasks(e.target.checked)}
                            label={'Make a plan for all aproved tasks'}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            {!allAprovedTasks && (
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-6">
                            <Form.Label htmlFor="select">Tasks</Form.Label>
                            <TaskTypeSelectBox
                                data={filteredSelectBoxData}
                                isError={selectBoxTasksDataFetch.isError}
                                isLoading={selectBoxTasksDataFetch.isLoading}
                                customHandleChange={handleSelect}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <ListGroup>
                            {tasks?.map((item) => (
                                <ListGroup.Item key={item.id}>
                                    <CloseButton onClick={() => handleRemoveTask(item)} />
                                    {item.description}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            )}

            <br />
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-12">
                        <Button variant="primary" onClick={handleSubmitData} disabled={tasks?.length === 0 || !enabled}>
                            Create
                        </Button>{' '}
                        <Button variant="danger" onClick={handleDeleteData}>
                            Delete
                        </Button>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
