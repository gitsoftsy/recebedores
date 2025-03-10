"use server";

import { ReceiverData } from "@/contexts/UserContext";
import { cookies } from "next/headers";

export async function getReceiverIdFromCookie() {
  const cookieStore = await cookies();
  const dataRecebedor = cookieStore.get("dataRecebedor");

  if (!dataRecebedor ) {
    throw new Error("ID do recebedor não encontrado no cookie");
  }

  return dataRecebedor.value;
}

export async function fetchReceiverData(idAccount: string, idReceiver: string) {
  const response = await fetch(
    `https://api.softsy.io/api-educacional-recebedor/recebedorTemp/${idReceiver}`,
    {
      headers: {
        idConta: idAccount,
      },
    }
  );

  if (!response.ok) {
    console.error("Erro ao buscar dados do recebedor");
    return null;
  }
  const data = await response.json();

  const receiver: ReceiverData = {
    id: data.idRecebedorTemp,
    contaId: data.idConta,
    cnpj: data.documento,
    email: data.email,
  };
  return receiver;
}
