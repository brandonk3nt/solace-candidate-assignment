import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { ilike, or, and } from "drizzle-orm";

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
            ilike(advocates.lastName, `%${params.name}%`),
            and(
              or(
                ilike(advocates.firstName, `%${params.name.split(" ")[0]}%`),
                ilike(advocates.lastName, `%${params.name.split(" ")[0]}%`)
              ),
              or(
                ilike(advocates.firstName, `%${params.name.split(" ")[1]}%`),
                ilike(advocates.lastName, `%${params.name.split(" ")[1]}%`)
              )
            )
          )
        );
    } else {
      data = await db.select().from(advocates);
    }
  } catch (err) {
    console.error(err);
  }

  const response = await new Promise((resolve) => {
    setTimeout(() => resolve(Response.json({ data })), 500);
  });

  return response;
}
