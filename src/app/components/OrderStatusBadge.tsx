import { OrderStatus } from "@/types";
import { Badge } from "flowbite-react";

export const OrderStatusBadge = (props: { status: OrderStatus }) => {
  let color: string;
  let text: string;

  switch (props.status) {
    case OrderStatus.PENDING:
      color = "info";
      text = "Pendente";
    case OrderStatus.OPEN:
      color = "warning";
      text = "Aberto";
    case OrderStatus.CLOSE:
      color = "success";
      text = "Concluído";
    case OrderStatus.FAILED:
      color = "failure";
      text = "Falhou";
      break;
  }
  return (
    <Badge color={color} className="w-fit">
      {text}
    </Badge>
  );
};
