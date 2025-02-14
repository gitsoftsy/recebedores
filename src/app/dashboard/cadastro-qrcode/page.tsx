"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function QRCode(){
    return (
        <section className="flex items-center justify-center h-full bg-system-grayBG">
          <div
            className="flex-col bg-white max-w-screen-md p-24 border-gray-300 border-solid border rounded-lg"
            style={{
              boxShadow: "15px 15px 30px #bebebe, -15px -15px 30px #ffffff",
            }}
          >
            <h1 className="text-center text-4xl font-semibold mb-14">
              Seu cadastro está quase finalizado
            </h1>
            <p className="text-xl text-justify">
              Agora você vai precisar enviar seus documentos e foto para validar as informações cadastradas. <br /><br />
              Essa operação precisa ser feita a partir de um smartphone. <br /><br />
              Para realizar o envio, scannei o QR-Code abaixo ou clique no botão "Copiar Link"
            </p>
            <div className="flex items-center justify-center mt-8">
              <Link
                href={"/dashboard/cadastro-recebedor"}
                className="border-2 border-solid text-2xl mt-2 border-system-blue rounded-lg px-4 py-2 text-system-blue hover:bg-system-blue hover:text-white transition-all ease-in-out duration-500"
              >
                Copiar Link
              </Link>
            </div>
          </div>
        </section>
      );
    }
    