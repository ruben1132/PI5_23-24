import ContentTable from "@/components/table/Table";
import config from "../../../config";


export default async function Robottypes() {

  return (
    <div>
      <p>Robottypes</p>

      <ContentTable
        type="robottype"
        routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.robottypes}
        routeToPush={"/robottypes/"}
        />
    </div>
  );
}
