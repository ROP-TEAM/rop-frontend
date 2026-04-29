export interface Order {
  id: number;
  startTimeWindow: string;
  endTimeWindow: string;
  capacity?: number;
  tagSkill?: string[];
  type: "pick up" | "delivery";
  priority: "critical" | "high" | "medium" | "low";
}
