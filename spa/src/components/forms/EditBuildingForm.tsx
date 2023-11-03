"use client";

import React, {useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// custom hooks
import {
  useFormStringInput,
} from "@/util/customHooks";

interface Props {
  item: any;
  onUpdate: (item: any) => void;
}

export default function EditBuildingForm(props: Props) {
  const buildingName = useFormStringInput(props.item?.name);
  const buildingCode = useFormStringInput(props.item?.code);
  const buildingDimensions = useFormStringInput(props.item?.dimensions);

  const sendDataToParent = () => {  
    console.log(props.item);
    
    let item: any = {};
    item.id = props.item?.id;
    item.name = buildingName.value;
    item.code = buildingCode.value;
    item.dimensions = buildingDimensions.value;

    props.onUpdate(item);
  };

  // send data to parent when the there's changes on the form
  useEffect(() => {
    sendDataToParent();
  }, [buildingName.value, buildingCode.value, buildingDimensions.value]);

  return (
    <Form>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-6">
            <Form.Label htmlFor="select">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="building's name..."
              defaultValue={props.item?.name}
              onChange={buildingName.handleChange}
            />
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-6">
            <Form.Label htmlFor="select">Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="building's code..."
              defaultValue={props.item?.code}
              onChange={buildingCode.handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-6">
            <Form.Label htmlFor="select">Dimensions</Form.Label>
            <Form.Control
              type="text"
              placeholder="building's code..."
              defaultValue={props.item?.dimensions}
              onChange={buildingDimensions.handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
