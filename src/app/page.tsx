import { Wallet } from "@/types";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { AssetName } from "./components/AssetName";

export const getMyWallet = async (walletId: string): Promise<Wallet> => {
  const response = await fetch(`http://localhost:3000/wallet/${walletId}`);
  return response.json();
};

export default async function MyWalletListPage({
  searchParams,
}: {
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { wallet_id } = await searchParams;
  const wallet = await getMyWallet(wallet_id);
  console.log(wallet);
  return (
    <div className="flex flex-col space-y-5">
      <article className="format">
        <h1>Minha Carteira</h1>
      </article>
      <div className="overflow-x-auto w-full flex-grow">
        <Table className="h-full max-h-full table-fixed">
          <TableHead>
            <TableRow>
              <TableHeadCell className="bg-slate-200 text-gray-700">
                Ativo
              </TableHeadCell>
              <TableHeadCell className="bg-slate-200 text-gray-700">
                Cotação
              </TableHeadCell>
              <TableHeadCell className="bg-slate-200 text-gray-700">
                Quantidade
              </TableHeadCell>
              <TableHeadCell className="bg-slate-200 text-gray-700">
                Comprar/Vender
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wallet.assets.map((walletAsset, key) => (
              <TableRow key={key}>
                <TableCell>
                  <AssetName asset={walletAsset.asset} />
                </TableCell>
                <TableCell>R$ {walletAsset.asset.price}</TableCell>
                <TableCell>{walletAsset.shares}</TableCell>
                <TableCell>
                  <Button color="light">Comprar / Vender</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
