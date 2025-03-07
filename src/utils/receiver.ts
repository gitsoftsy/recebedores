'use server'

import { cookies } from "next/headers";

export async function getReceiverIdFromCookie() {
    const cookieStore = await cookies();
    const receiverId = cookieStore.get('receiverId');
    
    if (!receiverId) {
      throw new Error('ID do recebedor não encontrado no cookie');
    }
  
    return receiverId.value;
  }
  
  export async function fetchReceiverData(idAccount: string, idReceiver: string) {
    const response = await fetch(`https://api.softsy.io/api-educacional-recebedor/recebedorTemp/${idReceiver}`, {
      headers: {
        idConta: idAccount,
        }
      });

    if (!response.ok) {
      console.error('Erro ao buscar dados do recebedor');
      return null;
    }
    const data = await response.json();
  
    return {
      cnpj: data.conta.cnpj,
      email: data.email,
    };
  }
  