import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "../components/common/Layout";
import LoadingPage from "../components/common/LoadingPage";
import NotSignedPage from "../components/common/NotSignedPage";
import CreateButton from "../components/CreateButton";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const session = useSession();
  const allNotes = trpc.notes.getAllTitles.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
  });

  if (session.status === "loading") return <LoadingPage />;
  if (!session.data?.user) return <NotSignedPage />;
  if (allNotes.isLoading) return <LoadingPage />;

  return (
    <Layout title="Notes">
      <main
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 320px))",
        }}
      >
        {allNotes.data
          ? allNotes.data.map((note, idx) => (
              <TitleCard key={idx} title={note.title} />
            ))
          : null}
      </main>
      <CreateButton /> {/* pencilIcon on bottom-right corner */}
    </Layout>
  );
};

const TitleCard = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <div className="card rounded bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions justify-end">
          <button className="btn" onClick={() => router.push(`/edit/${title}`)}>
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
