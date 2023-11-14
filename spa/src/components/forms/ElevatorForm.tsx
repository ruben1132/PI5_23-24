'use client';

// react
import React, { ChangeEvent, useEffect, useState } from 'react';

// react bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from 'react-bootstrap/CloseButton';

// notification component
import { notify } from '@/components/notification/Notification';

// config
import config from '../../../config';

// custom hooks
import { useFetchData, useSubmitData, useFormNumberInput, useFormStringInput, useDeleteData } from '@/util/customHooks';

// model
import { Elevator, ElevatorWithFloor } from '@/models/Elevator';
import { Floor } from '@/models/Floor';

interface Props {
    item: {
        value: ElevatorWithFloor;
    };
    action: string;
    reFetchData: () => void;
    close: () => void;
}

export default function ElevatorForm(props: Props) {
    const selectBoxFloorsAllowedDataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.floors); // fetch floors for fromFloor

    // form submitter
    const elevatorForm = useSubmitData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.elevators,
        props.action === 'edit' ? 'PUT' : 'POST',
    );

    // deleter
    const elevatorDeleter = useDeleteData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.elevators + props.item?.value.id,
    );

    // inputs
    const elevatorDesignation = useFormStringInput(props.item.value?.designation);

    const [floorsAllowed, setFloorsAllowed] = useState<Floor[]>([]); // TODO:

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // updates the Elevator and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set Elevator data
        let item: Elevator = {
            ...props.item.value,
            floorsAllowed: floorsAllowed.map((item) => item.id),
        };
        item.id = props.item.value?.id;
        item.designation = elevatorDesignation.value;
        item.floorsAllowed = floorsAllowed.map((item) => item.id);

        // submit data
        let res = await elevatorForm.submit(item);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Elevator ${props.action == 'edit' ? 'edited' : 'added'} successfully`);
    };

    const handleDeleteData = async () => {
        setEnabled(false);

        // delete data
        let res = await elevatorDeleter.del();

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Elevator deleted successfully`);

        // close modal
        props.close();
    };

    // when Elevators load, load them to the select box
    useEffect(() => {
        if (props.action === 'edit') {
            setFloorsAllowed(props.item.value.floorsAllowed);
        }
    }, [props.action]);

    if (selectBoxFloorsAllowedDataFetch.isLoading) {
        return <Form>Loading...</Form>;
    }
    if (selectBoxFloorsAllowedDataFetch.isError) {
        return <Form>Error</Form>;
    }

    // filter data so it removes the element(s) already selected
    const filteredSelectBoxData = selectBoxFloorsAllowedDataFetch.data.filter((item: Floor) => {
        return !floorsAllowed.some((floor) => floor.id === item.id);
    });

    // add the selected value
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const selectedFloor = selectBoxFloorsAllowedDataFetch.data.find((f: Floor) => f.id === selectedValue);

        const newArray: Floor[] = [...floorsAllowed, selectedFloor];
        setFloorsAllowed(newArray);
    };

    const handleRemoveFloorAllowed = (id: Floor) => {
        const newArray = floorsAllowed.filter((item) => item.id !== id.id);
        setFloorsAllowed(newArray);
    };

    return (
        <Form>
            {props.action === 'edit' && (
                <>
                    <Row>
                        <Col sm={12}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Elevator ID</Form.Label>
                                <Form.Control type="text" defaultValue={props.item.value?.id} disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                </>
            )}

            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Designation</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Elevator's designation..."
                            defaultValue={props.item.value?.designation}
                            onChange={elevatorDesignation.handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Floors Allowed</Form.Label>

                        <Form.Select onChange={handleSelect}>
                            <option>select floors allowed</option>
                            {filteredSelectBoxData?.map((item: Floor) => (
                                <option key={item.id} value={item.id}>
                                    {item.information}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}></Col>
                <Col sm={6}>
                    <ListGroup>
                        {floorsAllowed?.map((item) => (
                            <ListGroup.Item key={item.id}>
                                <CloseButton onClick={() => handleRemoveFloorAllowed(item)} />
                                {item.information}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
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
                                        elevatorDesignation.value === '' || floorsAllowed.length === 0 || !enabled
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
                                disabled={elevatorDesignation.value === '' || floorsAllowed.length === 0 || !enabled}
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
