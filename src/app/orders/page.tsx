import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { AssetName } from "../components/AssetName";
import { OrderTypeBadge } from "../components/OrderTypeBadge";
import { OrderStatusBadge } from "../components/OrderStatusBadge";
import { getAssets, getMyWallet, getOrders } from "@/queries/queries";
import { WalletList } from "../components/WalletList";

export default async function OrdersListPage({
  searchParams,
}: {
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { wallet_id } = await searchParams;

  if (!wallet_id) return <WalletList />;

  const wallet = await getMyWallet(wallet_id);

  if (!wallet) return <WalletList />;

  const orders = await getOrders(wallet_id);

  return (
    <div className="flex flex-col space-y-5">
      <article className="format">
        <h1>Minhas Ordens</h1>
      </article>
      <div className="overflow-x-auto w-full flex-grow">
        <Table className="h-full max-h-full table-fixed">
          <TableHead>
            <TableRow>
              <TableHeadCell className="bg-slate-200 text-gray-700">
                Ativo
              </TableHeadCell>
              <TableHeadCell className="bg-slate-200 text-gray-700">
                Preço
              </TableHeadCell>
              <TableHeadCell className="bg-slate-200 text-gray-700">
                Quantidade
              </TableHeadCell>
              <TableHeadCell className="bg-slate-200 text-gray-700">
                Tipo
              </TableHeadCell>
              <TableHeadCell className="bg-slate-200 text-gray-700">
                Status
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, key) => (
              <TableRow key={key}>
                <TableCell>
                  <AssetName asset={order.asset} />
                </TableCell>
                <TableCell>R$ {order.price}</TableCell>
                <TableCell>R$ {order.shares}</TableCell>
                <TableCell>
                  <OrderTypeBadge type={order.type} />
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
