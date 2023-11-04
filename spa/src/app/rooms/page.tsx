import ContentTable from "@/components/table/Table";
import config from "../../../config";


export default async function Rooms() {
  return (
    <div>
      <p>Rooms</p>

      <ContentTable
        type="room"
        routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.rooms}
        routeToPush={"/rooms/"}
        />
    </div>
  );
}
