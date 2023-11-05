"use client";

import Form from "react-bootstrap/Form";
import { useFetchData } from "@/util/customHooks";
import { Building } from "@/models/Building";
import config from "../../../../config";

interface Props {
  defaultValue: {
    id: string;
    name: string;
  };
  onChange: (e: string) => void;
}

export default function BuildingSelectBox(props: Props) {
  const dataFetch = useFetchData(
    config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings
  );

  if (dataFetch.isLoading) {
    return <Form.Select>Loading...</Form.Select>;
  }
  if (dataFetch.isError) {
    return <Form.Select>Error</Form.Select>;
  }

  const filteredData = dataFetch.data.filter(
    (item: any) => item.id !== props.defaultValue.id
  );

  // filter data
  return (
    <Form.Select
      defaultValue={props.defaultValue.id}
      onChange={(e) => props.onChange(e.target.value)}
    >
      <option defaultChecked={true}>{props.defaultValue.name}</option>
      {filteredData?.map((item: Building) => (
        <option key={item.id} value={item.id}>
          {/* show 2nd prop from item, 1st prop is the id */}
          {item.code + " - " + item.name}
        </option>
      ))}
    </Form.Select>
  );
}
