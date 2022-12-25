import { useSession } from "next-auth/react";
import { useState } from "react";
import Layout from "../components/common/Layout";
import LoadingPage from "../components/common/LoadingPage";
import NotSignedPage from "../components/common/NotSignedPage";
import { trpc } from "../utils/trpc";

export default function NewNote() {

	const session = useSession();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const createN = trpc.notes.create.useMutation();


	if(session.status === 'loading') return <LoadingPage />
	if(!session.data?.user) return <NotSignedPage />

	const createNote = async () => {
		try {
			await createN.mutateAsync({ title, content, password: "" });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Layout title='New Note'>
			<div className="flex flex-col m-4">

				<input type="text" placeholder="Title" className="input input-bordered m-2"
					value={title} onChange={e => setTitle(e.target.value)}
				/>
				<textarea className="textarea textarea-bordered m-2" placeholder="Bio" rows={17}
					value={content} onChange={e => setContent(e.target.value)}
				/>
				<div className="flex justify-end m-2">
					<button onClick={createNote} className="btn btn-primary">Save</button>
				</div>
			</div>
		</Layout>
	)
}