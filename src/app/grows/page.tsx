import { getGrows } from "@/lib/data/grows";

export default async function Grows() {
  const growsData = await getGrows({ genetic: true });

  return (
    <div>
      <pre className="border-amber-400 border-2 p-6 mb-5">
        {JSON.stringify(growsData, null, 2)}
      </pre>

      <h2 className="text-xl text-center border-b-2 border-amber-50 mb-4">
        Meine Grows
      </h2>
    </div>
  );
}
