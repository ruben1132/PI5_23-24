import ContentTable from "@/components/table/Table";
import config from "../../../config";
import AddButton from "@/components/AddButton";

async function getData() {
  try {
    // call api
    const response = await fetch(
      config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings,{ cache: 'no-store' }
    );

    if (response.status !== 200) {
      // TODO: show alert
      return [];
    }

    return response.json();
  } catch (error) {
    console.log(error);

    return [];
  }
}

export default async function Buildings() {
  const data = await getData();

  return (
    <div>
      <p>Buildings</p>

      <AddButton type="building" />
      <ContentTable type="building" data={data} />
    </div>
  );
}
