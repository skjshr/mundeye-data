// USGS Earthquake API。CORS 対応、APIキー不要、レート制限 60秒キャッシュ。
// https://earthquake.usgs.gov/fdsnws/event/1/
//
// M4.5+ の地震を過去 24 時間分取得。GeoJSON 形式で返る。
// 出力: snapshots/usgs-earthquakes.json

import { fetchJson, writeJson } from "../lib/io.ts";

/** USGS GeoJSON レスポンスの feature */
interface UsgsFeature {
  id: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    title: string;
  };
  geometry: {
    coordinates: [number, number, number]; // [lng, lat, depth]
  };
}

interface UsgsResponse {
  features: UsgsFeature[];
}

/** mundeye-data 側の出力型。world-lens の DisasterEvent と一致させる */
interface DisasterEvent {
  id: string;
  type: "earthquake";
  lat: number;
  lng: number;
  intensity: number;
  timestamp: string;
  description: string;
  source: "USGS";
}

export async function fetchUsgs(): Promise<void> {
  console.log("• USGS Earthquakes (M4.5+ / 24h)…");

  try {
    const url =
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson";
    const data = await fetchJson<UsgsResponse>(url);

    const events: DisasterEvent[] = data.features.map((f) => ({
      id: f.id,
      type: "earthquake",
      lat: f.geometry.coordinates[1],
      lng: f.geometry.coordinates[0],
      intensity: f.properties.mag,
      timestamp: new Date(f.properties.time).toISOString(),
      description: f.properties.title,
      source: "USGS",
    }));

    await writeJson("usgs-earthquakes.json", events);
  } catch (e) {
    console.warn("  ⚠ USGS fetch failed:", (e as Error).message);
  }
}
