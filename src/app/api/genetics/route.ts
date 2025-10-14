import { NextRequest, NextResponse } from "next/server";
import { getGeneticsResponse, postGeneticResponse } from "@/lib/responses";
import { GeneticInput } from "@/lib/data";

export async function GET(_req: NextRequest): Promise<NextResponse> {
  return getGeneticsResponse();
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const formData = await req.formData();

  // ✅ Correctly extract "type" and include all fields from GeneticInput
  const input: GeneticInput = {
    name: formData.get("name")?.toString() ?? "",
    breeder: formData.get("breeder")?.toString() ?? "",
    genus: formData.get("genus")?.toString() ?? "",
    type: formData.get("type")?.toString() ?? "",
    productPage: formData.get("productPage")?.toString() || undefined,
  };

  // ✅ Pass input directly — postGeneticResponse handles validation & errors
  return postGeneticResponse(input);
}
