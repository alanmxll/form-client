import { Fragment } from "react";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import useClients from "../hooks/useClients";

export default function Home() {
  const {
    client,
    clients,
    deleteClient,
    newClient,
    saveClient,
    selectClient,
    tableVisible,
    showTable,
  } = useClients();

  return (
    <div
      className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}
    >
      <Layout title="Registration">
        {tableVisible ? (
          <Fragment>
            <div className="flex justify-end">
              <Button className="mb-4" color="green" onClick={newClient}>
                New Client
              </Button>
            </div>
            <Table
              clients={clients}
              clientSelected={selectClient}
              clientDeleted={deleteClient}
            ></Table>
          </Fragment>
        ) : (
          <Form client={client} cancelled={showTable} onSubmit={saveClient} />
        )}
      </Layout>
    </div>
  );
}
