import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const urlParams = new URLSearchParams(url.search);
  const params = Object.fromEntries(urlParams.entries());

  if (params.name) {
    console.log(params.name);
  }

  let data;
  try {
    data = await db.select().from(advocates);
  } catch (err) {
    console.error(err);
  }

  return Response.json({ data });
}
