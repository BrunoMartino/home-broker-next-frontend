import { getWallets } from "@/queries/queries";
import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Link from "next/link";

export async function WalletList() {
  const wallets = await getWallets();
  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <Alert color="failure">Nenhuma carteira escolhida</Alert>
      <article className="format">
        <h1>Carteiras existentes:</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-max table-fixed">
          <TableHead>
            <TableRow>
              <TableHeadCell className="w-96">ID</TableHeadCell>
              <TableHeadCell>Acessar</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wallets.map((wallet, key) => (
              <TableRow key={key}>
                <TableCell className="w-full max-w-lg">{wallet._id}</TableCell>
                <TableCell>
                  <Link href={`/?wallet_id=${wallet._id}`}>Acessar</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
