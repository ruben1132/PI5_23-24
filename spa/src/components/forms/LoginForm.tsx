'use client';

// react
import React, { useState } from 'react';

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

    const handleSubmit = async () => {
        setDisableSubmit(true);

        // call the login function to set the user in the context
        const log = await login(email, password);
        if (!log) {
            setDisableSubmit(false);
            notify.error('Invalid credentials');
            return;
        }
        // redirect to the dashboard page
        router.push('/dashboard');
    };

    return (
        <Form>
            <Form.Group controlId="formUserName">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </Form.Group>
            <br />
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    id="password"
                    type="password"
                    placeholder="*****"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </Form.Group>
            <br />
            <Button
                id='login-btn'
                variant="success"
                onClick={handleSubmit}
                disabled={disableSubmit || email === '' || password === ''}
            >
                Login
            </Button>
        </Form>
    );
}
