"use client";

import React, { ChangeEvent, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// custom hooks
import {
  useFetchData,
  useFormNumberInput,
  useFormStringInput,
} from "@/util/customHooks";
// models
import { Floor, FloorWithBuilding } from "@/models/Floor";
// config
import config from "../../../config";
import { Building } from "@/models/Building";

interface Props {
  item: {
    value: FloorWithBuilding;
  };
  onUpdate: (item: Floor) => void;
}

export default function FloorForm(props: Props) {
  const floorInformation = useFormStringInput(props.item.value?.information);
  const floorNumber = useFormNumberInput(props.item.value?.number);
  const floorBuilding = useFormStringInput(props.item.value?.building?.id);
  const selectBoxDataFetch = useFetchData(
    config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings
  );

  const sendDataToParent = () => {
    let item: Floor = {
      id: props.item.value?.id,
      number: props.item.value?.number,
      information: props.item.value?.information,
      building: props.item.value?.building?.id,
    };

    item.id = props.item.value?.id;
    item.number = floorNumber.value;
    item.information = floorInformation.value;
    item.building = floorBuilding.value || filteredSelectBoxData[0].id;

    props.onUpdate(item);
  };

  const selectBoxSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    floorBuilding.handleLoad(e.target.value);
  };

  // send data to parent when the there's changes on the form
  useEffect(() => {
    sendDataToParent();
  }, [floorInformation.value, floorNumber.value, floorBuilding.value]);

  if (selectBoxDataFetch.isLoading) {
    return <Form.Select>Loading...</Form.Select>;
  }
  if (selectBoxDataFetch.isError) {
    return <Form.Select>Error</Form.Select>;
  }

  // filter data so it removes the element already selected
  const filteredSelectBoxData = selectBoxDataFetch.data.filter(
    (item: any) => item.id !== props.item.value?.building?.id
  );

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
            <Form.Select
              defaultValue={
                props.item.value?.building?.id ?? filteredSelectBoxData[0].id
              }
              onChange={selectBoxSelected}
            >
              {props.item.value?.building?.id && (
                <option defaultChecked={true}>
                  {props.item.value?.building.name}
                </option>
              )}

              {filteredSelectBoxData?.map((item: Building) => (
                <option key={item.id} value={item.id}>
                  {/* show 2nd prop from item, 1st prop is the id */}
                  {item.code + " - " + item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
