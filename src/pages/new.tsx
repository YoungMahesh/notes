import { useSession } from "next-auth/react";
import { useState } from "react";
import Layout from "../components/common/Layout";
import LoadingPage from "../components/common/LoadingPage";
import NotSignedPage from "../components/common/NotSignedPage";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

export default function NewNote() {
  const router = useRouter();
  const session = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const createN = trpc.notes.create.useMutation();

  if (session.status === "loading") return <LoadingPage />;
  if (!session.data?.user) return <NotSignedPage />;

  const createNote = async () => {
    try {
      await createN.mutateAsync({ title, content, password: "" });
      router.push(`/edit/${title}`);
    } catch (err) {
      console.log(err);
    }
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
          placeholder="Bio"
          rows={17}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="m-2 flex justify-end">
          <button onClick={createNote} className="btn-primary btn">
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
}
