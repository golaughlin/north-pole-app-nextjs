import Link from "next/link";
import { db } from "../lib/db";
import { children } from "../db/schema";

export default async function Page() {
  const childrenList = await db.select().from(children);

  return (
    <main className="flex h-screen w-full max-w-3xl flex-col items-center justify-between py-8 px-16 bg-white dark:bg-black sm:items-start">
      <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          List of Children
        </h1>
        <ul className="list-disc">
          {childrenList.map((child) => (
            <li key={child.id}>
              <Link href={`/children/${child.id}`}>{child.firstName} {child.lastName}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
