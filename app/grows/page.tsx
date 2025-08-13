import Link from "next/link";
import { getGrowsWithGenetic, GrowWithGenetic } from "@/lib/grows";

const GrowItem = (grow: GrowWithGenetic) => {
    return (
        <li key={grow.id} className="list-disc">
            <Link href={`/grows/${grow.id}`}>
                {grow.genetic?.name}
            </Link>
        </li>
    )
}

export default async function Grows() {
    const growsData = await getGrowsWithGenetic()

    return (
        <div>
            <pre className="border-amber-400 border-2 p-6 mb-5">
                {JSON.stringify(growsData, null, 2)}
            </pre>
            
            <h2 className="text-xl text-center border-b-2 border-amber-50 mb-4">Meine Grows</h2>
            <ul className="pl-6">
                {growsData.map(GrowItem)}
            </ul>
        </div>
    )
};
