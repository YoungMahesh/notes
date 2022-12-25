import Head from "next/head";
import Header from "./Header";

export default function Layout({
  children,
  title,
}: {
  children: unknown;
  title: string;
}) {
  return (
    <div className="p-4">
      <Head1 title={title} />
      <Header />
      <>{children}</>
    </div>
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
