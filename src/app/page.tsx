"use client";

import { useForm } from "react-hook-form";
import { FormData, formSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import logoSoftsy from "/public/logo-softsy.png"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/login-action";
import Image from "next/image";

export default function Home() {
  const navigate = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const result = await loginAction(data.email, data.senha);

    if (result && result.success) {
      navigate.push("/home");
      form.reset();
    } else {
      form.setError("root", {
        type: "manual",
        message: result?.message || "An error occurred",
      });
    }
  };

  return (
  
    <main className="containerLogin w-full h-full min-h-screen flex justify-center items-center ">
      <Form {...form}>
        <form
          className="flex-col relative p-5 shadow rounded-lg min-w-[320px] w-4/12 :"
          onSubmit={form.handleSubmit(onSubmit)}
        >
           <div className="mb-5 justify-center  w-full flex">
             <Image
                         src={logoSoftsy}
                         // width={500}
                         // height={500}
                         className="h-auto w-4/5"
                         alt="Logo"
                         priority={true}
                       />
            </div>

          {form.formState.errors.root && (
            <div className="text-red-500 mb-4">
              {form.formState.errors.root.message}
            </div>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    required={true}
                    type="email"
                    disabled={field.disabled}
                    id={field.name}
                    {...form.register(field.name)}
                    placeholder="email@email.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="senha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    required={true}
                    type="password"
                    disabled={field.disabled}
                    id={field.name}
                    {...form.register(field.name)}
                    placeholder="******"
                  />
                </FormControl>
                <a href="#" className="text-sm text-blue-500 hover:underline ">
                  Esqueci a senha
                </a>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full mt-8 bg-blue-950 transition duration-300 ease-in-out hover:bg-blue-800"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Carregando..." : "Logar"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
