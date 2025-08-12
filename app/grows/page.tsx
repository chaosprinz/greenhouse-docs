import db from "@/db"
import { grows } from "@/db/schema"
import { InferSelectModel } from "drizzle-orm"
import Link from "next/link"

const GrowItem = (grow: InferSelectModel<typeof grows>) => {
    return (
        <li key={grow.id} className="list-disc">
            <Link href={`/grows/${grow.id}`}>
                {grow.genetic}
            </Link>
        </li>
    )
}

export default async function Grows() {
    const growsData = await db.query.grows.findMany()
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
