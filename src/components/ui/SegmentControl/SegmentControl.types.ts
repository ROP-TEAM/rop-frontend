export interface SegmentProp {
  value: string;
  label: string;
  icon?: string;
  onClick?: () => void;
}

export interface SegmentControlProps {
  fontSize?: string;
  segments: SegmentProp[];
  value?: string;
  onChange?: (value: string) => void;
}
