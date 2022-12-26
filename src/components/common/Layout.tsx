import Head from "next/head";
import Header from "./Header";
import LoadingOverlay from "react-loading-overlay-ts";
import { useAtom } from "jotai";
import { loadingAtom } from "../../store/global.store";

export default function Layout({
  children,
  title,
}: {
  children: unknown;
  title: string;
}) {
  const [isLoading] = useAtom(loadingAtom);

  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text="Loading..."
      className="min-h-screen p-4"
    >
      <>
        <Head1 title={title} />
        <Header />
        <>{children}</>
      </>
    </LoadingOverlay>
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
