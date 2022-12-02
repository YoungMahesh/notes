import { signIn, signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/router";
import { PencilIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";


export default function Header() {
  const { data: sessionData, status } = useSession();
//   const router = useRouter();

  if (status === "loading") return <p className="text-center">Loading...</p>;

  return (
    <header className="navbar ">
      <div className="flex-1 px-2 lg:flex-none">
        <PencilIcon className="h-8 w-8 cursor-pointer text-green-400 sm:h-10 sm:w-10" />
      </div>
      <div className="flex flex-1 justify-end px-2">
        <div className="flex items-stretch">
          {sessionData ? (
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-ghost rounded-btn btn">
                <Bars3Icon className="h-8 w-8 cursor-pointer text-green-400 sm:h-10 sm:w-10" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <a
                    href="https://github.com/YoungMahesh/notes"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Source Code
                  </a>
                </li>
                <li onClick={() => signOut()}>
                  <a>Sign out</a>
                </li>
              </ul>
            </div>
          ) : (
            <button className="btn-primary btn" onClick={() => signIn()}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}


