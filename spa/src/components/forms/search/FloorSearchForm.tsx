'use client';

// react
import React, { useEffect, useState } from 'react';

// react bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// custom hooks
import debounce from '@/util/debounce';

interface Props {
    setParams: (params: string) => void;
}

export default function FloorSearchForm(props: Props) {

    const handleCheckBoxChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.checked){
            props.setParams("withpass/");
        }else{
            props.setParams("");
        }
    }, 500); // Adjust the delay as needed


    return (
        <Form>
            <Row className="justify-content-md-center">
                <Col sm={12}>
                    <Form.Group className="mb-12">
                        <Form.Check
                            id="withPass"
                            type="checkbox"
                            defaultChecked={false}
                            onChange={handleCheckBoxChange}
                            label={"Only floors with passages"}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
