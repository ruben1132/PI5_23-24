"use client";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { RenderFilteredForm } from "../forms/RenderFilteredForm";
import { useRouter } from "next/navigation";

// custom hooks
import { useSubmitData } from "../../util/customHooks";

interface Props {
  action: string;
  fade: boolean;
  show: boolean;
  item: {
    value: any;
    type: string;
  };
  route: {
    api: string;
    push: string;
  };
  close: () => void;
  onUpdate: () => void;
}

export default function BuildingModal(props: Props) {
  const buildingForm = useSubmitData(
    props.item,
    props.route.api,
    props.action === "edit" ? "PUT" : "POST"
  );
  const router = useRouter();

  // updates the building and refreshes the table
  const submitData = async () => {
    let res = await buildingForm.submit();

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
          {props.action === "edit"
            ? "Edit " + props.item.type + " " + props.item.value.name
            : "Add " + props.item.type}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenderFilteredForm
          item={{
            value: props.item.value ? props.item.value : null,
            type: props.item.type,
          }}
          onUpdate={buildingForm.handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        {props.action === "edit" ? (
          <>
            <Button
              variant="warning"
              onClick={() =>
                router.push(props.route.push + props.item.value.id)
              }
            >
              full page
            </Button>
            <Button variant="primary" onClick={submitData}>
              Update
            </Button>
          </>
        ) : (
          <Button variant="success" onClick={submitData}>
            Add
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
