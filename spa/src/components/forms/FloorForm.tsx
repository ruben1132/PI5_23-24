"use client";

import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BuildingSelectBox from "@/components/forms/selectboxes/BuildingSelectBox";
// custom hooks
import { useFormNumberInput, useFormStringInput } from "@/util/customHooks";
// models
import { Floor, FloorWithBuilding } from "@/models/Floor";
// config
import config from "../../../config";

interface Props {
  item: {
    value: FloorWithBuilding;
  };
  onUpdate: (item: Floor) => void;
}

export default function FloorForm(props: Props) {
  const floorInformation = useFormStringInput(props.item.value?.information);
  const floorNumber = useFormNumberInput(props.item.value?.number);
  const floorBuilding = useFormStringInput(props.item.value?.building.id);

  const sendDataToParent = () => {
    let item: Floor = {
      id: props.item.value?.id,
      number: props.item.value.number,
      information: props.item.value.information,
      building: props.item.value.building.id,
    };

    item.id = props.item.value?.id;
    item.number = floorNumber.value;
    item.information = floorInformation.value;
    item.building = floorBuilding.value;

    props.onUpdate(item);
  };

  const selectBoxSelected = (e: string) => {
    floorBuilding.handleLoad(e);
  };

  // send data to parent when the there's changes on the form
  useEffect(() => {
    sendDataToParent();
  }, [floorInformation.value, floorNumber.value, floorBuilding.value]);

  return (
    <Form>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-6">
            <Form.Label htmlFor="select">Information</Form.Label>
            <Form.Control
              type="text"
              placeholder="floor's information..."
              defaultValue={props.item.value?.information}
              onChange={floorInformation.handleChange}
            />
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-6">
            <Form.Label htmlFor="select">Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="floor's number..."
              defaultValue={props.item.value?.number}
              onChange={floorNumber.handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-6">
            <Form.Label htmlFor="select">Building</Form.Label>
            <BuildingSelectBox
              defaultValue={{
                id: props.item.value?.building.id,
                name:
                  props.item.value?.building.code +
                  " - " +
                  props.item.value?.building.name,
              }}
              onChange={selectBoxSelected}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
