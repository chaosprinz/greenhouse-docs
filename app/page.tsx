import Image from "next/image";

export default function Home() {
  return (
    <div className="font-mono">
      <h1 className="font-bold text-3xl text-center bg-emerald-600">Greenhouse</h1>
      <main className="flex gap-[1em] items-center justify-center mt-4">
        An open-source greenhouse controll and documentation system.
      </main>
      <footer className="flex gap-[1em] flex-wrap items-center justify-center mt-4 text-sm">
        powered by <b>NextJS</b> and <b>DrizzleORM</b>
      </footer>
    </div>
  );
};
