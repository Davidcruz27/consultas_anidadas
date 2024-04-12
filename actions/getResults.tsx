"use server"
import { db } from "@/lib/db"
import { Creadito } from "@prisma/client"

export const mostrarTodo = async () => {
    const resul : Creadito[] = await db.$queryRaw `Select * from Tarjetas`

    return resul
}

export const Anidadas = async () => {
    const resul : Creadito[] = await db.$queryRaw `Select * from Anidada`

    return resul
}