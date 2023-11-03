import ContentTable from "@/components/table/Table";
import config from "../../../config";
import AddButton from "@/components/AddButton";

export default async function Rooms() {
  return (
    <div>
      <p>Rooms</p>

      <ContentTable
        type="room"
        routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.rooms}
        routeToPush={"/rooms/"}
      >
        <AddButton type="room" apiRoute={config.mgiAPI.baseUrl + config.mgiAPI.routes.rooms} />
      </ContentTable>
    </div>
  );
}
