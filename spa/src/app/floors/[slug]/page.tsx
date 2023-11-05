"use client";

import FloorForm from "@/components/forms/FloorForm";
import config from "../../../../config";
import { useFetchData, useSubmitData } from "@/util/customHooks";
import Button from "react-bootstrap/Button";
import MeekoLoader from "@/components/loaders/MeekoLoader";

interface Props {
  params: { slug: string };
}

export default function Page({ params }: Props) {
  const useFetchdata = useFetchData(
    config.mgiAPI.baseUrl + config.mgiAPI.routes.floors + params.slug
  );
  const floorForm = useSubmitData(
    useFetchdata.data,
    config.mgiAPI.baseUrl + config.mgiAPI.routes.floors,
    "PUT"
  );

  // updates the floor and refreshes the table
  const updateFloor = async () => {
    let res = await floorForm.submit();

    if (!res) {
      // TODO: show alert

      return;
    }

    // TODO: show alert
  };

  if (useFetchdata.isError) return <div>failed to load</div>;
  if (useFetchdata.isLoading) return <MeekoLoader />;

  return (
    <>
      <div>
        <p>Floor: {params.slug}</p>
      </div>

      <FloorForm
        item={{ value: useFetchdata.data }}
        onUpdate={floorForm.handleChange}
      />
      <br />
      <Button variant="success" onClick={updateFloor}>
        Update
      </Button>
    </>
  );
}
