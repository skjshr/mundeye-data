// world-lens/src/lib/types.ts と互換の型。data repo は JSON しか吐かないので、
// フロント側が受け取るシェイプだけ合わせれば OK。

export interface NewsItem {
  id: string;
  headline: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string; // ISO8601
  countryCode: string;
  tone?: number;
  lang: string;
}

export interface StockIndex {
  symbol: string;
  name: string;
  countryCode: string;
  price: number;
  changePct: number;
  currency: string;
  asOf: string; // ISO8601
}

export interface ClimateNow {
  countryCode: string;
  cityName: string;
  tempC: number;
  weatherCode: number;
  humidity?: number;
  asOf: string;
}

export interface PopulationStat {
  countryCode: string;
  population: number;
  year: number;
}

/**
 * 為替レート（1 base = rate quote）。FRED の DEXxxYY シリーズに由来する。
 * 例: pair="USD/JPY", base="USD", quote="JPY", rate=158.39 は
 *     「1 USD = 158.39 JPY」を意味する。
 *
 * StockIndex と分離した理由: StockIndex は単通貨 × 単国の指数で「国の経済」を示すが、
 * ForexRate は 2 通貨の相対価値で「国を跨ぐ通貨強度」を示す。UI 側の見せ方も縦並び
 * 複数ペア想定で countryCode 単数キーが意味を成さない。
 */
export interface ForexRate {
  pair: string; // "USD/JPY"
  base: string; // "USD"
  quote: string; // "JPY"
  rate: number;
  changePct: number;
  asOf: string; // ISO8601
}

/**
 * 商品（原油など）のスポット価格。FRED の DCOILWTICO / DCOILBRENTEU 等。
 * 金（gold）は FRED 日次シリーズが停止済みのため Phase A 対象外。
 * ForexRate と別型の理由: pair を持たず unit（bbl/oz 等）で価格を解釈する必要がある。
 */
export interface Commodity {
  symbol: string; // "WTI" | "BRENT"
  name: string; // "WTI 原油"
  price: number;
  changePct: number;
  currency: string; // "USD"
  unit: string; // "bbl"（1 バレル = 約 159 L）
  asOf: string;
}

/**
 * 米国債利回り（FRED DGS2 / DGS10 / DGS30）。
 * yield は既に % 単位の値なので「前日比」は basis point（bp）で返す（金融慣習）。
 * changePct を使うと "4.32% の 0.7% 増" のような二重%になり誤読を誘うので採らない。
 */
export interface YieldRate {
  symbol: string; // "US10Y"
  name: string; // "米 10 年国債"
  yield: number; // percent value（4.32 → 4.32%）
  changeBps: number; // basis points（1bp = 0.01%）
  asOf: string;
}
