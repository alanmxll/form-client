import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";

export default function Home() {
  const clients = [
    new Client("Alan", 29, "1"),
    new Client("Laise", 27, "2"),
    new Client("Max", 9, "3"),
    new Client("Juice", 5, "4"),
  ];

  return (
    <div
      className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}
    >
      <Layout title="Registration">
        <Table clients={clients}></Table>
      </Layout>
    </div>
  );
}
