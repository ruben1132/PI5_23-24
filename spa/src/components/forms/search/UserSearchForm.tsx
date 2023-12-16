'use client';

// react
import React, { useEffect } from 'react';

// react bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// config
import config from '../../../../config';

// custom hooks
import { useFetchData, useFormStringInput } from '@/util/customHooks';
import StateSelectBox from '@/components/selectBoxes/StateSelectBox';

interface Props {
    setParams: (params: string) => void;
}

export default function UserSearchForm(props: Props) {

    // inputs
    const isApproved = useFormStringInput(config.states.ALL);

    const buildQueryParams = () => {
        console.log(config.states.ALL);
        
        if(isApproved.value !== config.states.ALL)
            return `&isApproved=${isApproved.value}`

        return '';
    };

    useEffect(() => {
        const queryParams = buildQueryParams();
        props.setParams(queryParams);
    }, [isApproved.value]);

    return (
        <Form>
            <Row className="justify-content-md-center">
                <Col sm={4}>
                    <Form.Group className="mb-4">
                        <StateSelectBox setValue={isApproved.handleLoad} selectedValue={isApproved.value} />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
