# NotebookLM 簡報 Prompt 產生器

一個極簡的單頁工具：選簡報用途、必要時指定讀者背景與視覺設定，貼上主題，得到兩段可貼進 NotebookLM 的 prompt。

## 功能（MVP）

- 簡報用途、條件式讀者背景與自訂輸入
- 章節數可調（1–10）
- 兩段式 prompt 預覽 + 一鍵複製：對話摘要 Prompt、自訂簡報風格說明
- LocalStorage 自動記住上次選擇
- 收藏：可儲存／命名／載入／刪除多組常用組合
- 中／英語介面切換

## 開發

```bash
npm install
npm run dev      # http://localhost:1421
npm run build    # 產出 dist/
```

## 部署

`Dockerfile` + `nginx.conf.template` + `railway.json` 已備好，Railway 連 GitHub 直接部署即可。記得在 service variables 裡加上 `PORT=8080`，並把 Networking 的 target port 也設 8080。

## 技術棧

Vite + React 18 + Tailwind CSS + Lucide Icons。LocalStorage 持久化，無後端。
