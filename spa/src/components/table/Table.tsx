import Table from "react-bootstrap/Table";

interface Props {
  data: any;
}

async function ContentTable(props: Props) {
  if (!props.data || props.data.length === 0) {
    return <p>No data</p>;
  }

  const filteredColumns = Object.keys(props.data[0]).filter(
    (column: string) => column !== "id" && column !== "domainId"
  );

  return (
    <Table striped>
      <thead>
        <tr>
          {filteredColumns.map((column: string, index: number) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((item: any, index: number) => (
          <tr key={index}>
            {filteredColumns.map((column: string, index: number) => (
              <td key={index}>{item[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ContentTable;
