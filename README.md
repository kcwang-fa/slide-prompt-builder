# NotebookLM 簡報 Prompt 產生器

一個極簡的單頁工具：選風格、選配色、選目標讀者，貼上主題，得到一段可直接丟進 NotebookLM 的 prompt。

## 功能（MVP）

- 8 種簡報風格 × 6 種配色方案 × 5 種目標讀者
- 章節數可調（3–10）
- 即時 prompt 預覽 + 一鍵複製
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
