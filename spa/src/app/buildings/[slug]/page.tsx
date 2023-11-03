"use client";

import EditBuildingForm from "@/components/forms/EditBuildingForm";
import config from "../../../../config";
import { useFetchData, useUpdateData } from "@/util/customHooks";

interface Props {
  params: { slug: string };
}

export default function Page({ params }: Props) {
  const useFetchdata = useFetchData(
    config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings + params.slug
  );
  const buildingForm = useUpdateData(
    useFetchdata.data,
    config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings
  );

  // updates the building and refreshes the table
  const updateBuilding = async () => {
    let res = await buildingForm.update();

    if (!res) {
      // TODO: show alert

      return;
    }

    // TODO: show alert
  };

  return (
    <>
      <div>
        <p>Building: {params.slug}</p>
      </div>

      <EditBuildingForm item={buildingForm.value} onUpdate={updateBuilding} />
    </>
  );
}
