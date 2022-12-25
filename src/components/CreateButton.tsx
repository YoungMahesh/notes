import { useSession } from "next-auth/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

const CreateButton = () => {
  const router = useRouter();
  const { data } = useSession();

  return (
    <div>
      {data?.user ? (
        <div className="fixed right-5 bottom-5 md:right-16 md:bottom-16 lg:right-20 lg:bottom-20">
          <PencilIcon
            onClick={() => router.push("/new")}
            className="h-6 w-6 cursor-pointer text-green-400 sm:h-8 sm:w-8"
          />
        </div>
      ) : null}
    </div>
  );
};

export default CreateButton;
