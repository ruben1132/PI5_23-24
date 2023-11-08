"use client";

import BuildingForm from "@/components/forms/BuildingForm";
import config from "../../../../config";
import { useFetchData, useSubmitData } from "@/util/customHooks";
import Button from "react-bootstrap/Button";
import MeekoLoader from "@/components/loaders/MeekoLoader";
import { useEffect, useState } from "react";
import { Building } from "@/models/Building";

interface Props {
  params: { slug: string };
}

export default function Page({ params }: Props) {
  const useFetchdata = useFetchData(
    config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings + params.slug
  );
  const [building, setBuilding] = useState<Building>(useFetchdata.data);

  useEffect(() => {
    console.log("hello");

    if (useFetchdata.isLoading || useFetchdata.isError) return;

    // when data is fetched, set the building state
    setBuilding(useFetchdata.data);
  }, [useFetchdata.data]);

  if (useFetchdata.isError) return <div>failed to load</div>;
  if (useFetchdata.isLoading) return <MeekoLoader />;

  return (
    <>
      <div>
        <p>Building: {params.slug}</p>
      </div>

      {building ? (
        <BuildingForm
          item={{ value: building }}
          reFetchData={useFetchdata.revalidate}
          action="edit"
          showFullPage={false}
        />
      ) : (
        <span>Building not found</span>
      )}
    </>
  );
}
