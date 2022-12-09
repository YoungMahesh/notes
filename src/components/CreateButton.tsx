import { useSession } from "next-auth/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const CreateButton = () => {
  const { data } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const createN = trpc.notes.create.useMutation();

  const createNote = async () => {
    await createN.mutateAsync({ title, content, password: "" });
    setTitle("");
    setContent("");
    setShowCreateModal(false);
  };

  return (
    <div>
      <input
        type="checkbox"
        id="my-modal-5"
        className="modal-toggle"
        checked={showCreateModal}
        readOnly
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="text-lg font-bold">Create Note</h3>

          <input
            type="text"
            placeholder="Title"
            className="input-bordered input m-2 w-full"
          />
          <textarea
            placeholder="Content"
            className="textarea-bordered textarea m-2 w-full"
            rows={7}
          />

          <div className="flex w-full flex-wrap justify-end">
            <button
              className="btn-secondary btn m-2"
              onClick={() => setShowCreateModal(false)}
            >
              Close
            </button>
            <button className="btn-primary btn m-2" onClick={createNote}>
              Create
            </button>
          </div>
        </div>
      </div>

      {data?.user ? (
        <div className="fixed right-5 bottom-5 md:right-16 md:bottom-16 lg:right-20 lg:bottom-20">
          <PencilIcon
            onClick={() => setShowCreateModal(true)}
            className="h-6 w-6 cursor-pointer text-green-400 sm:h-8 sm:w-8"
          />
        </div>
      ) : null}
    </div>
  );
};

export default CreateButton;
