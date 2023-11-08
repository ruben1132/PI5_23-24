"use client";

import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import config from "../../../config";
import { useRouter } from "next/navigation";

// custom hooks
import {
  useFormStringInput,
  useFormStringInputWithRegex,
  useSubmitData,
} from "@/util/customHooks";
// model
import { Building } from "@/models/Building";
import { Button } from "react-bootstrap";

interface Props {
  item: {
    value: Building;
  };
  action: string;
  showFullPage: boolean;
  reFetchData: () => void;
}

export default function BuildingForm(props: Props) {
  
  const buildingName = useFormStringInput(props.item.value?.name);
  const buildingCode = useFormStringInputWithRegex(
    props.item.value?.code,
    /^[A-Za-z0-9 ]{1,5}$/
  );
  const buildingDimensions = useFormStringInputWithRegex(
    props.item.value?.dimensions,
    /^\d{1,2}x\d{1,2}$/
  );

  
  const buildingForm = useSubmitData(
    props.item.value,
    config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings,
    props.action === "edit" ? "PUT" : "POST"
  );

  // router
  const router = useRouter();

  // button enables - used to prevent double clicks
  const [enabled, setEnabled] = useState<boolean>(true);
  
  // updates the building and refreshes the table
  const submitData = async () => {
    setEnabled(false);

    // set building data
    let item: Building = { ...props.item.value };
    item.id = props.item.value?.id;
    item.name = buildingName.value;
    item.code = buildingCode.value;
    item.dimensions = buildingDimensions.value;

    // submit data
    let res = await buildingForm.submit(item);

    if (!res) {
      // TODO: show alert

      return;
    }

    // refresh data
     props.reFetchData();
    setEnabled(true);

    // TODO: show alert
  };

  // loads the data from props everytime it changes
  useEffect(() => {
    if (!props.item.value) return

    buildingName.handleLoad(props.item.value.name);
    buildingCode.handleLoad(props.item.value.code);
    buildingDimensions.handleLoad(props.item.value.dimensions);
    
  } , [props.item.value]);

  return (
    <Form>
      {props.action === "edit" && (
        <>
          <Row>
            <Col sm={12}>
              <Form.Group className="mb-6">
                <Form.Label htmlFor="select">Buildind ID</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={props.item.value?.id}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
        </>
      )}

      <Row>
        <Col sm={6}>
          <Form.Group className="mb-6">
            <Form.Label htmlFor="select">Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="building's name..."
              defaultValue={props.item.value?.name}
              onChange={buildingName.handleChange}
            />
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-6">
            <Form.Label htmlFor="select">Code</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="building's code..."
              defaultValue={props.item.value?.code}
              onChange={buildingCode.handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-6">
            <Form.Label htmlFor="select">
              Dimensions <small>(ex: 8x10)</small>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="building's code..."
              defaultValue={props.item.value?.dimensions}
              onChange={buildingDimensions.handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={6}>
          {props.action === "edit" ? (
              <Button
                variant="primary"
                onClick={submitData}
                disabled={
                  buildingName.value === "" ||
                  !buildingCode.isValid ||
                  !buildingDimensions.isValid ||
                  !enabled
                }
              >
                Update
              </Button>
          ) : (
            <Button
              variant="success"
              onClick={submitData}
              disabled={
                buildingName.value === "" ||
                !buildingCode.isValid ||
                !buildingDimensions.isValid ||
                !enabled
              }
            >
              Add
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
}
