import { ReactNode } from "react";

export interface ModalProps {
  children: ReactNode;
  isActive: boolean;
  onCloce: () => void;
  marginTop?: string;
}
