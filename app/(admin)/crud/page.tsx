"use client";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  FormControl,
  Form,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Image from "next/image";

const formSchema = z.object({
  NombreBanco: z.string().min(1, {
    message: "Banco is required",
  }),
  Numero:z.coerce.number(),
  color: z.string(),

  tipo: z.string().min(1, {
    message: "tipo is required",
  }),
  precio:z.coerce.number()
});

const CreatePage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NombreBanco: "",
      tipo: "",
      precio: 0,
      Numero: 0,
      color: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
  
    try {
      const response = await axios.post("/api/card", values);
      router.push(`/crud/${response.data.id}`);
      toast.success("created");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-gradient-to-b h-screen grid grid-cols-2 from-[#101212] relative to-[#08201D] ">
      <div className="bg-[url('/cards.jpg')] bg-center bg-cover rounded-md"></div>
      <div className="p-6  ">
        <div className="flex justify-end">
          <a href="#" title="" className="flex">
            <Image width={300} height={300}
              className="w-auto h-8"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/logo.svg"
              alt=""
            />
          </a>
        </div>
        <div className="pt-12">
          <h1 className="text-2xl font-bold text-center text-white ">Create tu Card</h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-8"
            >
              <FormField
                control={form.control}
                name="NombreBanco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel><h1 className="text-white ">Nombre Del Banco </h1></FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g 'BBVA'"
                        className="text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="Numero"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel><h1 className="text-white ">Numero de la Tarjeta</h1></FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="4242-4242-4242-4242"
                            className="text-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel><h1 className="text-white ">Color de la Tarjeta </h1></FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Rojo , Azul'"
                            className="text-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="tipo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel><h1 className="text-white ">Tipo de Card </h1></FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="e.g 'Estelar'"
                            className="text-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="precio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel><h1 className="text-white ">Precio </h1></FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="$100000"
                            className="text-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex items-center gap-x-2 justify-center">
                <Link href="/crud/courses">
                  <Button type="button" variant="ghost" className="text-white">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
