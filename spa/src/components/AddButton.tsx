"use client";

import Button from "react-bootstrap/Button";
import { useModal } from "../util/customHooks";
import { RenderFilteredModal } from "./modals/RenderFilteredModal";

interface Props {
  type: string;
}

export default function AddButton(props: Props) {
  const contentModal = useModal(false);

  return (
    <>
      {contentModal.show && (
        <RenderFilteredModal
          action="add"
          type={props.type}
          item={{}}
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
