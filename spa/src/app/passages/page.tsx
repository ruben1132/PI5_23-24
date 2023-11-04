import ContentTable from "@/components/table/Table";
import config from "../../../config";


export default async function Passages() {

  return (
    <div>
      <p>Passages</p>

      <ContentTable
        type="passage"
        routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.passages}
        routeToPush={"/passages/"}
        />
    </div>
  );
}
