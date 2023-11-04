"use client";

import Table from "react-bootstrap/Table";
import { useFetchData, useModal } from "../../util/customHooks";
import { useState } from "react";
import Modal from "../modals/Modal";
import MeekoLoader from "../loaders/MeekoLoader";
import Button from "react-bootstrap/Button";

interface Props {
  type: string;
  routeToFetch: string;
  routeToPush: string;
  children?: React.ReactNode;
}

function ContentTable(props: Props) {
  const contentModal = useModal(false);
  const [itemClicked, setItemClicked] = useState<any>(null);
  const useFetchdata = useFetchData(props.routeToFetch);
  const [modalType, setModalType] = useState<string>("add");

  if (useFetchdata.isError) return <div>failed to load</div>;
  if (useFetchdata.isLoading) return <MeekoLoader />;

  const filteredColumns = Object.keys(useFetchdata.data[0]).filter(
    (column: string) => column !== "id" && column !== "domainId"
  );

  const handleRowClick = (item: any) => {
    setItemClicked(item);
    setModalType("edit");
    contentModal.handleOpen();
  };

  const handleAddButtonClick = () => {
    setModalType("add");
    setItemClicked({});
    contentModal.handleOpen();
  }

  return (
    <>
      {contentModal.show && (
        <Modal
          action={modalType}
          item={{ value: itemClicked, type: props.type }}
          route={{ api: props.routeToFetch, push: props.routeToPush }}
          fade={false}
          show={contentModal.show}
          close={contentModal.handleClose}
          onUpdate={useFetchdata.revalidate}
        />
      )}

      <Button
        variant="success"
        onClick={handleAddButtonClick}
      >
        Add {props.type}
      </Button>

      <Table striped>
        <thead>
          <tr>
            {filteredColumns.map((column: string, index: number) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {useFetchdata?.data.map((item: any, index: number) => (
            <tr
              key={index}
              onClick={() => handleRowClick(item)}
              style={{ cursor: "pointer" }}
            >
              {filteredColumns?.map((column: string, index: number) => (
                <td key={index}>{item[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ContentTable;
