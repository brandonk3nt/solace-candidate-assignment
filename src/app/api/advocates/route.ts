import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET() {
  // Uncomment this line to use a database
  let data;
  try {
    data = await db.select().from(advocates);
  } catch (err) {
    console.error(err);
  }

  // const data = advocateData;

  return Response.json({ data });
}
