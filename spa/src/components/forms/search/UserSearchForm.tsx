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

interface Props {
    setParams: (params: string) => void;
}

export default function UserSearchForm(props: Props) {
    const taskTypeDataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.tasktypes);

    // inputs
    const isApproved = useFormStringInput('');

    const buildQueryParams = () => {
        switch (isApproved.value) {
            case 'needsApproval':
                return ``;
            case 'rejected':
                return `&isApproved=${false}`;
            case 'approved':
                return `&isApproved=${true}`;
            case 'all':
                return `&all=true`;
            default:
                return ``;
        }
    
        
    };


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        isApproved.handleLoad(event.target.value);
    };

    useEffect(() => {
        const queryParams = buildQueryParams();
        props.setParams(queryParams);
    }, [isApproved.value]);

    // by default define as requesting approval
    useEffect(() => {
        isApproved.handleLoad('needsApproval');
    }, []);

    return (
        <Form>
            <Row className="justify-content-md-center">
                <Col sm={4}>
                    <Form.Group className="mb-4">
                        <Form.Select onChange={handleChange}>
                            <option value="needsApproval" defaultChecked={true}>Requesting approval</option>
                            <option value="rejected">Rejected</option>
                            <option value="approved">Approved</option>
                            <option value="all">all</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
