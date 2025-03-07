import {
  fetchBanco,
  fetchOcupacaoProfissional,
  fetchTipoEmpresa,
} from "./actions/fetchOptions";
import StepForm from "./wizard/stepForm";

export default async function CadastroRecebedor() {
  const [tipoEmpresaOptions, bancoOptions, ocupacaoProfissionalOptions] =
    await Promise.all([
      fetchTipoEmpresa(),
      fetchBanco(),
      fetchOcupacaoProfissional(),
    ]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="bg-white border-gray-300 border-solid border rounded-lg p-6 md:p-10 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Cadastro de recebedor
          </h1>

          <StepForm
            tipoEmpresaOptions={tipoEmpresaOptions}
            bancoOptions={bancoOptions}
            ocupacaoProfissionalOptions={ocupacaoProfissionalOptions}
          />
        </div>
      </div>
    </div>
  );
}
