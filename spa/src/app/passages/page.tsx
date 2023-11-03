import ContentTable from "@/components/table/Table";
import config from "../../../config";
import AddButton from "@/components/AddButton";

export default async function Passages() {

  return (
    <div>
      <p>Passages</p>

      <ContentTable
        type="passage"
        routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.passages}
        routeToPush={"/passages/"}
      >
        <AddButton type="passage" apiRoute={config.mgiAPI.baseUrl + config.mgiAPI.routes.passages} />
      </ContentTable>
    </div>
  );
}
