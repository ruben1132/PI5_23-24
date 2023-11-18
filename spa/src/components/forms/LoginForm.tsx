'use client';

// react
import React, { useEffect, useState } from 'react';

// config
import config from '../../../config';

// react bootstrap components
import { Form, Button } from 'react-bootstrap';

// auht context
import { useAuth } from '@/context/AuthContext';

// nextjs
import { useRouter } from 'next/navigation';

// notification component
import { notify } from '@/components/notification/Notification';

export default function UserForm() {

    // inputs and button
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(false);

    // auth context
    const { login } = useAuth();

    // router
    const router = useRouter();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async() => {
        setDisableSubmit(true);

        // user data
        const userData = {
            email: email,
            password: password,
        };

        // call the login function to set the user in the context
        const log = await login(userData);
        if (!log) {
            setDisableSubmit(false);
            notify.error('Invalid credentials');
            return;
        }
        console.log('logged in')
        // redirect to the dashboard page
        router.push('/dashboard');
    };

    return (
        <Form>
            <Form.Group controlId="formUserName">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </Form.Group>
            <br />
            <Form.Group controlId="formUserRole">
                <Form.Label>User Role</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="*****"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </Form.Group>
            <br />
            <Button
                variant="success"
                onClick={handleSubmit}
                disabled={disableSubmit || email === '' || password === ''}
            >
                Login
            </Button>
        </Form>
    );
}
