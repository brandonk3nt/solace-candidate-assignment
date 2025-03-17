import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { ilike, or } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const urlParams = new URLSearchParams(url.search);
  const params = Object.fromEntries(urlParams.entries());

  let data;
  try {
    if (params.name) {
      data = await db
        .select()
        .from(advocates)
        .where(
          or(
            ilike(advocates.firstName, `%${params.name}%`),
            ilike(advocates.lastName, `%${params.name}%`)
          )
        );
    } else {
      data = await db.select().from(advocates);
    }
  } catch (err) {
    console.error(err);
  }

  return Response.json({ data });
}
