export const convertCoin = (coin: number | null, maximumFractionDigits?: number) => {
  return coin ? coin.toLocaleString("en-GB", { maximumFractionDigits: maximumFractionDigits || 2 }) : 0;
};

export const convertCoinBet = (coin: number) => {
  if (coin >= 1000 && coin < 10000) {
    return convertCoin(coin);
  }
  if (coin >= 10000 && coin < 1000000) {
    return `${(coin / 1000).toFixed(1)}K`;
  }
  if (coin >= 1000000 && coin < 1000000000) {
    return `${(coin / 1000000).toFixed(1)}M`;
  }
  if (coin >= 1000000000) {
    return `${(coin / 1000000000).toFixed(1)}B`;
  }

  return coin;
};

export const price = (value: string | number): number => {
  const numericValue = Number(`${value}`.replaceAll(/[^0-9.]/g, ""));
  return isNaN(numericValue) ? 0 : numericValue;
};

export const isNumber = function (value: any) {
  return !(typeof value !== 'number' || isNaN(value));
};
