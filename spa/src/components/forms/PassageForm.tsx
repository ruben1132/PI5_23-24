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

// model
import { Passage, PassageWithFloor } from '@/models/Passage';
import { Floor } from '@/models/Floor';

interface Props {
    item: {
        value: PassageWithFloor;
    };
    action: string;
    reFetchData: () => void;
    close: () => void;
}

export default function PassageForm(props: Props) {
    const fetchFloors = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.floors); // fetch floors for fromFloor

    // form submitter
    const passageForm = useSubmitData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.passages,
        props.action === 'edit' ? 'PUT' : 'POST',
    );

    // deleter
    const passageDeleter = useDeleteData(config.mgiAPI.baseUrl + config.mgiAPI.routes.passages + props.item?.value.id);

    // inputs
    const passageDesignation = useFormStringInput(props.item.value?.designation);
    const fromFloor = useFormStringInput(props.item.value?.fromFloor?.id);
    const toFloor = useFormStringInput(props.item.value?.toFloor?.id);

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // updates the passage and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set passage data
        let item: Passage = {
            ...props.item.value,
            fromFloor: props.item.value?.fromFloor?.id,
            toFloor: props.item.value?.toFloor?.id,
        };
        item.id = props.item.value?.id;
        item.designation = passageDesignation.value;
        item.fromFloor = fromFloor.value;
        item.toFloor = toFloor.value;

        // submit data
        let res = await passageForm.submit(item);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Passage ${props.action == 'edit' ? 'edited' : 'added'} successfully`);
    };

    const handleDeleteData = async () => {
        setEnabled(false);

        // delete data
        let res = await passageDeleter.del();

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Passage deleted successfully`);

        // close modal
        props.close();
    };

    // when passages load, load them to the select box
    useEffect(() => {
        // if there's no data, return
        if (!fetchFloors.data || fetchFloors.data.length <= 0) {
            return;
        }

        if (!props.item.value?.id) {            
            fromFloor.handleLoad(fetchFloors.data[0].id);
        }


        if (!props.item.value?.id) {
            toFloor.handleLoad(fetchFloors.data[0].id);
        }
    }, [fetchFloors.data]);

    if (fetchFloors.isLoading) {
        return <Form>Loading...</Form>;
    }
    if (fetchFloors.isError) {
        return <Form>Error</Form>;
    }
    if (fetchFloors.data === undefined || fetchFloors.data === null || fetchFloors.data.length <= 0) {
        return <Form>Try adding floors first!</Form>;
    }

    // filter data so it removes the element already selected
    const filteredSelectBoxDataFromFloor = fetchFloors.data.filter(
        (item: any) => item.id !== props.item.value?.fromFloor?.id,
    );

    // filter data so it removes the element already selected
    const filteredSelectBoxDataToFloor = fetchFloors.data.filter(
        (item: any) => item.id !== props.item.value?.toFloor?.id,
    );

    // handle for selecting a fromFloor
    const handleSelectFromFloor = (e: ChangeEvent<HTMLSelectElement>) => {
        fromFloor.handleLoad(e.target.value);
    };

    // handle for selecting a toFloor
    const handleSelectToFloor = (e: ChangeEvent<HTMLSelectElement>) => {
        toFloor.handleLoad(e.target.value);
    };

    return (
        <Form>
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Designation</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Passage's designation..."
                            defaultValue={props.item.value?.designation}
                            onChange={passageDesignation.handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">From Floor</Form.Label>

                        <Form.Select
                            defaultValue={props.item.value?.fromFloor?.id ?? fetchFloors.data[0].id}
                            onChange={handleSelectFromFloor}
                        >
                            {props.item.value?.fromFloor?.id && (
                                <option defaultChecked={true}>{props.item.value?.fromFloor?.information}</option>
                            )}
                            {filteredSelectBoxDataFromFloor?.map((item: Floor) => (
                                <option key={item.id} value={item.id}>
                                    {/* show 2nd prop from item, 1st prop is the id */}
                                    {item.information}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">To Floor</Form.Label>

                        <Form.Select
                            defaultValue={props.item.value?.toFloor?.id ?? fetchFloors.data[0].id}
                            onChange={handleSelectToFloor}
                        >
                            {props.item.value?.toFloor?.id && (
                                <option defaultChecked={true}>{props.item.value?.toFloor?.information}</option>
                            )}
                            {filteredSelectBoxDataToFloor?.map((item: Floor) => (
                                <option key={item.id} value={item.id}>
                                    {/* show 2nd prop from item, 1st prop is the id */}
                                    {item.information}
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
                                    disabled={
                                        passageDesignation.value === '' ||
                                        fromFloor.value === '' ||
                                        toFloor.value === '' ||
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
                                    passageDesignation.value === '' ||
                                    fromFloor.value === '' ||
                                    toFloor.value === '' ||
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
