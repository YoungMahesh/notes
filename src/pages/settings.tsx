import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "../components/common/Layout";
import LoadingPage from "../components/common/LoadingPage";
import NotSignedPage from "../components/common/NotSignedPage";
import { trpc } from "../utils/trpc";
import csvDownload from "json-to-csv-export";
import { useAtom } from "jotai";
import { loadingAtom } from "../store/global.store";

const Settings: NextPage = () => {
  const session = useSession();
  const allNotes = trpc.notes.getAll.useQuery(undefined, { enabled: false });
  const loading = useAtom(loadingAtom);

  if (session.status === "loading") return <LoadingPage />;
  if (!session.data?.user) return <NotSignedPage />;

  const backupNotes = async () => {
    try {
      loading[1](true);
      const result = await allNotes.refetch();
      loading[1](false);
      if (!result.data) return alert("Could not able to fetch notes");

      const modData = result.data.map((n) => ({
        title: n.title,
        content: n.content,
        updated_at: n.updated_at,
        is_pinned: n.is_pinned,
      }));
      const notesData = {
        data: modData,
        filename: "all_notes",
      };
      csvDownload(notesData);
    } catch (err) {
      alert("Got Error, Check Console");
      console.log(err);
    }
  };

  return (
    <Layout title="Settings">
      <main className="mt-10 flex justify-center">
        <button className="btn btn-info rounded" onClick={backupNotes}>
          Backup All Notes
        </button>
      </main>
    </Layout>
  );
};

export default Settings;
