"use client";

import BuildingForm from "@/components/forms/BuildingForm";
import config from "../../../../config";
import { useFetchData, useSubmitData } from "@/util/customHooks";
import Button from "react-bootstrap/Button";
import MeekoLoader from "@/components/loaders/MeekoLoader";

interface Props {
  params: { slug: string };
}

export default function Page({ params }: Props) {
  const useFetchdata = useFetchData(
    config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings + params.slug
  );
  const buildingForm = useSubmitData(
    useFetchdata.data,
    config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings,
    "PUT"
  );

  // updates the building and refreshes the table
  const updateBuilding = async () => {
    let res = await buildingForm.submit();

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
        <p>Building: {params.slug}</p>
      </div>

      <BuildingForm
        item={{ value: useFetchdata.data }}
        onUpdate={buildingForm.handleChange}
      />
      <br />
      <Button variant="success" onClick={updateBuilding}>
        Update
      </Button>
    </>
  );
}
