import { Fragment, useState } from "react";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";

export default function Home() {
  const [client, setClient] = useState<Client>(Client.empty());
  const [visible, setVisible] = useState<"table" | "form">("table");

  const clients = [
    new Client("Alan", 29, "1"),
    new Client("Laise", 27, "2"),
    new Client("Max", 9, "3"),
    new Client("Juice", 5, "4"),
  ];

  function clientSelected(client: Client) {
    setClient(client);
    setVisible("form");
  }

  function clientDeleted(client: Client) {
    console.log(client.name);
  }

  function newClient() {
    setClient(Client.empty());
    setVisible("form");
  }

  function saveClient(client: Client) {
    console.log(client);
    setVisible("table");
  }

  return (
    <div
      className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}
    >
      <Layout title="Registration">
        {visible === "table" ? (
          <Fragment>
            <div className="flex justify-end">
              <Button className="mb-4" color="green" onClick={newClient}>
                New Client
              </Button>
            </div>
            <Table
              clients={clients}
              clientSelected={clientSelected}
              clientDeleted={clientDeleted}
            ></Table>
          </Fragment>
        ) : (
          <Form
            client={client}
            cancelled={() => setVisible("table")}
            onSubmit={saveClient}
          />
        )}
      </Layout>
    </div>
  );
}
