import ContentTable from "@/components/table/Table";
import config from "../../../config";

export default async function Elevators() {

  return (
    <div>
      <p>Elevators</p>

      <ContentTable
        type="elevator"
        routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings}
        routeToPush={"/elevators/"}
      />
    </div>
  );
}
