import ContentTable from "@/components/table/Table";
import config from "../../../config";
import AddButton from "@/components/AddButton";

export default async function Robots() {

  return (
    <div>
      <p>Robots</p>
      
      <ContentTable
        type="robot"
        routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.robots}
        routeToPush={"/robots/"}
      >
        <AddButton type="robot" apiRoute={config.mgiAPI.baseUrl + config.mgiAPI.routes.robots} />
      </ContentTable>
    </div>
  );
}
