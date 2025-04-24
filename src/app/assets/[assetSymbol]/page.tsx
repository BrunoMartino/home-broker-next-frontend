import { AssetName } from "@/app/components/AssetName";
import { OrderForm } from "@/app/components/OrderForm";
import { OrderType } from "@/types";
import { Card, TabItem, Tabs } from "flowbite-react";
import { AssetChartComponent } from "./AssetChartComponet";
import { getAsset, getMyWallet } from "@/queries/queries";
import { WalletList } from "@/app/components/WalletList";

export default async function AssetDashboard({
  params,
  searchParams,
}: {
  params: Promise<{ assetSymbol: string }>;
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { assetSymbol } = await params;
  const { wallet_id } = await searchParams;

  if (!wallet_id) return <WalletList />;

  const wallet = await getMyWallet(wallet_id);

  if (!wallet) return <WalletList />;

  const asset = await getAsset(assetSymbol);
  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <div className="flex flex-col space-y-2">
        <AssetName asset={asset} />
        <div className="ml-2 font-bold text-2xl">R$ {asset.price}</div>
      </div>
      <div className="grid grid-cols-5 flex-grow gap-2">
        <div className="col-span-2">
          <Card>
            <Tabs>
              <TabItem
                active
                title={<div className="text-blue-700">Comprar</div>}
              >
                <OrderForm
                  asset={asset}
                  wallet_id={wallet_id}
                  type={OrderType.BUY}
                />
              </TabItem>
              <TabItem
                active
                title={<div className="text-green-700">Venda</div>}
              >
                <OrderForm
                  asset={asset}
                  wallet_id={wallet_id}
                  type={OrderType.SELL}
                />
              </TabItem>
            </Tabs>
          </Card>
        </div>
        <div className="col-span-3 flex flex-grow">
          <AssetChartComponent asset={asset} />
        </div>
      </div>
    </div>
  );
}
