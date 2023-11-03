"use client";

import Table from "react-bootstrap/Table";
import BuildingModal from "../modals/BuildingModal";
import { useModal } from "../../util/customHooks";
import { useEffect, useState } from "react";
import config from "../../../config";

interface Props {
  data: any;
  type: string;
}

function ContentTable(props: Props) {
  const contentModal = useModal(false);
  const [itemClicked, setItemClicked] = useState<any>(null);
  const [data, setData] = useState<any>(props.data);
  const [isDataStale, setDataStale] = useState(false);

  const renderModal = () => {
    switch (props.type) {
      case "building":
        return (
          <BuildingModal
            item={itemClicked}
            fade={false}
            show={contentModal.show}
            close={contentModal.handleClose}
            onUpdate={fetchBuildings}
          />
        );
      default:
        return <p>no modal</p>;
    }
  };

  const fetchBuildings = async () => {
    try {
      const response = await fetch(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings
      );

      if (response.status !== 200) {
        // TODO: show alert

        return;
      }

      setDataStale(false); // reset the flag
      setData(await response.json());
    } catch (error) {
      console.log(error);

      return [];
    }
  };

  const filteredColumns = Object.keys(props.data[0]).filter(
    (column: string) => column !== "id" && column !== "domainId"
  );

  const handleRowClick = (item: any) => {
    setItemClicked(item);

    contentModal.handleOpen();
  };

  // fetch data when the component is mounted and when data is marked as stale (is not updated).
  useEffect(() => {
    if (isDataStale) {
      fetchBuildings();
    }
  }, [isDataStale]);

  if (!props.data || props.data.length === 0) {
    return <p>No data</p>;
  }

  return (
    <>
      {contentModal.show && renderModal()}

      <Table striped>
        <thead>
          <tr>
            {filteredColumns.map((column: string, index: number) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <tr
              key={index}
              onClick={() => handleRowClick(item)}
              style={{ cursor: "pointer" }}
            >
              {filteredColumns.map((column: string, index: number) => (
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
