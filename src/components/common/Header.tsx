import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { BuildingLibraryIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Header() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <header className="mb-2 flex items-center">
      <div className="flex-1 lg:flex-none" onClick={() => router.push("/")}>
        <BuildingLibraryIcon className="h-8 w-8 cursor-pointer text-green-400 sm:h-10 sm:w-10" />
      </div>
      <div className="flex flex-1 justify-end">
        <div className="flex items-stretch">
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
              {sessionData ? (
                <>
                  <li>
                    <Link href="/settings">Settings</Link>
                  </li>
                  <li onClick={() => signOut()}>
                    <a>Sign out</a>
                  </li>
                </>
              ) : (
                <li onClick={() => signIn()}>
                  <a>Sign In</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
