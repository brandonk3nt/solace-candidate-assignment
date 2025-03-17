import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET() {
  let specialtiesList = [];
  try {
    const response = await db.select().from(advocates);
    response.forEach((advocateObj) =>
      advocateObj.specialties.forEach((specialty) => {
        if (specialtiesList.indexOf(specialty) === -1) {
          specialtiesList.push(specialty);
        }
      })
    );
  } catch (err) {
    console.error(err);
  }

  return Response.json({ data: specialtiesList });
}
