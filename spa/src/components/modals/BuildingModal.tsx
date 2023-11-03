"use client";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import config from "../../../config";
import EditBuildingForm from "../forms/EditBuildingForm";
import { useRouter } from "next/navigation";

// custom hooks
import { useUpdateData } from "../../util/customHooks";

interface Props {
  action: string;
  fade: boolean;
  show: boolean;
  item: any;
  close: () => void;
  onUpdate: () => void;
}

export default function BuildingModal(props: Props) {
  const buildingForm = useUpdateData(
    props.item,
    config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings
  );
  const router = useRouter();

  // updates the building and refreshes the table
  const updateBuilding = async () => {
    let res = await buildingForm.update();

    if (!res) {
      // TODO: show alert

      return;
    }

    // TODO: show alert

    // close modal and refresh table
    props.onUpdate();
    props.close();
  };

  const createBuilding = async () => {};

  return (
    <Modal size="lg" onHide={props.close} show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {props.item ? "Building " + props.item.name : "Add Building"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditBuildingForm
          item={props.item ? props.item : null}
          onUpdate={buildingForm.handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        {props.action === "edit" ? (
          <>
            <Button
              variant="warning"
              onClick={() => router.push("/buildings/" + props.item.id)}
            >
              full page
            </Button>
            <Button variant="primary" onClick={updateBuilding}>
              Update
            </Button>
          </>
        ) : (
          <Button variant="success" onClick={createBuilding}>Add</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
