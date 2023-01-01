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
  const [_isNewC, setIsNewCreated] = useAtom(notesListUpdatedAtom);
  const createN = trpc.notes.create.useMutation();
  const [_, setIsLoading] = useAtom(loadingAtom);

  if (session.status === "loading") return <LoadingPage />;
  if (!session.data?.user) return <NotSignedPage />;

  const createNote = async () => {
    if (!title.length) return alert("Title is required");
    setIsLoading(true);
    try {
      await createN.mutateAsync({
        title,
        content,
      });
      setIsNewCreated(true);
      router.push(`/edit/${title}`);
    } catch (err) {
      alert("Could not able to create note.");
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <Layout title="New Note">
      <div className="m-4 flex flex-col">
        <input
          type="text"
          placeholder="Title"
          className="input-bordered input m-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="textarea-bordered textarea m-2"
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
