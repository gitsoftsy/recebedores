"use server";

import { cookies } from "next/headers";
import { api } from "@/services/api";
import { ReceiverData } from "@/contexts/UserContext";

export async function loginAction(email: string, senha: string) {
  try {
    const response = await api.post("/login", { email, senha });

    if (response.status === 200) {
      const { idRecebedor, idConta, nome } = response.data;

      const dataRecebedor: ReceiverData = {
        id : idRecebedor,
        contaId : idConta,
        nome : nome
      }

      const cookieStore = await cookies();

      cookieStore.set("dataRecebedor",  JSON.stringify(dataRecebedor) , {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      return { success: true };
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return { success: false, message: "Erro ao fazer login. Verifique suas credenciais." };
  }
}
