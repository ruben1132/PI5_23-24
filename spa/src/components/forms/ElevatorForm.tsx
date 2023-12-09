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
import { useFetchData, useSubmitData, useFormStringInput, useDeleteData } from '@/util/customHooks';

// model
import { Elevator, ElevatorWithFloors } from '@/models/Elevator';
import { Floor } from '@/models/Floor';
import FloorSelectBox from '../selectBoxes/FloorSelectBox';
import BuildingSelectBox from '../selectBoxes/BuildingSelectBox';

interface Props {
    item: {
        value: ElevatorWithFloors;
    };
    action: string;
    reFetchData: () => void;
    close: () => void;
}

export default function ElevatorForm(props: Props) {
    const selectBoxBuildindsDataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings);
    const building = useFormStringInput(props.item.value?.floorsAllowed?.[0]?.building ?? '');
    const selectBoxFloorsAllowedDataFetch = useFetchData(
        `${config.mgiAPI.baseUrl}${config.mgiAPI.routes.floors}${
            building.value ? '/buildingId/' + building.value : ''
        }`,
    );

    // form submitter
    const elevatorForm = useSubmitData(
        `${config.mgiAPI.baseUrl}${config.mgiAPI.routes.elevators}`,
        props.action === 'edit' ? 'PUT' : 'POST',
    );

    // deleter
    const elevatorDeleter = useDeleteData(
        `${config.mgiAPI.baseUrl}${config.mgiAPI.routes.elevators}${props.item?.value.id}`,
    );

    // inputs
    const elevatorDesignation = useFormStringInput(props.item.value?.designation);

    const [floorsAllowed, setFloorsAllowed] = useState<Floor[]>([]);

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

        // update props
        props.item.value.floorsAllowed = floorsAllowed;

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

    // when building changes, load the floors
    useEffect(() => {
        if (building.value) {
            selectBoxFloorsAllowedDataFetch.revalidate();
            // check if the selected building is the same as the one in the Elevator
            if (props.item.value?.floorsAllowed?.[0]?.building !== building.value) {
                setFloorsAllowed([]);
                return;
            }
            // check if there is props.item.value.floorsAllowed
            if (!props.item.value.floorsAllowed) {
                setFloorsAllowed([]);
                return;
            }

            // if it is, load the floors
            setFloorsAllowed(props.item.value.floorsAllowed);
        }
    }, [building.value]);

    // when gets data, set the first value as selected
    useEffect(() => {
        if (selectBoxBuildindsDataFetch.data) {
            // if there's no props.item.value.id, set the first value as selected
            if (!props.item.value.id) {
                building.handleLoad(selectBoxBuildindsDataFetch.data[0].id);
            }
        }
    }, [selectBoxBuildindsDataFetch.data]);

    if (
        selectBoxFloorsAllowedDataFetch.data === undefined ||
        selectBoxFloorsAllowedDataFetch.data === null ||
        selectBoxFloorsAllowedDataFetch.data.length <= 0
    ) {
        return <Form>Try adding floors first!</Form>;
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
                            data-testid="elavator-designation-input"
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Building</Form.Label>
                        <BuildingSelectBox
                            data={selectBoxBuildindsDataFetch.data}
                            setValue={building.handleLoad}
                            selectedValue={building.value}
                            isLoading={selectBoxBuildindsDataFetch.isLoading}
                            isError={selectBoxBuildindsDataFetch.isError}
                            data-testid="building-sb"
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            {building.value && (
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-6">
                            <Form.Label htmlFor="select">Floors Allowed</Form.Label>
                            <FloorSelectBox
                                data={filteredSelectBoxData}
                                isError={selectBoxFloorsAllowedDataFetch.isError}
                                isLoading={selectBoxFloorsAllowedDataFetch.isLoading}
                                customHandleChange={handleSelect}
                                data-testid="elevator-floors-input"
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-6">
                            <Form.Label htmlFor="select">Floors Selected</Form.Label>
                            <ListGroup>
                                {floorsAllowed?.map((item) => (
                                    <ListGroup.Item key={item.id}>
                                        <CloseButton onClick={() => handleRemoveFloorAllowed(item)} />
                                        {item.code}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Form.Group>
                    </Col>
                </Row>
            )}
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
                                    data-testid="update-button"
                                >
                                    Update
                                </Button>

                                <Button variant="danger" onClick={handleDeleteData} data-testid="delete-button">
                                    Delete
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="success"
                                onClick={handleSubmitData}
                                disabled={elevatorDesignation.value === '' || floorsAllowed.length === 0 || !enabled}
                                data-testid="add-button"
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
