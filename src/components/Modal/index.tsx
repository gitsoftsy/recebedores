import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, XCircle } from "lucide-react";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  success?: boolean;
}

export function Modal({
  open,
  setOpen,
  success,
  title,
  description,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="flex flex-col items-center justify-center gap-4 pt-8 pb-6">
            {success !== undefined &&
              (success ? (
                <CheckCircle className="w-20 h-20 text-green-500" />
              ) : (
                <XCircle className="w-20 h-20 text-red-500" />
              ))}
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
