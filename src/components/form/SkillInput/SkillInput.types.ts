import { SkillPillProps } from "@/components/ui/SkillPill/SkillPill.types";

export interface SKillInputProps {
  label?: string;
  labelColor?: string;
  labelSize?: string;
  skills: SkillPillProps[];
  value: SkillPillProps[];
  onChange: (value: SkillPillProps[]) => void;
}
