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
import { get } from 'cypress/types/lodash';
import { skip } from 'node:test';
import { delay } from 'cypress/types/bluebird';
import MeekoLoader from '../loaders/MeekoLoader';

export default function ProfileForm() {
    // auth context
    const { user } = useAuth();

    // console.log(user);

    const getInfo = useFetchData(config.mptAPI.baseUrl + config.mptAPI.routes.userprofile);
    const userData = useFetchData(config.mptAPI.baseUrl + config.mptAPI.routes.userdata);

    // form submitter
    const profileForm = useSubmitData(config.mptAPI.baseUrl + config.mptAPI.routes.userprofile, 'PATCH');

    // deleter
    const profileDeleter = useDeleteData(config.mptAPI.baseUrl + config.mptAPI.routes.userprofile);

    const profileName = useFormStringInput('');
    const profileEmail = useFormStringInput('');
    const profilePhone = useFormStringInputWithRegex('', /^[0-9]{9}$/);
    const profileNif = useFormStringInputWithRegex('', /^[0-9]{9}$/);
    const profilePassword = useFormStringInput('');

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // updates the profile and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set profile data
        let item: Profile | ProfileWithPassword | null = null;

        if (profilePassword.value === '') {
            item = {
                name: profileName.value,
                email: profileEmail.value,
                phone: profilePhone.value,
                nif: profileNif.value,
            };
        } else {
            item = {
                name: profileName.value,
                email: profileEmail.value,
                phone: profilePhone.value,
                nif: profileNif.value,
                password: profilePassword.value,
            };
        }

        console.log(item);

        // submit data
        let res = await profileForm.submit(item);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Profile edited successfully`);
    };

    const handleDownloadData = async () => {
        try {
      
          // Convert data to JSON string
          const jsonData = JSON.stringify(userData, null, 2);
      
          // Create a Blob containing the JSON data
          const blob = new Blob([jsonData], { type: 'application/json' });
      
          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(blob);
      
          // Create a link element
          const link = document.createElement('a');
          link.href = url;
          link.download = 'data.json'; // Set the file name
      
          // Simulate a click on the link to trigger the download
          document.body.appendChild(link);
          link.click();
      
          // Clean up: remove the link and revoke the URL
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error:', error);
          // Handle errors here
        }
      };

    const handleDeleteData = async () => {
        setEnabled(true);

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

    // on load, set the form values
    useEffect(() => {
        profileName.handleLoad(getInfo.data?.name);
        profileEmail.handleLoad(getInfo.data?.email);
        profilePhone.handleLoad(getInfo.data?.phone);
        profileNif.handleLoad(getInfo.data?.nif);
    }, [getInfo.data]);

    if (getInfo.isLoading) {
        return <Form>Loading...</Form>;
    }
    if (getInfo.isError) {
        return <Form>Error</Form>;
    }

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
                            defaultValue={getInfo.data?.name}
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
                            defaultValue={getInfo.data?.email}
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
                            defaultValue={getInfo.data?.nif}
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
                            defaultValue={getInfo.data?.phone}
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
                                !profileNif ||
                                !profilePhone ||
                                !enabled
                            }
                        >
                            Update
                        </Button>
                        {user?.role.name === userRole.UTENTE && (
                            <>
                                {' | '}
                                <Button variant="info" onClick={handleDownloadData}>
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
