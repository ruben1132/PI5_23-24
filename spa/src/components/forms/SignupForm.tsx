'use client';

// react
import React, { ChangeEvent, useEffect, useState } from 'react';

// react bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

// notification component
import { notify } from '@/components/notification/Notification';

// config
import config from '../../../config';

// custom hooks
import {
    useFetchData,
    useSubmitData,
    useFormStringInput,
    useDeleteData,
    useFormStringInputWithRegex,
} from '@/util/customHooks';

// models
import { UserSignUp } from '@/models/User';
import RoleSelectBox from '../selectBoxes/RoleSelectBox';
import StatusSelectBox from '../selectBoxes/StatusSelectBox';

export default function SignupForm() {
    // form submitter
    const userForm = useSubmitData(config.authAPI.baseUrl + config.authAPI.routes.signup, 'POST');

    // inputs
    const userName = useFormStringInput('');
    const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@${config.emailDomain}$`);
    const userEmail = useFormStringInputWithRegex('', emailRegex);
    const userPassword = useFormStringInputWithRegex(
        '',
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{10,}$/,
    );
    const userPhone = useFormStringInputWithRegex('', /^9\d{8}$/);
    const userNif = useFormStringInputWithRegex('', /^\d{9}$/);

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // updates the user and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        let item: UserSignUp | null = null;
        item = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value,
            phone: userPhone.value,
            nif: userNif.value,
        };

        // submit data
        let res = await userForm.submit(item);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        setEnabled(true); // enable buttons

        // show alert
        notify.success(`You have signed up successfully. Please wait for the admin to approve your account.`);
    };

    return (
        <Form>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Name</Form.Label>
                        <Form.Control type="text" placeholder="your name..." onChange={userName.handleChange} />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">
                            Email{' '}
                            <OverlayTrigger
                                placement="right"
                                overlay={
                                    <Tooltip id="tooltip-password">
                                        Email must be from the domain {config.emailDomain}.
                                    </Tooltip>
                                }
                            >
                                <FontAwesomeIcon icon={faCircleInfo} size="xs" />
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={'email@' + config.emailDomain}
                            onChange={userEmail.handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">
                            Phone Number{' '}
                            <OverlayTrigger
                                placement="right"
                                overlay={
                                    <Tooltip id="tooltip-password">
                                        Phone number must start with the digit 9 and must have 9 digits.
                                    </Tooltip>
                                }
                            >
                                <FontAwesomeIcon icon={faCircleInfo} size="xs" />
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="9########"
                            onChange={userPhone.handleChange}
                            defaultValue={userPhone.value}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">
                            NIF{' '}
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-password">NIF must have 9 digits.</Tooltip>}
                            >
                                <FontAwesomeIcon icon={faCircleInfo} size="xs" />
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="#########"
                            onChange={userNif.handleChange}
                            defaultValue={userNif.value}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-12">
                        <Form.Label htmlFor="select">
                            Password{' '}
                            <OverlayTrigger
                                placement="right"
                                overlay={
                                    <Tooltip id="tooltip-password">
                                        Password must have at least 10 characters, at least one uppercase and lowercase
                                        letter, one number and one special character.
                                    </Tooltip>
                                }
                            >
                                <FontAwesomeIcon icon={faCircleInfo} size="xs" />
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control type="password" placeholder="**********" onChange={userPassword.handleChange} />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-12">
                        <Button
                            variant="success"
                            onClick={handleSubmitData}
                            disabled={
                                userName.value === '' ||
                                !userEmail.isValid ||
                                !userPhone.isValid ||
                                !userNif.isValid ||
                                !userPassword.isValid ||
                                !enabled
                            }
                        >
                            Add
                        </Button>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
