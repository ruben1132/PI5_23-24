'use client';

// react
import React, { useEffect, useState } from 'react';

// react bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// config
import config from '../../../../config/config';

// custom hooks
import { useFetchData, useFormStringInput } from '@/util/customHooks';
import TaskTypeSelectBox from '@/components/selectBoxes/TaskTypeSelectBox';
import CloseButton from 'react-bootstrap/CloseButton';
import debounce from '@/util/debounce';

interface Props {
    setParams: (params: string) => void;
}

export default function RobotSearchForm(props: Props) {
    const taskTypeDataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.tasktypes);

    // inputs
    const robotType = useFormStringInput('');
    const robotIdentification = useFormStringInput('');

    const buildQueryParams = () => {
        return `?taskTypeId=${robotType.value}&identification=${robotIdentification.value}`;
    };

    const handleRobotIdentificationChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        robotIdentification.handleChange(event);
        const queryParams = buildQueryParams();
        props.setParams(queryParams);
    }, 500); // Adjust the delay as needed

    useEffect(() => {
        const queryParams = buildQueryParams();
        props.setParams(queryParams);
    }, [robotType.value, robotIdentification.value]);

    return (
        <Form>
            <Row className="justify-content-md-center">
                <Col sm={4}>
                    <Form.Group className="mb-4">
                        <TaskTypeSelectBox
                            data={taskTypeDataFetch.data}
                            isLoading={taskTypeDataFetch.isLoading}
                            isError={taskTypeDataFetch.isError}
                            setValue={robotType.handleLoad}
                            allOption={true}
                        />
                    </Form.Group>
                </Col>

                <Col sm={4}>
                    <Form.Group className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="robot's identification..."
                            onChange={handleRobotIdentificationChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={2}>
                    <Form.Group className="mb-2">
                        <CloseButton
                            onClick={() => {
                                robotType.handleLoad('');
                                robotIdentification.handleLoad('');
                            }}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
