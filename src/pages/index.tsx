import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "../components/common/Layout";
import LoadingPage from "../components/common/LoadingPage";
import NotSignedPage from "../components/common/NotSignedPage";
import CreateButton from "../components/CreateButton";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { notesListUpdatedAtom } from "../store/global.store";

const Home: NextPage = () => {
  const [currPage, setCurrPage] = useState(1);
  const session = useSession();
  const pagesCount = trpc.notes.getPagesCount.useQuery();
  const allNotes = trpc.notes.getAllTitles.useQuery({ page: currPage });
  const [isCreateOrDelete, setIsCreateOrDelete] = useAtom(notesListUpdatedAtom);

  useEffect(() => {
    if (!isCreateOrDelete) return;
    setIsCreateOrDelete(false);
    window.location.reload();
  }, []);

  if (session.status === "loading") return <LoadingPage />;
  if (!session.data?.user) return <NotSignedPage />;
  if (allNotes.isLoading || pagesCount.isLoading) return <LoadingPage />;

  return (
    <Layout title="Notes">
      <main
        className="grid justify-center gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 320px))",
        }}
      >
        {allNotes.data
          ? allNotes.data.map((note, idx) => (
              <TitleCard
                key={idx}
                id={note.id}
                title={note.title}
                isPinned={note.is_pinned}
                refetch={allNotes.refetch}
              />
            ))
          : null}
      </main>
      <div className="mt-10 flex justify-center">
        <div className="btn-group">
          {new Array(pagesCount.data).fill(0).map((_, idx) => (
            <button
              key={idx}
              className={`btn ${currPage === idx + 1 ? "btn-active" : ""}`}
              onClick={() => setCurrPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
      <CreateButton /> {/* pencilIcon on bottom-right corner */}
    </Layout>
  );
};

const TitleCard = ({
  id,
  title,
  isPinned,
  refetch,
}: {
  id: number;
  title: string;
  isPinned: boolean;
  refetch: () => Promise<unknown>;
}) => {
  const router = useRouter();
  const updatePin = trpc.notes.updatePin.useMutation();
  const [isPinUpdating, setIsPinUpdating] = useState(false);

  const updatePin1 = async () => {
    setIsPinUpdating(true);
    await updatePin.mutateAsync({ id, isPinned: !isPinned });
    await refetch();
    setIsPinUpdating(false);
  };

  return (
    <div className="card rounded rounded-lg bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions items-center justify-end">
          {isPinUpdating ? (
            <button className="btn-outline btn loading rounded"></button>
          ) : (
            <button className="btn-outline btn rounded" onClick={updatePin1}>
              <Image
                src={isPinned ? "/svg/pin-solid.svg" : "/svg/pin.svg"}
                width={24}
                height={24}
                alt="pin"
              />
            </button>
          )}

          <button
            className="btn-outline btn rounded"
            onClick={() => router.push(`/edit/${title}`)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
