import Client from "../core/Client";

interface TableProps {
  clients: Client[];
}

export default function Table(props: TableProps) {
  function renderHeader() {
    return (
      <tr>
        <th>Code</th>
        <th>Name</th>
        <th>Age</th>
      </tr>
    );
  }

  function renderData() {
    return props.clients?.map((client, index) => {
      return (
        <tr key={client.id}>
          <td>{client.id}</td>
          <td>{client.name}</td>
          <td>{client.age}</td>
        </tr>
      );
    });
  }

  return (
    <table>
      <thead>{renderHeader()}</thead>
      <tbody>{renderData()}</tbody>
    </table>
  );
}
