import ContentTable from "@/components/table/Table";
import config from "../../../config";
import AddButton from "@/components/AddButton";

export default async function Users() {
  const data = await getData();

  return (
    <div>
      <p>Users</p>

      <ContentTable
        type="user"
        routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.users}
        routeToPush={"/users/"}
      >
        <AddButton type="user" apiRoute={config.mgiAPI.baseUrl + config.mgiAPI.routes.users} />
      </ContentTable>
    </div>
  );
}
