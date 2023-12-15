'use client';

import { SurveillanceTask } from '@/models/SurveillanceTask';
import { ChangeEvent } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

interface Props {
    item: SurveillanceTask;
    setPhoneNumber:  (e : ChangeEvent<HTMLInputElement>) => void;
}

export default function SurveillanceTaskForm(props: Props) {
    return (
        <Row>
            <Col sm={6}>
                <Form.Group className="mb-6">
                    <Form.Label htmlFor="select">Phone Number</Form.Label>
                    <Form.Control type="text" defaultValue={props.item.phoneNumber} 
                    onChange={props.setPhoneNumber}
                    />
                </Form.Group>
            </Col>
        </Row>
    );
}
