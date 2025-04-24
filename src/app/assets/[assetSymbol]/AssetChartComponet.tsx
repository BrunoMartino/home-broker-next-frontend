"use client";

import { AssetName } from "@/app/components/AssetName";
import {
  ChartComponent,
  ChartComponentRef,
} from "@/app/components/ChartComponent";
import { Asset } from "@/types";
import { useRef } from "react";

export function AssetChartComponent(props: { asset: Asset }) {
  const chartRef = useRef<ChartComponentRef>(null);
  const { asset } = props;

  return <ChartComponent ref={chartRef} header={<AssetName asset={asset} />} />;
}
