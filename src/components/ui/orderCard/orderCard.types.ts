import { Order } from "@/app/features/order/order.types";

export interface orderCardProps extends Order {
  isSelect?: boolean;
}
