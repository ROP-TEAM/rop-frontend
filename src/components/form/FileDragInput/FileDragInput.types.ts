export interface FileDragInputProps {
  file: File | undefined;
  onChange: (value: File) => void;
  accept?: string;
}
