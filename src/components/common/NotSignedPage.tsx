import Layout from "./Layout";
import { signIn } from "next-auth/react";

export default function NotSignedPage() {
  return (
    <Layout title="Notes">
      <p className="m-2 text-center">You are not signed in.</p>
      <div className="flex justify-center">
        <button className="btn-primary btn" onClick={() => signIn()}>
          Sign In
        </button>
      </div>
    </Layout>
  );
}
