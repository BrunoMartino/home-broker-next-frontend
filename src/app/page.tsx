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
import Image from "next/image";

export const getMyWallet = async (walletId: string): Promise<Wallet> => {
  const response = await fetch(`http://localhost:3000/wallet/${walletId}`);
  return response.json();
};

export default async function MyWalletList({
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
                  <div className="flex space-x-1">
                    <div className="content-center">
                      <Image
                        src={walletAsset.asset.image_url}
                        alt={walletAsset.asset.symbol}
                        width={30}
                        height={30}
                      />
                    </div>
                    <div className="flex flex-col text-sm">
                      <span>{walletAsset.asset.name}</span>
                      <span>{walletAsset.asset.symbol}</span>
                    </div>
                  </div>
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
