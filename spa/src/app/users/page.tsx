import ContentTable from "@/components/table/Table";
import config from "../../../config";


export default async function Users() {

  return (
    <div>
      <p>Users</p>

      <ContentTable
        type="user"
        routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.users}
        routeToPush={"/users/"}
        />
    </div>
  );
}
