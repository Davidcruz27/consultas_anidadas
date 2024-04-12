"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, School, ShowerHead } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Creadito } from "@prisma/client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { formatPrice } from "@/lib/format";

interface HabitacionProps {
	initialData: Creadito;
	creaditoId: string;
}

const formShema = z.object({
	tipo: z.string(),
});

const Habitacion = ({ initialData, creaditoId }: HabitacionProps) => {
	const router = useRouter();

	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing(!isEditing);

	const form = useForm<z.infer<typeof formShema>>({
		resolver: zodResolver(formShema),
		defaultValues: {
			tipo: initialData?.tipo || undefined,
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formShema>) => {
		try {
			await axios.patch(`/api/card/${creaditoId}`, values);
			toast.success("succes");
			toggleEdit();
			router.refresh();
		} catch (error) {
			toast.error("Something webt wrong");
		}
	};
	return (
		<div className="mt-6 border bg-slate-500 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Tipo
				<Button variant={"ghost"} onClick={toggleEdit}>
					{isEditing ? (
						<>Cancel</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2 " />
							Edit Rooms
						</>
					)}
				</Button>
			</div>
			{!isEditing ? (
				<p
					className={cn(
						"text-sm mt-2 flex gap-5",
						!initialData.tipo && "text-slate-500 italic"
					)}
				>
					<School />
					{initialData.tipo ? initialData.tipo : "No tipo"}
				</p>
			) : (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="tipo"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											step={"0.01"}
											disabled={isSubmitting}
											placeholder="set a price for your course"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-x-2">
							<Button type="submit" disabled={!isValid || isSubmitting}>
								Save
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
};

export default Habitacion;
