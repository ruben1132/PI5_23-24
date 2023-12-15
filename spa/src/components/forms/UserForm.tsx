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
import {
    useSubmitData,
} from '@/util/customHooks';

// models
import { UserWithRole } from '@/models/User';

interface Props {
    item?: {
        value: UserWithRole;
    };
    action: string;
    reFetchData?: () => void;
    close?: () => void;
}

export default function UserForm(props: Props) {

    // form submitter
    const userForm = useSubmitData(
        config.mptAPI.baseUrl + config.mptAPI.routes.usersmain + props.item?.value?.id,
        'PATCH' ,
    );

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // updates the user and refreshes the table
    const handleSubmitData = async (isApproved : boolean) => {
        setEnabled(false);

        // TODO: implementar a parte de aprovar/rejeitar - implmentar endpoint PATCH /users/:id onde receba um DTO apenas com o campo isApproved
        let item = null

        // submit data
        let res = await userForm.submit(item);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`User ${props.action == 'edit' ? 'edited' : 'added'} successfully`);
    };

    return (
        <Form>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="userName">Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="user's name..."
                            defaultValue={props.item?.value?.name}
                            disabled={true}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="userEmail">Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="user's email..."
                            defaultValue={props.item?.value?.email}
                            disabled={true}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="userEmail">Phone Number</Form.Label>
                        <Form.Control type="text" defaultValue={props.item?.value?.phone} disabled={true} />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Group className="mb-6">
                            <Form.Label htmlFor="userEmail">NIF</Form.Label>
                            <Form.Control type="text" defaultValue={props.item?.value?.nif} disabled={true} />
                        </Form.Group>
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-12">
                        <Button
                            id="approve-btn"
                            variant="success"
                            onClick={()=>{handleSubmitData(true)}}
                            disabled={!enabled}
                            data-testid="approve-button"
                        >
                            Approve
                        </Button>{' '}
                        <Button
                            id="approve-btn"
                            variant="danger"
                            onClick={()=>{handleSubmitData(false)}}
                            disabled={!enabled}
                            data-testid="approve-button"
                        >
                            Reject
                        </Button>
                    </Form.Group>
                </Col>
            </Row>
            {/* ... (other rows) */}
        </Form>
    );
}
