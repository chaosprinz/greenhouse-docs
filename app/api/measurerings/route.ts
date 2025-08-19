import db from "@/db";
import { grows, measurings } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function GET(_request: Request) {
  const result = await db.query.measurings.findMany({
    with: {
      grow: true,
    },
  });

  if (!result) {
    return notFound();
  }

  return Response.json(result);
}

const validateBody = async (body: any) => {
  if (!body.temperature) {
    return {
      valid: false,
      msg: "no temperature given",
    };
  }

  if (!Number.isInteger(body.temperature)) {
    return {
      valid: false,
      msg: "temperature is not an int",
    };
  }

  if (!body.humidity) {
    return {
      valid: false,
      msg: "no humidity given",
    };
  }

  if (!Number.isInteger(body.humidity)) {
    return {
      valid: false,
      msg: "humidity is not an int",
    };
  }

  if (!body.growId) {
    return {
      valdid: false,
      msg: "no growId given",
    };
  }

  if (!Number.isInteger(body.growId)) {
    return {
      valid: false,
      msg: "growId is not an int",
    };
  }

  const countResult = await db
    .select({ count: count() })
    .from(grows)
    .where(eq(grows.id, body.grow_id));

  if (countResult[0].count <= 0) {
    return {
      valid: false,
      msg: "grow for the given growId doesnt exist",
    };
  }

  return {
    valid: true,
    msg: "",
  };
};

export async function POST(request: Request) {
  const body = await request.json();

  const bodyValidation = await validateBody(body);
  if (!bodyValidation.valid) {
    return Response.json(bodyValidation, { status: 500 });
  }

  const postResult = await db.insert(measurings).values(body);

  return Response.json({
    insertData: body,
    resultData: postResult,
  });
}
