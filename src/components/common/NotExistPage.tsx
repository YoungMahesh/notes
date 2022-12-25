import Layout from "./Layout";

export default function NotExistPage({title}: {title: string}) {
  return(
    <Layout title={title}>
      <p className="text-center m-2">Note Does not Exist</p>
    </Layout>
  )
}