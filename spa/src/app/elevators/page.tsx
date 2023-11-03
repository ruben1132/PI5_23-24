import ContentTable from "@/components/table/Table";
import config from "../../../config";
import AddButton from "@/components/AddButton";


export default async function Elevators() {

  return (
    <div>
      <p>Elevators</p>

      <ContentTable
        type="elevator"
        routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings}
        routeToPush={"/elevators/"}
      >
        <AddButton type="elevator" apiRoute={config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings} />
      </ContentTable>
    </div>
  );
}
