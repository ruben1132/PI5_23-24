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
import { useFetchData, useSubmitData, useFormNumberInput, useFormStringInput, useDeleteData } from '@/util/customHooks';

// models
import { Role } from '@/models/Role';
import { UserWithRoleString, User } from '@/models/User';

interface Props {
    item?: {
        value: User;
    };
    action: string;
    reFetchData?: () => void;
    close?: () => void;
}

export default function UserForm(props: Props) {
    // fetchers
    const selectBoxRolesDataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.roles); // fetch roles

    // form submitter
    const userForm = useSubmitData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.roles,
        props.action === 'edit' ? 'PUT' : 'POST',
    );

    // deleter
    const userDeleter = useDeleteData(config.mgiAPI.baseUrl + config.mgiAPI.routes.users + props.item?.value.id);

    // inputs
    const userUsername = useFormStringInput(props.item?.value?.username);
    const userEmail = useFormStringInput(props.item?.value?.email);
    const userPassword = useFormStringInput(props.item?.value?.password);
    const userRole = useFormStringInput(props.item?.value?.role?.id);

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // updates the user and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set user data
        let item: UserWithRoleString = {
            ...props.item.value,
            role: props.item.value?.role?.id,
        };
        item.id = props.item.value?.id;
        item.username = userUsername.value;
        item.email = userEmail.value;
        item.password = userPassword.value;
        item.role = userRole.value;

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

        userRole.handleLoad(selectBoxRolesDataFetch.data[0].id);
    }, [selectBoxRolesDataFetch.data]);

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
                        <Form.Label htmlFor="select">Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="user's username..."
                            defaultValue={props.item.value?.username}
                            onChange={userUsername.handleChange}
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
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Password</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="user's password..."
                            defaultValue={props.item.value?.password}
                            onChange={userPassword.handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Role</Form.Label>

                        <Form.Select
                            defaultValue={props.item.value?.role?.id ?? filteredSelectBoxData[0].id}
                            onChange={handleSelect}
                        >
                            {props.item.value?.role?.id && (
                                <option defaultChecked={true}>{props.item.value?.role?.name}</option>
                            )}

                            {filteredSelectBoxData?.map((item: Role) => (
                                <option key={item.id} value={item.id}>
                                    {/* show 2nd prop from item, 1st prop is the id */}
                                    {item.name}
                                </option>
                            ))}
                        </Form.Select>
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
                                    disabled={userUsername.value === '' || userEmail.value === '' || !enabled}
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
                                disabled={userUsername.value === '' || userEmail.value === '' || !enabled}
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