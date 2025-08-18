import { H3 } from "@/app/_components/designElements";
import Link from "next/link";

import type { Genetic } from "@/db/schema";

export default function Genetic({ genetic}: { genetic: Genetic}) {
    return (
        <div>
            <H3>Genetic</H3>
            <div>
                <p>Name: {genetic.name}</p>
                <p>Breeder: {genetic.breeder}</p>
                <p>Genus: {genetic.genus}</p>
                <p>Type: {genetic.type}</p>
                <p className="mt-3">
                    {genetic.productPage && <Link 
                        href={genetic.productPage} 
                        className="text-blue-400 hover:underline hover:text-blue-600 text-base"
                        target="blank"
                        rel="noopener noreferrer"
                    >
                        Link to Product-page
                    </Link>}
                </p>
            </div>
        </div>
    );
};
