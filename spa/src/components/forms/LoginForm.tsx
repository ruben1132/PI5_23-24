'use client';

// react
import React, { useEffect, useState } from 'react';

// config
import config from '../../../config';

// react bootstrap components
import { Form, Button } from 'react-bootstrap';

// fetch data
import { useFetchData } from '@/util/customHooks';

// auht context
import { useAuth } from '@/context/AuthContext';

// nextjs
import { useRouter } from 'next/navigation';

export default function UserForm() {
    // fetch roles
    const fetchRoles = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.roles); // fetch roles for userRole

    // inputs and button
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(false);

    // auth context
    const { login } = useAuth();

    // router
    const router = useRouter();

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const handleUserRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserRole(e.target.value);
    };

    const handleSubmit = () => {
        setDisableSubmit(true);

        // user data
        const userData = {
            username: userName,
            userRole: userRole,
        };

        // call the login function to set the user in the context
        login(userData);
        setDisableSubmit(false);

        // redirect to the dashboard page
        router.push('/dashboard');
    };

    useEffect(() => {
        // set default user role
        if (fetchRoles.data && fetchRoles.data.length > 0) {
            setUserRole(fetchRoles.data[0].name);
        }
    }, [fetchRoles.data]);

    return (
        <Form>
            <Form.Group controlId="formUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={userName}
                    onChange={handleUserNameChange}
                />
            </Form.Group>
            <br />
            <Form.Group controlId="formUserRole">
                <Form.Label>User Role</Form.Label>
                <Form.Select as="select" value={userRole} onChange={handleUserRoleChange}>
                    {fetchRoles.isError && <option>Error loading roles!</option>}
                    {fetchRoles.isLoading && <option>Loading...</option>}
                    {!fetchRoles.isError &&
                        !fetchRoles.isLoading &&
                        fetchRoles.data.map((role: any) => (
                            <option key={role.id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                </Form.Select>
            </Form.Group>
            <br />
            <Button
                variant="success"
                onClick={handleSubmit}
                disabled={disableSubmit || userName === '' || userRole === ''}
            >
                Login
            </Button>
        </Form>
    );
}
