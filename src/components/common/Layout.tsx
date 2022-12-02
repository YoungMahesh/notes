import Head from "next/head";
import Header from "./Header";

export default function Layout({
  children,
  title,
}: {
  children: any;
  title: string;
}) {
  return (
    <>
      <Head1 title={title} />
      <Header />
      {children}
    </>
  );
}

const Head1 = ({ title }: { title: string }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Secret nodes" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
