import ContentTable from "@/components/table/Table";
import config from "../../../config";
import AddButton from "@/components/AddButton";

async function getData() {
  try {
    // call api
    const response = await fetch(
      config.mgiAPI.baseUrl + config.mgiAPI.routes.passages,{ cache: 'no-store' }
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

export default async function Passages() {
  const data = await getData();

  return (
    <div>
      <p>Passages</p>

      <AddButton type="passage" />
      <ContentTable type="passage"  data={data} />
    </div>
  );
}
