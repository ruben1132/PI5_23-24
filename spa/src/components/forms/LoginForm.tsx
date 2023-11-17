'use client';

import React, { useEffect, useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import config from '../../../config';
import { useFetchData } from '@/util/customHooks';

export default function UserForm() {
    const fetchRoles = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.roles); // fetch roles for userRole
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const handleUserRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserRole(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Username:', userName);
        console.log('User Role:', userRole);
        // You can send the form data to your server or perform other actions.
    };

    useEffect(() => {}, []);

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={userName}
                    onChange={handleUserNameChange}
                />
            </Form.Group>

            <Form.Group controlId="formUserRole">
                <Form.Label>User Role</Form.Label>
                <Form.Select as="select" value={userRole} onChange={handleUserRoleChange}>
                    {fetchRoles.isError && <option>Error loading roles!</option>}
                    {fetchRoles.isLoading && <option>Loading...</option>}
                    {!fetchRoles.isError && !fetchRoles.isLoading && (
                        <>
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </>
                    )}
                </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
