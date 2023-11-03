import ContentTable from "@/components/table/Table";
import config from "../../../config";
import AddButton from "@/components/AddButton";

export default async function Roles() {

  return (
    <div>
      <p>Roles</p>

      <ContentTable
        type="role"
        routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.roles}
        routeToPush={"/roles/"}
      >
        <AddButton type="role" apiRoute={config.mgiAPI.baseUrl + config.mgiAPI.routes.roles} />
      </ContentTable>
    </div>
  );
}
