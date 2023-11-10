"use client";

// react
import React, { useState } from "react";

// react bootstrap components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";

// notification component
import { notify } from "@/components/notification/Notification";

// config
import config from "../../../config";

// custom hooks
import {
  useFormStringInput,
  useFormStringInputWithRegex,
  useSubmitData,
} from "@/util/customHooks";

// model
import { Building } from "@/models/Building";

interface Props {
  item: {
    value: Building;
  };
  action: string;
  reFetchData: () => void;
}

export default function BuildingForm(props: Props) {
  // inputs
  const buildingName = useFormStringInput(props.item.value?.name);
  const buildingCode = useFormStringInputWithRegex(
    props.item.value?.code,
    /^[A-Za-z0-9 ]{1,5}$/
  );
  const buildingDimensions = useFormStringInputWithRegex(
    props.item.value?.dimensions,
    /^\d{1,2}x\d{1,2}$/
  );

  // form submitter
  const buildingForm = useSubmitData(
    props.item.value,
    config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings,
    props.action === "edit" ? "PUT" : "POST"
  );

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

    if (res.error) {
      setEnabled(true);
      notify.error(res.error);
      return;
    }

    props.reFetchData(); // refresh data
    setEnabled(true); // enable buttons

    // show alert
    notify.success(
      `Building ${props.action == "edit" ? "edited" : "added"} successfully`
    );
  };

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
        <Col sm={12}>
          <Form.Group className="mb-12">
            {props.action === "edit" ? (
              <>
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

                <Button
                  variant="danger"
                  // onClick={}
                >
                  Delete
                </Button>
              </>
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
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
