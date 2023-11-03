import ContentTable from "@/components/table/Table";
import config from "../../../config";
import AddButton from "@/components/AddButton";

export default async function Tasktypes() {
  const data = await getData();

  return (
    <div>
      <p>Tasktypes</p>

      <ContentTable
        type="tasktype"
        routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.tasktypes}
        routeToPush={"/tasktypes/"}
      >
        <AddButton type="tasktype" apiRoute={config.mgiAPI.baseUrl + config.mgiAPI.routes.tasktypes} />
      </ContentTable>
    </div>
  );
}
