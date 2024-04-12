import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { creaditoId: string } }
) {
  try {
    const course = await db.creadito.findUnique({
      where: {
        id: params.creaditoId,
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedCourse = await db.creadito.delete({
      where: {
        id: params.creaditoId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSES_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { creaditoId: string } }
) {
  try {
    const { creaditoId } = params;
    const values = await req.json();

    const UpdateCasa = await db.creadito.update({
      where: {
        id: creaditoId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(UpdateCasa);
  } catch (error) {
    console.log("[COURSES_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
