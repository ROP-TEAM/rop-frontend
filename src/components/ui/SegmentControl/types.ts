interface SegmentProp {
  value: string;
  label: string;
  icon: string;
  onClick?: () => void;
}

interface SegmentControlProps {
  segments: SegmentProp[];
  value?: string;
  onChange?: (value: string) => void;
}