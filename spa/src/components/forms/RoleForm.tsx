'use client';

// react
import React, { useEffect, useState } from 'react';

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
import { useFormStringInput, useFormStringInputWithRegex, useSubmitData, useDeleteData } from '@/util/customHooks';

// model
import { Role } from '@/models/Role';
import StatusSelectBox from '../selectBoxes/StatusSelectBox';

interface Props {
    item: {
        value: Role;
    };
    action: string;
    reFetchData: () => void;
    close: () => void;
}

export default function RoleForm(props: Props) {
    // inputs
    const roleName = useFormStringInputWithRegex(props.item.value?.name, /^[A-Za-z0-9 ]{1,30}$/);
    const roleActive = useFormStringInput(props.item?.value?.isActive ? 'true' : 'false');

    // form submitter
    const buildingForm = useSubmitData(
        config.mptAPI.baseUrl + config.mptAPI.routes.roles,
        props.action === 'edit' ? 'PUT' : 'POST',
    );

    // deleter
    const buildingDeleter = useDeleteData(config.mptAPI.baseUrl + config.mptAPI.routes.roles + props.item?.value.id);

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // updates the building and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set building data
        let item: Role = { ...props.item.value };
        item.id = props.item.value?.id;
        item.name = roleName.value;
        item.isActive = roleActive.value === 'true' ? true : false;

        // submit data
        let res = await buildingForm.submit(item);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Role ${props.action == 'edit' ? 'edited' : 'added'} successfully`);
    };

    const handleDeleteData = async () => {
        setEnabled(false);

        // delete data
        let res = await buildingDeleter.del();

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Role deleted successfully`);

        // close modal
        props.close();
    };

        // set user as acive by default
        useEffect(() => {
            if (props.action !== 'edit') {
                roleActive.handleLoad('true');
            }
        }, []);

    return (
        <Form>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="building's code..."
                            defaultValue={props.item.value?.name}
                            onChange={roleName.handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Status</Form.Label>
                        <StatusSelectBox
                            data={[
                                { status: 'Active', value: 'true' },
                                { status: 'Inactive', value: 'false' },
                            ]}
                            selectedValue={roleActive.value === 'true' ? 'true' : 'false'}
                            setValue={roleActive.handleLoad}
                        />
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
                                    disabled={!roleName.isValid || !enabled}
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
                                disabled={!roleName.isValid || !enabled}
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
