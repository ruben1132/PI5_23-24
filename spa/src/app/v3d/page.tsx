"use client";

import Scene from "@/components/v3d/Scene";
import axios from "axios";
import config from "../../../config";
async function fetchFloors() {
  const response = await axios(
    config.mgiAPI.baseUrl + config.mgiAPI.routes.floors,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export default async function Page() {
  const floors = await fetchFloors();

  return (
    <div>
      <p>V3D</p>

      <Scene floors={floors} />
    </div>
  );
}
