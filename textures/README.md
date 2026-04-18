# textures/

3D 地球儀用の高解像度テクスチャ。main repo (`world-lens`) が jsdelivr 経由でロードする LOD 素材。

| ファイル | サイズ | 出典 | 用途 |
|---|---|---|---|
| `earth-day-8k.jpg` | 8192×4096, 3.3 MB | NASA Blue Marble 2004 (21600×10800 から lanczos3 縮小 + mozjpeg q85) | 昼面ベース (`dayMap`) |
| `earth-night-8k.jpg` | 8192×4096, 1.3 MB | NASA Earth at Night 2012 VIIRS (13500×6750 から lanczos3 縮小 + mozjpeg q82) | 夜面ネオン (`nightMap`) |

## 再生成

world-lens 側の `scripts/prepare-textures.mjs` を実行すれば、NASA から元画像を取得 → sharp で縮小 → ここに書き出される。

```bash
cd ../world-lens
node scripts/prepare-textures.mjs
```

## 制約

- ライセンス: NASA 画像は public domain 相当。帰属表記のみ推奨
- 低解像度 (2k) は `three-globe/example/img/*` をそのまま使用、カメラ距離で切り替える
- サイズ上限: jsdelivr は 1 ファイル最大 20 MB。現行 8k は余裕
- WebGL 最大テクスチャサイズ: 8192 は現代 GPU でほぼ対応、より大きいと一部端末で失敗する
