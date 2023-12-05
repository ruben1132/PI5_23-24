'use client';

// react
import React, { useEffect, useState } from 'react';

// react bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


// custom hooks
import { useFetchData, useFormNumberInput, useFormStringInput } from '@/util/customHooks';
import CloseButton from 'react-bootstrap/CloseButton';
import debounce from '@/util/debounce';

// notification component
import { notify } from '@/components/notification/Notification';

interface Props {
    setParams: (params: string) => void;
}

const DEFAULT_MIN_FLOORS = 0;
const DEFAULT_MAX_FLOORS = 9999;

export default function BuildingSearchForm(props: Props) {

    // inputs
    const minFloors = useFormNumberInput(DEFAULT_MIN_FLOORS);
    const maxFloors = useFormNumberInput(DEFAULT_MAX_FLOORS);

    const buildQueryParams = () => {
        return `ranges/${minFloors.value}/${maxFloors.value}`;
    };

    const handleMinFloorsChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(event.target.value); // Parse the input value as an integer

        // check if value is greater than maxFloors
        if (inputValue > maxFloors.value) {
            minFloors.handleLoad(maxFloors.value); // set the value of minFloors to the value of maxFloors
            maxFloors.handleChange(event);
            notify.warning('Min Floors cannot be greater than Max Floors so we switched them for you!');
            return;
        }

        minFloors.handleChange(event);
        const queryParams = buildQueryParams();
        props.setParams(queryParams);
    }, 500); // Adjust the delay as needed


    const handleMaxFloorsChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(event.target.value); // Parse the input value as an integer
        // check if value is less than minFloors
        if (inputValue < minFloors.value) {
            maxFloors.handleLoad(minFloors.value); // set the value of maxFloors to the value of minFloors
            minFloors.handleChange(event);
            notify.warning('Max Floors cannot be less than Min Floors so we switched them for you!');
            return;
        }

        maxFloors.handleChange(event);
        const queryParams = buildQueryParams();
        props.setParams(queryParams);
    }, 500); // Adjust the delay as needed

    useEffect(() => {
        const queryParams = buildQueryParams();
        props.setParams(queryParams);
    }, [minFloors.value, maxFloors.value]);

    return (
        <Form>
            <Row className="justify-content-md-center">
                <Col sm={4}>
                <Form.Group className="mb-4">
                    <Form.Label htmlFor="minFloors">Min Floors</Form.Label>
                        <Form.Control
                            id = "minFloors"
                            type="number"
                            defaultValue={DEFAULT_MIN_FLOORS}
                            onChange={handleMinFloorsChange}
                        />
                    </Form.Group>
                </Col>

                <Col sm={4}>
                    <Form.Group className="mb-4">
                    <Form.Label htmlFor="maxFloors">Max Floors</Form.Label>
                        <Form.Control
                            id = "maxFloors"
                            type="number"
                            defaultValue={DEFAULT_MAX_FLOORS}
                            onChange={handleMaxFloorsChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={2}>
                    <Form.Group className="mb-2">
                        <CloseButton
                            onClick={() => {
                                minFloors.handleLoad(DEFAULT_MIN_FLOORS);
                                maxFloors.handleLoad(DEFAULT_MAX_FLOORS);
                            }}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
