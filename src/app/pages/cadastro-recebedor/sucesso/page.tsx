"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, QrCode } from "lucide-react";
import { toast } from "react-toastify";

export default function Sucesso() {
  const handleCopyLink = () => {
    const link = "https://your-app-link.com/verification";
    navigator.clipboard.writeText(link);
    toast.success("Link copiado com sucesso!", {
      position: "bottom-right",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-[95%] md:max-w-2xl lg:max-w-3xl">
        <CardContent className="p-6 sm:p-8 md:p-10 lg:p-14">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl text-center font-bold leading-tight">
              Seu cadastro está quase finalizado
            </h1>

            <div className="space-y-3">
              <p className="text-gray-600 text-base sm:text-lg">
                Agora você vai precisar enviar seus documentos e foto para
                validar as informações cadastradas.
              </p>

              <p className="text-gray-600 text-base sm:text-lg">
                Essa operação precisa ser feita a partir de um smartphone.
              </p>

              <p className="text-gray-600 text-base sm:text-lg">
                Para realizar o envio, scannei o QR-Code abaixo ou clique no
                botão "Copiar Link".
              </p>
            </div>

            <div className="flex justify-center py-4 sm:py-6">
              <QrCode
                className="text-gray-900 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64"
                strokeWidth={1.5}
              />
            </div>

            <div className="flex justify-center">
              <Button
                variant="default"
                className="w-full max-w-[280px] sm:max-w-sm text-base sm:text-lg py-4 sm:py-6 flex gap-2 items-center justify-center"
                onClick={handleCopyLink}
              >
                <Link className="w-4 h-4 sm:w-5 sm:h-5" />
                Copiar Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
