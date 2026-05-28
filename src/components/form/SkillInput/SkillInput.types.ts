import { SkillPillProps } from "@/components/ui/SkillPill/SkillPill.types";

export interface SKillInputProps {
<<<<<<< HEAD
  id?: number;
  isMutiSelect?: boolean;
=======
>>>>>>> 32e197b (KAN-130 vehicleUpload => uploadStepper)
  label?: string;
  labelColor?: string;
  labelSize?: string;
  skills: SkillPillProps[];
  value: SkillPillProps[];
  onChange: (value: SkillPillProps[]) => void;
}
