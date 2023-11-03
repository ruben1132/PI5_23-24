"use client";

import Button from "react-bootstrap/Button";
import { useModal } from "../util/customHooks";
import Modal  from "./modals/Modal";

interface Props {
  type: string;
  apiRoute: string;
}

export default function AddButton(props: Props) {
  const contentModal = useModal(false);

  return (
    <>
      {contentModal.show && (
        <Modal
          action="add"
          item={{value: {}, type: props.type}}
          route={{api: props.apiRoute, push: ""}}
          fade={false}
          show={contentModal.show}
          close={contentModal.handleClose}
          onUpdate={() => {}}
        />
      )}
      <Button variant="success" onClick={contentModal.handleOpen}>
        Add {props.type}
      </Button>
    </>
  );
}
