import ContentTable from "@/components/table/Table";
import config from "../../../config";
import AddButton from "@/components/AddButton";

export default async function Robottypes() {

  return (
    <div>
      <p>Robottypes</p>

      <ContentTable
        type="robottype"
        routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.robottypes}
        routeToPush={"/robottypes/"}
      >
        <AddButton type="robottype" apiRoute={config.mgiAPI.baseUrl + config.mgiAPI.routes.robottypes} />
      </ContentTable>
    </div>
  );
}
