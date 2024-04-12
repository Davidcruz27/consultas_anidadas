"use client";
import { Anidadas, mostrarTodo } from "@/actions/getResults";
import Header from "@/components/Header";
import { formatPrice } from "@/lib/format";
import { Creadito } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";

function Page() {
	const [resultado, setResultado] = useState<Creadito[]>([]);
	return (
		<div>
			<Header />
			<div className="border"></div>
			<div className="pt-12 border h-screen w-64 absolute flex flex-col font-semibold">
				<button
					className="mt-5 py-2 hover:bg-sky-200 "
					onClick={async () => setResultado(await mostrarTodo())}
				>
					Mostrar Todos
				</button>

				<button
					className="mt-5 py-2 hover:bg-sky-200 "
					onClick={async () => setResultado(await Anidadas())}
				>
					Anidadas
				</button>
				<a href="/" className="mt-3 py-2 text-center ">
					Volver
				</a>
			</div>
			<div className=" pl-64">
				<div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
					{resultado.map((items) => (
						<div
							key={items.id}
							className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full "
						>
							<div className="relative w-full aspect-video rounded-md overflow-hidden">
								<Image
									className="object-cover w-[300px] h-[300px]"
									alt={items.id}
									src={items.imageUrl!}
									fill
								/>
							</div>
							<div className="flex flex-col pt-2">
								<div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
									{items.NombreBanco}
								</div>
								<p className="text-xs text-muted-foreground">{items.color}</p>
								<div className="my-3 flex items-center gap-x-2 text-sm md:text-xs"></div>

								<p className="text-md md:text-sm font-medium text-slate-700">
									{formatPrice(items.precio!)}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Page;
