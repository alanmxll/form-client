import { Fragment, useEffect, useState } from "react";
import ClientCollection from "../backend/database/ClientCollection";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";
import ClientRepository from "../core/ClientRepository";

export default function Home() {
  const repository: ClientRepository = new ClientCollection();

  const [client, setClient] = useState<Client>(Client.empty());
  const [clients, setClients] = useState<Client[]>([]);
  const [visible, setVisible] = useState<"table" | "form">("table");

  useEffect(getAll, []);

  function getAll() {
    repository.getAll().then((clients) => {
      setClients(clients);
      setVisible("table");
    });
  }

  function clientSelected(client: Client) {
    setClient(client);
    setVisible("form");
  }

  async function clientDeleted(client: Client) {
    await repository.delete(client);
    getAll();
  }

  function newClient() {
    setClient(Client.empty());
    setVisible("form");
  }

  async function saveClient(client: Client) {
    await repository.save(client);
    getAll();
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
