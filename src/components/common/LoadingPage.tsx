import { useAtom } from "jotai";
import { useEffect } from "react";
import { loadingAtom } from "../../store/global.store";
import Layout from "./Layout";

export default function LoadingPage() {
  const [_, setIsLoading] = useAtom(loadingAtom);

  useEffect(() => {
    setIsLoading(true);
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <Layout title="loading...">
      <p className="m-2 text-center">Loading...</p>
    </Layout>
  );
}
