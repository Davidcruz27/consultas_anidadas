import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { NombreBanco, Numero, color, tipo, precio } = await req.json();

   
    const course = await db.creadito.create({
      data: {
        NombreBanco,
        Numero,
        color,
        tipo,
        precio,

      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
