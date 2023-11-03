"use client";

import EditBuildingForm from "@/components/forms/EditBuildingForm";
import config from "../../../../config";
import { useEffect } from "react";
import { useForm } from "@/util/customHooks";

interface Props {
  params: { slug: string };
}

export default async function Page({ params }: Props) {
  const buildingForm = useForm({});
  
  // updates the building and refreshes the table
  const updateBuilding = async () => {
    let res = await buildingForm.update(
      config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings
    );

    if (!res) {
      // TODO: show alert

      return;
    }

    // TODO: show alert
  };

  const fetchBuilding = async () => {
    try {
      // call api
      const response = await fetch(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings + params.slug
      );

      if (response.status !== 200) {
        // TODO: show alert
        return [];
      }

      buildingForm.handleChange(await response.json());
    } catch (error) {
      console.log(error);

      return [];
    }
  };

  // fetch building data on mount
  useEffect(() => {
    fetchBuilding();
  }, []);

  return (
    <>
      <div>
        <p>Building: {params.slug}</p>
      </div>

      <EditBuildingForm item={buildingForm.value} onUpdate={updateBuilding} />
    </>
  );
}
