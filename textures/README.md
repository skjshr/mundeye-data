# textures/

3D 地球儀用の高解像度テクスチャ。main repo (`world-lens`) が jsdelivr 経由でロードする LOD 素材。

| ファイル | サイズ | 出典 | 用途 |
|---|---|---|---|
| `earth-day-5400.jpg` | 5400x2700 | NASA Blue Marble (2004-12) | 昼面ベース (`dayMap`) |
| `earth-night-3600.jpg` | 3600x1800 | NASA Earth at Night (2012 VIIRS) | 夜面ネオン (`nightMap`) |

- ライセンス: NASA 画像は public domain 相当。帰属表記のみ推奨
- 低解像度 (2k) は `three-globe/example/img/*` をそのまま使用。カメラ距離で切り替える
- サイズ制限: jsdelivr は 1 ファイル最大 20 MB まで。5400x2700 JPG で 2.5 MB、余裕あり
