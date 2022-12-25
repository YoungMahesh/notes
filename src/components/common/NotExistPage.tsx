import Layout from "./Layout";

export default function NotExistPage({ title }: { title: string }) {
  return (
    <Layout title={title}>
      <p className="m-2 text-center">Note Does not Exist</p>
    </Layout>
  );
}
