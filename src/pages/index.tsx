import { type NextPage } from "next";
import Layout from "../components/common/Layout";
import CreateButton from "../components/CreateButton";

const Home: NextPage = () => {
  return (
    <Layout title="Notes">
      {/* pencilIcon on bottom-right corner */}
      <CreateButton />
    </Layout>
  );
};

export default Home;
