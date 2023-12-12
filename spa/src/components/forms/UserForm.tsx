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
    useFormNumberInput,
    useFormStringInput,
    useDeleteData,
    useFormStringInputWithRegex,
} from '@/util/customHooks';

// models
import { UserWithRole, User } from '@/models/User';
import RoleSelectBox from '../selectBoxes/RoleSelectBox';
import StatusSelectBox from '../selectBoxes/StatusSelectBox';

interface Props {
    item?: {
        value: UserWithRole;
    };
    action: string;
    reFetchData?: () => void;
    close?: () => void;
}

export default function UserForm(props: Props) {
    // fetchers
    const selectBoxRolesDataFetch = useFetchData(config.mptAPI.baseUrl + config.mptAPI.routes.roles); // fetch roles

    // form submitter
    const userForm = useSubmitData(
        config.mptAPI.baseUrl + config.mptAPI.routes.users,
        props.action === 'edit' ? 'PATCH' : 'POST',
    );

    // deleter
    const userDeleter = useDeleteData(config.mptAPI.baseUrl + config.mptAPI.routes.users + props.item?.value.id);

    // inputs
    const userName = useFormStringInput(props.item?.value?.name);
    const userEmail = useFormStringInputWithRegex(props.item?.value?.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const userPassword = useFormStringInputWithRegex(
        '',
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{10,}$/,
    );
    const userPhone = useFormStringInputWithRegex(props.item?.value?.phone, /^9\d{8}$"/);
    const userNif = useFormStringInputWithRegex(props.item?.value?.nif, /^\d{9}$/);
    const userActive = useFormStringInput(props.item?.value?.active ? 'true' : 'false');

    const userRole = useFormStringInput(props.item?.value?.role?.id);

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // updates the user and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        let item: User = {
            name: '',
            email: '',
            phone: '',
            nif: '',
            active: true,
            roleId: '',
        };

        if (props.action === 'edit') {
            item.id = props.item.value.id;
        }
        item.name = userName.value;
        item.email = userEmail.value;
        if (userPassword.value !== '' && userPassword.value !== null) {
            item.password = userPassword.value;
        }
        item.phone = userPhone.value;
        item.nif = userNif.value;
        item.active = userActive.value === 'true' ? true : false;

        item.roleId = userRole.value;

        console.log(item);

        // submit data
        let res = await userForm.submit(item);
        console.log(res);

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

    const handleDeleteData = async () => {
        setEnabled(false);

        // delete data
        let res = await userDeleter.del();

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`User deleted successfully`);

        // close modal
        props.close();
    };

    // when users load, load them to the select box
    useEffect(() => {
        // if there's no data, return
        if (!selectBoxRolesDataFetch.data) {
            return;
        }

        // only load the first role if it's not an edit
        if (props.action !== 'edit') {
            userRole.handleLoad(selectBoxRolesDataFetch.data[0].id);
        }
    }, [selectBoxRolesDataFetch.data]);

    // set user as acive by default
    useEffect(() => {
        if (props.action !== 'edit') {
            userActive.handleLoad('true');
        }
    }, []);

    if (selectBoxRolesDataFetch.isLoading) {
        return <Form>Loading...</Form>;
    }
    if (selectBoxRolesDataFetch.isError) {
        return <Form>Error</Form>;
    }

    // filter data so it removes the element already selected
    const filteredSelectBoxData = selectBoxRolesDataFetch.data.filter(
        (item: any) => item.id !== props.item.value?.role?.id,
    );

    // handle for selecting a role
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        userRole.handleLoad(e.target.value);
    };

    return (
        <Form>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="user's name..."
                            defaultValue={props.item.value?.name}
                            onChange={userName.handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="user's email..."
                            defaultValue={props.item.value?.email}
                            onChange={userEmail.handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="user's phone number"
                            onChange={userPhone.handleChange}
                            defaultValue={userPhone.value}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">NIF</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="user's NIF"
                            onChange={userNif.handleChange}
                            defaultValue={userNif.value}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Status</Form.Label>
                        <StatusSelectBox
                            data={[
                                { status: 'Active', value: 'true' },
                                { status: 'Inactive', value: 'false' },
                            ]}
                            selectedValue={userActive.value === 'true' ? 'true' : 'false'}
                            setValue={userActive.handleLoad}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Role</Form.Label>
                        <RoleSelectBox
                            data={selectBoxRolesDataFetch.data}
                            selectedValue={props.item.value?.role?.id}
                            setValue={userRole.handleLoad}
                            isLoading={selectBoxRolesDataFetch.isLoading}
                            isError={selectBoxRolesDataFetch.isError}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
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
                        <Form.Control type="password" placeholder="*********" onChange={userPassword.handleChange} />
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
                                    disabled={
                                        userName.value === '' ||
                                        !userEmail.isValid ||
                                        !userPhone.isValid ||
                                        !userNif.isValid ||
                                        !enabled
                                    }
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
                                disabled={
                                    userName.value === '' ||
                                    // !userEmail.isValid ||
                                    // !userPhone.isValid ||
                                    // !userNif.isValid ||
                                    
                                    !enabled
                                }
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
