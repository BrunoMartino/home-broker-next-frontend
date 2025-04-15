import { OrderType } from "@/types";
import { Badge } from "flowbite-react";

export const OrderTypeBadge = (props: { type: OrderType }) => {
  return (
    <Badge
      color={props.type === OrderType.BUY ? "blue" : "red"}
      className="w-fit"
    >
      {props.type === OrderType.BUY ? "Compra" : "Venda"}
    </Badge>
  );
};
