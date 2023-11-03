import ContentTable from "@/components/table/Table";
import config from "../../../config";
import AddButton from "@/components/AddButton";

export default async function Tasks() {
  const data = await getData();

  return (
    <div>
      <p>Tasks</p>

      <ContentTable
        type="task"
        routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.tasks}
        routeToPush={"/tasks/"}
      >
        <AddButton type="task" apiRoute={config.mgiAPI.baseUrl + config.mgiAPI.routes.tasks} />
      </ContentTable>
    </div>
  );
}
