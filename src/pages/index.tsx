import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "../components/common/Layout";
import LoadingPage from "../components/common/LoadingPage";
import NotSignedPage from "../components/common/NotSignedPage";
import CreateButton from "../components/CreateButton";

const Home: NextPage = () => {

  const session = useSession()
  if(session.status === 'loading') return <LoadingPage />
	if(!session.data?.user) return <NotSignedPage />

  

  return (
    <Layout title="Notes">
      {/* pencilIcon on bottom-right corner */}
      <CreateButton />
    </Layout>
  );
};

export default Home;
