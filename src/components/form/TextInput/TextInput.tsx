import { TextInputProps } from "./TextInput.types";

export const TextInput = ({
  label = "",
  placeholder,
  value,
  fontSize = "1rem",
  width = "100%",
  onChange,
}: TextInputProps) => {
  return (
    <div>
      {label && <p>{label}</p>}
      <div></div>
    </div>
  );
};
