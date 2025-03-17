import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function Users() {
  return (
    <section className="flex items-center justify-center h-full bg-system-grayBG">
      <div
        className="flex-col bg-white max-w-screen-md p-24 border-gray-300 border-solid border rounded-lg"
        style={{
          boxShadow: "15px 15px 30px #bebebe, -15px -15px 30px #ffffff",
        }}
      >
        <h1 className="text-center text-4xl font-normal mb-14">
          Cadastro de Parceiros
        </h1>
        <p className="text-xl text-justify">
          Prezado parceiro, para completar o seu cadastro tenha em mãos as
          seguintes informações:
        </p>
        <ul className="flex flex-col gap-3 mt-4 text-base text-justify">
          <li>
            <strong>- </strong>Dados da Empresa: Endereço completo, dados de
            contato, faturamento anual, informações do CNPJ como: tipo empresa
            (ME, LTDA, etc), data de fundação.
          </li>
          <li>
            <strong>- </strong>Dados bancários: Banco, Agencia e conta do CNPJ
            informado no cadastro.
          </li>
          <li>
            <strong>- </strong>Dados do Responsável Legal da Empresa: Nome
            completo, CPF, nome da mão, renda mensal, ocupação, data de
            nascimento endereço completo e dados de contato.
          </li>
        </ul>
        <div className="flex items-center justify-end mt-8">
          <Link
            href={"/cadastro-recebedor"}
            className="border-2 border-solid border-system-blue rounded-full p-1 text-system-blue hover:bg-system-blue hover:text-white transition-all ease-in-out duration-500"
          >
            <FaArrowRight size={40} />
          </Link>
        </div>
      </div>
    </section>
  );
}
