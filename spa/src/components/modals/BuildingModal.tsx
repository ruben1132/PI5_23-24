"use client";

import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import config from "../../../config";
import EditBuildingForm from "../forms/EditBuildingForm";
import { useRouter } from "next/navigation";

// custom hooks
import { useForm } from "../../util/customHooks";

interface Props {
  fade: boolean;
  show: boolean;
  item: any;
  close: () => void;
  onUpdate: () => void;
}

export default function BuildingModal(props: Props) {
  const buildingForm = useForm(props.item);
  const router = useRouter();

  // updates the building and refreshes the table
  const updateBuilding = async () => {
    let res = await buildingForm.update(
      config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings
    );

    if (!res) {
      // TODO: show alert

      return;
    }

    // TODO: show alert

    // close modal and refresh table
    props.onUpdate();
    props.close();
  };

  return (
    <Modal size="lg" onHide={props.close} show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Building {props.item.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditBuildingForm
          item={props.item}
          onUpdate={buildingForm.handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          onClick={() => router.push("/buildings/" + props.item.id)}
        >
          full page
        </Button>
        <Button variant="primary" onClick={updateBuilding}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
