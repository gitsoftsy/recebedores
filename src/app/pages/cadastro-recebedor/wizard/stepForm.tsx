"use client";

import { useContext, useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { Options } from "@/@types/options";
import { Step1FormData, Step2FormData, Step3FormData } from "../schema";
import { api } from "@/services/api";
import { UserContext } from "@/contexts/UserContext";
import { Modal } from "@/components/Modal";
import { CheckCircle } from "lucide-react";

export interface StepFormProps {
  tipoEmpresaOptions: Options;
  bancoOptions: Options;
  ocupacaoProfissionalOptions: Options;
}

export interface FormDataWizard {
  step1Data: Step1FormData;
  step2Data: Step2FormData;
  step3Data: Step3FormData;
}

export default function StepForm({
  tipoEmpresaOptions,
  bancoOptions,
  ocupacaoProfissionalOptions,
}: StepFormProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataWizard>({
    step1Data: {} as Step1FormData,
    step2Data: {} as Step2FormData,
    step3Data: {} as Step3FormData,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);

  const { receiver } = useContext(UserContext);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  async function handleSubmit(data: FormDataWizard) {
    const normalizeData = (obj: any) => {
      return Object.fromEntries(
        Object.entries(obj || {}).map(([key, value]) => [key, value ?? null]) 
      );
    };

    const recebedorPjData = {
      ...normalizeData(data.step1Data),
      ...normalizeData(data.step2Data),
      ...normalizeData(data.step3Data),
      idRecebedorTemp: receiver?.id ?? null,
    };
    
    console.log(recebedorPjData);

    try {
      await api.post("/recebedorPj", recebedorPjData, {
        headers: {
          idConta: receiver?.contaId,
        },
      });

      setModalTitle("Cadastro Finalizado");
      setModalMessage("O cadastro foi concluído com sucesso!");
      setModalSuccess(true);
      setModalOpen(true);
    } catch (error: any) {
      console.error("Erro ao enviar dados", error);
      const errorMessage =
        error.response?.data?.mensagem || "Ocorreu um erro inesperado.";

      setModalTitle("Erro ao cadastrar");
      setModalMessage(errorMessage);
      setModalSuccess(false);
      setModalOpen(true);
    }
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {["1", "2", "3"].map((label, index) => (
            <span
              key={index}
              className={`text-xl font-semibold inline-block py-1 px-3 uppercase rounded-full text-green-600 bg-green-200 ${
                index + 1 <= currentStep ? "" : "opacity-50"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
          <div
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {currentStep === 1 && (
        <Step1
          nextStep={nextStep}
          formData={formData}
          setFormData={setFormData}
          tipoEmpresaOptions={tipoEmpresaOptions}
          bancoOptions={bancoOptions}
          receiverData={receiver ? receiver : undefined}
        />
      )}
      {currentStep === 2 && (
        <Step2
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      {currentStep === 3 && (
        <Step3
          prevStep={prevStep}
          formData={formData}
          handleSubmit={handleSubmit}
          ocupacaoProfissionalOptions={ocupacaoProfissionalOptions}
        />
      )}
      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        title={modalTitle}
        description={modalMessage}
        success={modalSuccess}
      />
    </>
  );
}
