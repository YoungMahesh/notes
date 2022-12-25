import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import { trpc } from "../../utils/trpc";
import type { GetServerSideProps } from "next";
import LoadingPage from "../../components/common/LoadingPage";
import NotExistPage from "../../components/common/NotExistPage";
import NotSignedPage from "../../components/common/NotSignedPage";
import { useRouter } from "next/router";

export default function EditNote({ title1 }: { title1: string }) {
  const router = useRouter();

  const session = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const currNote = trpc.notes.get.useQuery({ title: title1 });
  const updateN = trpc.notes.update.useMutation();
  const deleteN = trpc.notes.delete.useMutation();

  useEffect(() => {
    if (!currNote.data) return;
    setTitle(currNote.data.title);
    setContent(currNote.data.content);
  }, [currNote]);

  if (session.status === "loading") return <LoadingPage />;
  if (!session.data?.user) return <NotSignedPage />;
  if (currNote.isLoading) return <LoadingPage />;
  if (!currNote.data) return <NotExistPage title={title1} />;

  const updateNote = async () => {
    if (!currNote.data) return;
    try {
      await updateN.mutateAsync({
        id: currNote.data.id,
        title,
        content,
        password: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async () => {
    if (!currNote.data) return;
    try {
      // use password to delete in future
      await deleteN.mutateAsync({ id: currNote.data.id });
      router.push(`/`);
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
          <button onClick={updateNote} className="btn-primary btn">
            Save
          </button>
          <button onClick={deleteNote} className="btn-error btn ml-2">
            Delete
          </button>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const res = await fetch('https://.../data')
  // const data: Data = await res.json()
  console.log("context", context.query);

  return {
    props: {
      title1: context.query.title,
    },
  };
};
