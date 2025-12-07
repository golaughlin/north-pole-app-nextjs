import { db } from "@/app/lib/db";
import { children } from "@/app/db/schema";
import Link from "next/link";

export async function generateStaticParams() {
  const childrenList = await db.select().from(children);

  return childrenList.map((child) => ({
    id: child.id.toString(),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  return (
    <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          {id}
        </h1>

        <Link 
          className="flex items-center justify-center text-center bg-black font-medium text-zinc-50 px-4 py-2 dark:bg-white dark:text-black"
          href="/children">
          Return to List
        </Link>
      </div>
    </main>
  )
}