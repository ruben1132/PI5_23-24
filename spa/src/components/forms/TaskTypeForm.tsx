'use client';

// react
import React, { useState } from 'react';

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
import { useFormStringInput, useFormStringInputWithRegex, useSubmitData, useDeleteData } from '@/util/customHooks';

// model
import { TaskType } from '@/models/TaskType';

interface Props {
    item: {
        value: TaskType;
    };
    action: string;
    reFetchData: () => void;
    close: () => void;
}

export default function TaskTypeForm(props: Props) {
    // inputs
    const taskTypeName = useFormStringInputWithRegex(props.item.value?.name, /^[A-Za-z0-9 ]{1,150}$/);
    const taskTypeDescription = useFormStringInputWithRegex(props.item.value?.description, /^[\s\S]{1,250}$/);

    // form submitter
    const buildingForm = useSubmitData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.tasktypes,
        props.action === 'edit' ? 'PUT' : 'POST',
    );

    // deleter
    const buildingDeleter = useDeleteData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.tasktypes + props.item?.value.id,
    );

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // updates the building and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set building data
        let item: TaskType = { ...props.item.value };
        item.id = props.item.value?.id;
        item.name = taskTypeName.value;
        item.description = taskTypeDescription.value;

        // submit data
        let res = await buildingForm.submit(item);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Task Type ${props.action == 'edit' ? 'edited' : 'added'} successfully`);
    };

    const handleDeleteData = async () => {
        setEnabled(false);

        // delete data
        let res = await buildingDeleter.del();

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Task Type deleted successfully`);

        // close modal
        props.close();
    };

    return (
        <Form>
            {props.action === 'edit' && (
                <>
                    <Row>
                        <Col sm={12}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Buildind ID</Form.Label>
                                <Form.Control type="text" defaultValue={props.item.value?.id} disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                </>
            )}

            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="building's code..."
                            defaultValue={props.item.value?.name}
                            onChange={taskTypeName.handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Description</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            placeholder="building's code..."
                            defaultValue={props.item.value?.description}
                            onChange={taskTypeDescription.handleChange}
                            style={{ height: '100px' }}
                        />
                    </Form.Group>
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
                                    disabled={!taskTypeName.isValid || !taskTypeDescription.isValid || !enabled}
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
                                disabled={!taskTypeName.isValid || !taskTypeDescription.isValid || !enabled}
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
