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
import config, { userRole } from '../../../config';

// custom hooks
import {
    useFetchData,
    useSubmitData,
    useFormStringInputWithRegex,
    useFormStringInput,
    useDeleteData,
} from '@/util/customHooks';

import { useAuth } from '@/context/AuthContext';

// models
import { Profile, ProfileWithPassword } from '@/models/Profile';

export default function ProfileForm() {
    // auth context
    const { user } = useAuth();

    // console.log(user);

    const getInfo = useFetchData(config.mptAPI.baseUrl + config.mptAPI.routes.users + "/profile");

    console.log(getInfo);

    // form submitter
    const profileForm = useSubmitData(config.mgiAPI.baseUrl + config.mgiAPI.routes.roles, 'PATCH');

    // deleter
    const profileDeleter = useDeleteData(config.mgiAPI.baseUrl + config.mgiAPI.routes.profiles + 'user id here');

    // inputs
    const profileName = useFormStringInput('user name here');
    const profileEmail = useFormStringInput('user email here');
    const profilePhone = useFormStringInputWithRegex('987654321', /^[0-9]{9}$/);
    const profileNif = useFormStringInputWithRegex('123456789', /^[0-9]{9}$/);
    const profilePassword = useFormStringInput('');

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // updates the profile and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set profile data
        let item: Profile | ProfileWithPassword = {
            id: '',
            name: '',
            email: '',
            phone: 987654321,
            nif: 123456789,
            password: '',
        };

        item.name = profileName.value;
        item.email = profileEmail.value;
        item.nif = parseInt(profileNif.value);
        item.password = profilePassword.value;

        // submit data
        let res = await profileForm.submit(item);
        console.log(res);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Profile edited successfully`);
    };

    const handleDeleteData = async () => {
        setEnabled(false);

        // delete data
        let res = await profileDeleter.del();

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Profile deleted successfully`);
    };

    return (
        <Form>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Name</Form.Label>
                        <Form.Control
                            id="profileName"
                            type="text"
                            placeholder="your name..."
                            defaultValue={profileName.value}
                            onChange={profileName.handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Email</Form.Label>
                        <Form.Control
                            id="profileEmail"
                            type="email"
                            placeholder="your email..."
                            defaultValue={profileEmail.value}
                            onChange={profileEmail.handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">NIF</Form.Label>
                        <Form.Control
                            id="profileNif"
                            type="text"
                            placeholder="your nif..."
                            defaultValue={profileNif.value}
                            onChange={profileNif.handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Phone</Form.Label>
                        <Form.Control
                            id="profilePhone"
                            type="text"
                            placeholder="your nif..."
                            defaultValue={profileNif.value}
                            onChange={profileNif.handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Password</Form.Label>
                        <Form.Control type="password" placeholder="*********" onChange={profilePassword.handleChange} />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-12">
                        <Button
                            variant="primary"
                            onClick={handleSubmitData}
                            disabled={
                                profileName.value === '' ||
                                profileEmail.value === '' ||
                                !profileNif.isValid ||
                                !profilePhone.isValid ||
                                !enabled
                            }
                        >
                            Update
                        </Button>
                        {user?.role.name === userRole.UTENTE && (
                            <>
                                {' | '}
                                <Button variant="info" onClick={handleDeleteData}>
                                    Download my personal data
                                </Button>
                                {' | '}
                                <Button variant="danger" onClick={handleDeleteData}>
                                    Delete Account
                                </Button>
                            </>
                        )}
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
