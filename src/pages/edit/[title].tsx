/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import { trpc } from "../../utils/trpc";
import type { GetServerSideProps } from "next";
import LoadingPage from "../../components/common/LoadingPage";
import NotExistPage from "../../components/common/NotExistPage";
import NotSignedPage from "../../components/common/NotSignedPage";
import { useRouter } from "next/router";
import { loadingAtom, notesListUpdatedAtom } from "../../store/global.store";
import { useAtom } from "jotai";
import Swal from "sweetalert2";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import copy from "copy-to-clipboard";

export default function EditNote({ title1 }: { title1: string }) {
  const router = useRouter();

  const session = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const listUpdateS = useAtom(notesListUpdatedAtom);

  const currNote = trpc.notes.get.useQuery({ title: title1 });
  const updateN = trpc.notes.update.useMutation();
  const deleteN = trpc.notes.delete.useMutation();
  const loadingS = useAtom(loadingAtom);

  useEffect(() => {
    if (title.length || !currNote.data) return;
    setTitle(currNote.data.title);
    setContent(currNote.data.content);
  }, [currNote]);

  if (session.status === "loading") return <LoadingPage />;
  if (!session.data?.user) return <NotSignedPage />;
  if (currNote.isLoading) return <LoadingPage />;
  if (!currNote.data) return <NotExistPage />;

  const updateNote = async () => {
    if (!currNote.data) return;
    if (!title.length) return alert("Title is required");
    loadingS[1](true);
    try {
      await updateN.mutateAsync({
        id: currNote.data.id,
        title,
        content,
      });
      listUpdateS[1](true);
      router.push(`/edit/${title}`);
    } catch (err) {
      alert("Could not able to update note.");
      console.log(err);
    }
    loadingS[1](false);
  };

  const copyContent = () => {
    copy(content);
    alert("Copied");
  };

  const deleteNote = async () => {
    loadingS[1](true);
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // use password to delete in future
        if (currNote.data) await deleteN.mutateAsync({ id: currNote.data.id });
        listUpdateS[1](true);
        router.push(`/`);
      }
    } catch (err) {
      alert("Could not able to delete note.");
      console.log(err);
    }
    loadingS[1](false);
  };

  return (
    <Layout title={title1}>
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
        <div className="m-2 flex justify-between">
          <button onClick={deleteNote} className="btn-error btn ml-2">
            Delete
          </button>
          <div className="flex items-center">
            <DocumentDuplicateIcon
              className="mr-2 h-8 w-8 cursor-pointer"
              onClick={copyContent}
            />
            <button onClick={updateNote} className="btn-primary btn">
              Save
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      title1: context.query.title,
    },
  };
};
