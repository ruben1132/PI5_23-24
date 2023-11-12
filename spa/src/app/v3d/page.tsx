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

async function fetchBuildings() {
  const response = await axios(
    config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings,
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
  const buildings = await fetchBuildings();

  return (
    <div>
      <p>V3D</p>

      <Scene floors={floors} buildings={buildings}/>
    </div>
  );
}
