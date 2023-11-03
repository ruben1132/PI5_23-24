import ContentTable from "@/components/table/Table";
import config from "../../../config";
import AddButton from "@/components/AddButton";

async function getData() {
  try {
    // call api
    const response = await fetch(
      config.mgiAPI.baseUrl + config.mgiAPI.routes.robots,{ cache: 'no-store' }
    );

    if (response.status !== 200) {
      // This will activate the closest `error.tsx` Error Boundary TODO: criar a pagina do error
      throw new Error("Failed to fetch data");
    }

    return response.json();
  } catch (error) {
    console.log(error);

    return [];
  }
}

export default async function Robots() {
  const data = await getData();

  return (
    <div>
      <p>Robots</p>

      <ContentTable type="robot"   routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.robots} >
      <AddButton type="robot" />
      </ContentTable>
    </div>
  );
}
