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
  useDeleteData,
} from "@/util/customHooks";

// model
import { Passage } from "@/models/Passage";

interface Props {
  item: {
    value: Passage;
  };
  action: string;
  reFetchData: () => void;
  close: () => void;
}

export default function PassageForm(props: Props) {
  // inputs
  const PassageName = useFormStringInput(props.item.value?.name);
  const PassageCode = useFormStringInputWithRegex(
    props.item.value?.code,
    /^[A-Za-z0-9 ]{1,5}$/
  );
  const PassageDimensions = useFormStringInputWithRegex(
    props.item.value?.dimensions,
    /^\d{1,2}x\d{1,2}$/
  );

  // form submitter
  const PassageForm = useSubmitData(
    config.mgiAPI.baseUrl + config.mgiAPI.routes.Passages,
    props.action === "edit" ? "PUT" : "POST"
  );

  // deleter
  const PassageDeleter = useDeleteData(
    config.mgiAPI.baseUrl +
      config.mgiAPI.routes.Passages +
      props.item?.value.id
  );

  // button enables - used to prevent double clicks
  const [enabled, setEnabled] = useState<boolean>(true);

  // updates the Passage and refreshes the table
  const handleSubmitData = async () => {
    setEnabled(false);

    // set Passage data
    let item: Passage = { ...props.item.value };
    item.id = props.item.value?.id;
    item.name = PassageName.value;
    item.code = PassageCode.value;
    item.dimensions = PassageDimensions.value;

    // submit data
    let res = await PassageForm.submit(item);

    if (res.error) {
      setEnabled(true);
      notify.error(res.error);
      return;
    }

    props.reFetchData(); // refresh data
    setEnabled(true); // enable buttons

    // show alert
    notify.success(
      `Passage ${props.action == "edit" ? "edited" : "added"} successfully`
    );
  };

  const handleDeleteData = async () => {
    setEnabled(false);

    // delete data
    let res = await PassageDeleter.del();

    if (res.error) {
      setEnabled(true);
      notify.error(res.error);
      return;
    }

    props.reFetchData(); // refresh data
    setEnabled(true); // enable buttons

    // show alert
    notify.success(`Passage deleted successfully`);

    // close modal
    props.close();
  };

  return (
    <Form>
      {props.action === "edit" && (
        <>
          <Row>
            <Col sm={12}>
              <Form.Group className="mb-6">
                <Form.Label htmlFor="select">Passage ID</Form.Label>
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
              placeholder="Passage's name..."
              defaultValue={props.item.value?.name}
              onChange={PassageName.handleChange}
            />
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-6">
            <Form.Label htmlFor="select">Code</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Passage's code..."
              defaultValue={props.item.value?.code}
              onChange={PassageCode.handleChange}
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
              placeholder="Passage's code..."
              defaultValue={props.item.value?.dimensions}
              onChange={PassageDimensions.handleChange}
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
                  onClick={handleSubmitData}
                  disabled={
                    PassageName.value === "" ||
                    !PassageCode.isValid ||
                    !PassageDimensions.isValid ||
                    !enabled
                  }
                >
                  Update
                </Button>

                <Button variant="danger" onClick={handleDeleteData}>
                  Delete
                </Button>
              </>
            ) : (
              <Button
                variant="success"
                onClick={handleSubmitData}
                disabled={
                  PassageName.value === "" ||
                  !PassageCode.isValid ||
                  !PassageDimensions.isValid ||
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
