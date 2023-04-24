import { useSession } from "next-auth/react";
import { useState } from "react";
import Layout from "../components/common/Layout";
import LoadingPage from "../components/common/LoadingPage";
import NotSignedPage from "../components/common/NotSignedPage";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { loadingAtom, notesListUpdatedAtom } from "../store/global.store";

export default function NewNote() {
  const router = useRouter();
  const session = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const listUpdateS = useAtom(notesListUpdatedAtom);
  const createN = trpc.notes.create.useMutation();
  const loadingState = useAtom(loadingAtom);

  if (session.status === "loading") return <LoadingPage />;
  if (!session.data?.user) return <NotSignedPage />;

  const createNote = async () => {
    if (!title.length) return alert("Title is required");
    loadingState[1](true);
    try {
      await createN.mutateAsync({
        title,
        content,
      });
      listUpdateS[1](true);
      router.push(`/edit/${title}`);
    } catch (err) {
      alert("Could not able to create note.");
      console.log(err);
    }
    loadingState[1](false);
  };

  return (
    <Layout title="New Note">
      <div className="m-4 flex flex-col">
        <input
          type="text"
          placeholder="Title"
          className="input-bordered input m-2 text-lg font-bold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="textarea-bordered textarea m-2 text-lg"
          placeholder="Content"
          rows={17}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="m-2 flex items-center justify-end">
          <button onClick={createNote} className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
}
