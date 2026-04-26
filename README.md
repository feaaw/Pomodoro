# Pomodoro Timer
 
> ポモドーロ・テクニックに基づいたシンプルなタイマーアプリ。PWA対応でスマートフォンにインストールして使える。
 
🔗 **[デモを見る](https://feaaw.github.io/Pomodoro)** 
 
---
 
## 機能
 
- 作業時間（25分）と休憩時間（5分）の自動切り替え
- セッション数のカウント
- タイマー終了時の通知
- PWA対応 — スマートフォン・PCのホーム画面に追加してオフラインでも使用可能

---

## 技術スタック
 
| ファイル | 役割 |
|---|---|
| `index.html` | UIのマークアップ |
| `style.css` | スタイリング |
| `script.js` | タイマーロジック・UI操作 |
| `manifest.json` | PWAのアイコン・テーマカラー等 |
| `sw.js` | Service Worker — オフラインキャッシュ制御 |
 
**使用技術：** HTML / CSS / JavaScript / Web App Manifest / Service Worker API
