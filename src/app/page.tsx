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
import { WalletList } from "./components/WalletList";
import Link from "next/link";
import { getMyWallet } from "@/queries/queries";

export default async function MyWalletListPage({
  searchParams,
}: {
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { wallet_id } = await searchParams;

  if (!wallet_id) return <WalletList />;

  const wallet = await getMyWallet(wallet_id);

  if (!wallet) return <WalletList />;

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
                  <Button
                    color="light"
                    as={Link}
                    href={`/assets/${walletAsset.asset.symbol}?wallet_id=${wallet_id}`}
                  >
                    Comprar / Vender
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
