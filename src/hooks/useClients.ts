import { useEffect, useState } from "react";
import ClientCollection from "../backend/database/ClientCollection";
import Client from "../core/Client";
import ClientRepository from "../core/ClientRepository";
import useTableForm from "./useTableForm";

export default function useClients() {
  const repository: ClientRepository = new ClientCollection();

  const { tableVisible, showTable, showForm } = useTableForm();

  const [client, setClient] = useState<Client>(Client.empty());
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(getAll, []);

  function getAll() {
    repository.getAll().then((clients) => {
      setClients(clients);
      showTable();
    });
  }

  function selectClient(client: Client) {
    setClient(client);
    showForm();
  }

  async function deleteClient(client: Client) {
    await repository.delete(client);
    getAll();
  }

  function newClient() {
    setClient(Client.empty());
    showForm();
  }

  async function saveClient(client: Client) {
    await repository.save(client);
    getAll();
  }

  return {
    tableVisible,
    showTable,
    client,
    clients,
    newClient,
    saveClient,
    deleteClient,
    selectClient,
    getAll,
  };
}
