import ContentTable from "@/components/table/Table";
import config from "../../../config";
import AddButton from "@/components/AddButton";

export default async function Floors() {
  return (
    <div>
      <p>Floors</p>

      <ContentTable
        type="floor"
        routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.floors}
        routeToPush={"/floors/"}
      >
        <AddButton type="floor" apiRoute={config.mgiAPI.baseUrl + config.mgiAPI.routes.floors} />
      </ContentTable>
    </div>
  );
}
