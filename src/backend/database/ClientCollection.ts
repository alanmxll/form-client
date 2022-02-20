import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
} from "firebase/firestore";
import Client from "../../core/Client";
import ClientRepository from "../../core/ClientRepository";

export default class ClientCollection implements ClientRepository {
  conversor = {
    toFirestore(client: Client) {
      return {
        name: client.name,
        age: client.age,
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Client {
      const data = snapshot?.data(options);
      return new Client(data.name, data.age, snapshot?.id);
    },
  };

  async getAll(): Promise<Client[]> {
    const q = query(collection(getFirestore(), "clients"));
    const querySnapshot = await getDocs(q);

    const clients = querySnapshot.docs.map((doc) => {
      return new Client(doc.data().name, doc.data().age, doc.data().id);
    });

    return clients;
  }

  async save(client: Client): Promise<Client> {
    if (client?.id) {
      await setDoc(doc(getFirestore(), "clients", client.id), {
        name: client.name,
        age: client.age,
      });
      return client;
    } else {
      await addDoc(collection(getFirestore(), "clients"), {
        name: client.name,
        age: client.age,
      });
    }
  }

  async delete(client: Client): Promise<void> {
    await deleteDoc(doc(getFirestore(), "clients", client.id));
  }
}
