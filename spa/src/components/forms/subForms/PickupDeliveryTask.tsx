'use client';

import { PickupDeliveryTask } from '@/models/PickupDeliveryTask';
import { ChangeEvent, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

interface Props {
    item: PickupDeliveryTask;
    setPickupPersonName: (e: ChangeEvent<HTMLInputElement>) => void;
    setPickupPersonPhoneNumber: (e: ChangeEvent<HTMLInputElement>) => void;
    setDeliveryPersonName: (e: ChangeEvent<HTMLInputElement>) => void;
    setDeliveryPersonPhoneNumber: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function PickupDeliveryTaskForm(props: Props) {
    const [show, setShow] = useState<boolean>(false);

    return (
        <>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Pickup Person Name</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={props.item.pickupPersonName}
                            onChange={props.setPickupPersonName}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Pickup Person Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={props.item.deliveryPersonPhoneNumber}
                            onChange={props.setPickupPersonPhoneNumber}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Delivery Person Name</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={props.item.deliveryPersonName}
                            onChange={props.setDeliveryPersonName}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Delivery Person Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={props.item.deliveryPersonPhoneNumber}
                            onChange={props.setDeliveryPersonPhoneNumber}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            {props.item.confirmationCode && (
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-6">
                            <Form.Label htmlFor="select">Confirmation code</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={props.item.confirmationCode}
                                disabled={true}
                                onClick={() => {
                                    navigator.clipboard.writeText(props.item.confirmationCode); // copy to clipboard
                                }}
                            />
                        </Form.Group>
                        {show && <span>Copied to clipboard!</span>}
                    </Col>
                </Row>
            )}
        </>
    );
}
