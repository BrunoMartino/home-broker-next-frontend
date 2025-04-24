import { Asset, Order, Wallet } from "@/types";

export const getAssets = async (): Promise<Asset[]> => {
  const response = await fetch(`http://localhost:3000/assets`);
  return response.json();
};

export const getAsset = async (symbol: string): Promise<Asset> => {
  const response = await fetch(`http://localhost:3000/assets/${symbol}`);
  return response.json();
};

export async function getWallets(): Promise<Wallet[]> {
  const res = await fetch(`http://localhost:3000/wallet`);

  return res.json();
}

export const getMyWallet = async (walletId: string): Promise<Wallet> => {
  const response = await fetch(`http://localhost:3000/wallet/${walletId}`);

  if (!response.ok) return null;

  return response.json();
};

export const getOrders = async (wallet_id: string): Promise<Order[]> => {
  const response = await fetch(
    `http://localhost:3000/orders?walletId=${wallet_id}`
  );
  return response.json();
};
