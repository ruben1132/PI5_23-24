"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// custom hooks
import {
  useFetchData,
  useSubmitData,
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
  action: string;
  showFullPage: boolean;
  reFetchData: () => void;
}

export default function FloorForm(props: Props) {
  const fetchFloorMap = useFetchData(
    config.mgiAPI.baseUrl +
      config.mgiAPI.routes.floormapsWithFloor +
      props.item.value.id
  ); // fetch floor map
  const uploadFloorMap = useSubmitData(
    null,
    config.mgiAPI.baseUrl + config.mgiAPI.routes.floormaps,
    "PATCH"
  ); // upload floor map
  const selectBoxBuildingsDataFetch = useFetchData(
    config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings
  ); // fetch buildings
  const floorInformation = useFormStringInput(props.item.value?.information);
  const floorNumber = useFormNumberInput(props.item.value?.number);
  const floorBuilding = useFormStringInput(props.item.value?.building?.id);

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
    item.building = floorBuilding.value;

  };

  const selectBoxSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    floorBuilding.handleLoad(e.target.value);
  };

  // handle upload to floormap to server
  const handleUpload = async (file: File | undefined) => {
    if (!file) {
      console.log("no file");

      // TODO: show alert that there's no file
      return;
    }

    console.log("fffff");

    let formData = new FormData();
    formData.append("jsonFile", file);
    // uploadFloorMap.handleChange("teste");
    let res = await uploadFloorMap.submit(formData);
    console.log(res);

    if (!res) {
      // TODO: show alert
      return;
    }

    // fetch floor map again
    fetchFloorMap.revalidate();
  };

  // send data to parent when the there's changes on the form
  useEffect(() => {
    sendDataToParent();
  }, [floorInformation.value, floorNumber.value, floorBuilding.value]);

  // when buildings load, load them to the select box
  useEffect(() => {
    // if there's no data, return
    if (!selectBoxBuildingsDataFetch.data) {
      return;
    }

    floorBuilding.handleLoad(selectBoxBuildingsDataFetch.data[0].id);
  }, [selectBoxBuildingsDataFetch.data]);

  if (selectBoxBuildingsDataFetch.isLoading || fetchFloorMap.isLoading) {
    return <Form>Loading...</Form>;
  }
  if (selectBoxBuildingsDataFetch.isError) {
    return <Form>Error</Form>;
  }

  // filter data so it removes the element already selected
  const filteredSelectBoxData = selectBoxBuildingsDataFetch.data.filter(
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
      <br />
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
                  {props.item.value?.building.code +
                    " - " +
                    props.item.value?.building.name}
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
        {props.item.value.id && (
          <Col sm={6}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Floor map</Form.Label>
              <Form.Control
                key={props.item.value.id}
                type="file"
                onChange={(e) => {
                  handleUpload((e.target as HTMLInputElement).files?.[0]);
                  e.target.value = "";
                }}
              />
            </Form.Group>
          </Col>
        )}
      </Row>
      {fetchFloorMap.data && (
        <Col sm={12}>
          <Form.Group controlId="preview" className="mb-3">
            <Form.Label>Floor map</Form.Label>
            <Form.Control
              as={"textarea"}
              value={JSON.stringify(fetchFloorMap.data, null, 2)}
              disabled={true}
              style={{ height: "500px" }}
            />
          </Form.Group>
        </Col>
      )}
    </Form>
  );
}
