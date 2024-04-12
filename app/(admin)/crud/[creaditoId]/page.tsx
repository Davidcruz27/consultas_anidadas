import { db } from "@/lib/db";
import {
	ArrowBigLeft,
	CheckCircle2,
	CircleDollarSign,
	File,
	LayoutDashboard,
	ListChecks,
	ShowerHead,
} from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import CiudadFrom from "./_components/CiudadFrom";
import ImageForm from "./_components/ImagenForm";
import Actions from "./_components/actions";
import PriceFrom from "./_components/Price";
import Habitacion from "./_components/Habitacion";
import DescriptionFrom from "./_components/DescriptionFrom";

const casaIdPage = async ({ params }: { params: { creaditoId: string } }) => {
	const creadito = await db.creadito.findUnique({
		where: {
			id: params.creaditoId,
		},
	});

	if (!creadito) {
		return redirect("/");
	}

	const requiredFields = [
		creadito.NombreBanco,
		creadito.Numero,
		creadito.color,
		creadito.precio,
		creadito.imageUrl,
	];

	const totalFields = requiredFields.length;
	const completedFields = requiredFields.filter(Boolean).length;

	const completionText = `(${completedFields}/${totalFields})`;

	const isComplete = requiredFields.every(Boolean);

	return (
		<>
			<div className="p-6 bg-blue-900 ">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-2">
						<h1 className="text-2xl font-medium text-white">
							Registra tu Nueva Tarjeta
						</h1>
						<span className="text-sm text-white">
							complete all fill fields {completionText}
						</span>
					</div>
					<Actions disableb={!isComplete} creaditoId={params.creaditoId} />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
					<div>
						<div className="flex items-center gap-x-2">
							<IconBadge icon={LayoutDashboard} />
							<h2 className="text-xl text-white">Customize your Home</h2>
						</div>
						<CiudadFrom initialData={creadito} creaditoId={creadito.id} />
						<ImageForm initialData={creadito} creaditoId={creadito.id} />
					</div>
					<div className="space-y-6">
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={CheckCircle2} />
								<h2 className="text-xl text-white">Card Color</h2>
							</div>
							<DescriptionFrom
								initialData={creadito}
								creaditoId={creadito.id}
							/>
						</div>
						<div>
							<PriceFrom initialData={creadito} creaditoId={creadito.id} />
						</div>
						<div>
							<Habitacion initialData={creadito} creaditoId={creadito.id} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default casaIdPage;
