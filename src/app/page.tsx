"use client";

import { useForm } from "react-hook-form";
import { FormData, formSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { cookies } from "next/headers";
import { api } from "@/services/api";

export default function  Home() {
  const navigate = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  
  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post('/login', {
        email: data.email,
        senha: data.senha,
      });

      if (response.status === 200) {
        const { idRecebedor, nome, documento, tabela } = response.data;
        const cookieStore = await cookies();

        cookieStore.set('receiverId', idRecebedor, {
          path: '/',
          maxAge: 60 * 60 * 24 * 30,
        });

        navigate.push("/dashboard/start");
        form.reset(); 
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);

      form.setError("root", {
        type: "manual",
        message: "Erro ao fazer login. Verifique suas credenciais e tente novamente.",
      });
    }
  };

  return (
    <main className="containerLogin w-full h-full min-h-screen flex justify-center items-center">
      <Form {...form}>
        <form
          className="flex-col min-w-[320px] w-4/12 :"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="font-jkabode text-8xl mb-4">Login</h1>

          
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