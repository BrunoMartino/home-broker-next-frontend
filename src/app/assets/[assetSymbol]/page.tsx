import { AssetName } from "@/app/components/AssetName";
import { OrderForm } from "@/app/components/OrderForm";
import { Asset } from "@/types";
import { Card, TabItem, Tabs } from "flowbite-react";

export const getAsset = async (symbol: string): Promise<Asset> => {
  const response = await fetch(`http://localhost:3000/assets/${symbol}`);
  return response.json();
};

export default async function AssetDashboard({
  params,
}: {
  params: Promise<{ assetSymbol: string }>;
}) {
  const { assetSymbol } = await params;

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
                <OrderForm />
              </TabItem>
              <TabItem
                active
                title={<div className="text-green-700">Venda</div>}
              ></TabItem>
            </Tabs>
          </Card>
        </div>
        <div className="col-span-3 flex flex-grow"></div>
      </div>
    </div>
  );
}
