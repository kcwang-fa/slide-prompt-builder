# 學習指南：用這個專案做為 CS50 之後的下一站

> **這份指南是寫給誰看的？**
> 你剛讀完 CS50（不管是 CS50x 通識版、CS50W Web Programming 還是 CS50P Python 版），會 Python／C／HTML／CSS、用過 SQL、寫過 Flask 小作業。現在想學「**現代前端是怎麼蓋起來的**」，但 React 官方教學翻幾頁就投降。這份指南會用這個約 3000 行的單頁專案當教材，帶你過一遍核心觀念、推薦閱讀順序、和練習題。

---

## 0. 為什麼適合用這個專案學？

| 條件 | 為什麼重要 |
|---|---|
| **小而完整** | 約 3000 行 `src/` 程式碼、30 多個檔案；比 todo list 真實，但還沒有大到需要框架知識才能讀。 |
| **真實但簡單** | 它真的可以用，不是 todo list。但沒有後端、沒有 router、沒有 TypeScript、沒有 Redux／Zustand 這類狀態管理函式庫。專心學 React 本身。 |
| **完整生命週期** | 從本機開發、Tailwind 排版、LocalStorage 持久化，到 Docker 化、Railway 部署，全都涵蓋。 |
| **看得到結果** | 你選個風格、按複製、貼到 NotebookLM——**一條完整的「使用者旅程」**——比學課堂上的抽象 React 例子好玩。 |

---

## 1. 你已經會什麼、還缺什麼

### CS50 之後你已經會的（不會在這裡重教）

- 變數、條件、迴圈、函式、recursion
- 資料結構：list / dict（在 JS 叫 array / object）
- 物件導向基礎、簡單的演算法
- HTML 標籤、CSS 選擇器
- HTTP request / response、status codes
- SQL 查詢
- git、命令列
- 一點點 JavaScript（如果有上 Web Track）

### 這個專案會逼你學到的

| 主題 | 在哪個檔案看得到 |
|---|---|
| **ES Modules**（`import` / `export`） | 每個 `.js` / `.jsx` 檔最上面 |
| **箭頭函式、destructuring、spread** | 整個專案 |
| **React 的 declarative UI** | `App.jsx` |
| **JSX** | 所有 `.jsx` 檔 |
| **Hooks**：`useState`、`useEffect`、`useMemo` | `App.jsx`、`PromptOutput.jsx` |
| **自訂 Hook** | `hooks/useLocalStorage.js`、`hooks/useSavedPrompts.js` |
| **元件組合**（props、children） | `App.jsx` 把小元件串起來 |
| **Tailwind CSS** | 每個 `.jsx` 的 `className` |
| **Vite**（取代 webpack） | `vite.config.js`、`package.json` 的 scripts |
| **LocalStorage API** | `useLocalStorage.js` |

不會碰到的（先放著）：TypeScript、Redux、React Router、SSR／Next.js、Server Components、CSS-in-JS、單元測試、CI/CD。每一項都該學，但**一次學一個**。

---

## 2. 把它跑起來

### 環境

需要 **Node.js 18 以上**。Mac 用 Homebrew：

```bash
brew install node
node --version   # 應該 ≥ 18
```

### 開發

```bash
git clone https://github.com/kcwang-fa/slide-prompt-builder.git
cd slide-prompt-builder
npm install     # 大約 30 秒
npm run dev     # 開啟 http://localhost:1421
```

打開瀏覽器——你會看到一個簡報 prompt 產生器。

### 「`npm install` 到底在裝什麼？」

`package.json` 的 `dependencies` 列了三個：`react`、`react-dom`、`lucide-react`（圖示）。`devDependencies` 列了 build 工具：`vite`、`tailwindcss`、`postcss`、`autoprefixer` 等。

`npm install` 會：

1. 讀 `package.json` 的依賴清單
2. 從 npm registry（≈ Python 的 PyPI）下載每個套件
3. 把它們放進 `node_modules/` 資料夾（因此 `.gitignore` 會排除這個——它太大、可重建）
4. 寫一份 `package-lock.json` 鎖住每個套件的精確版本，保證下次別人 install 拿到一模一樣的東西

### 試著改一行

打開 `src/App.jsx`，找到：

```jsx
{language === 'cn' ? '專業報告 Prompt 工作台' : 'Professional Report Prompt Workspace'}
```

把中文標題暫時改成「PPT 神器」，存檔。**不用 reload 瀏覽器**——你會看到頁面自動更新。這叫 **hot module replacement (HMR)**，是現代前端工具鏈最直觀的差別之一。

---

## 3. JavaScript 跟 Python 不一樣的地方

CS50 用 Python 居多，這裡是你最會卡住的轉換。

### 資料結構對照

| Python | JavaScript |
|---|---|
| `list` `[1, 2, 3]` | `Array` `[1, 2, 3]` |
| `dict` `{"a": 1}` | `Object` `{a: 1}`（key 不用加引號） |
| `tuple` | 沒有（用 array 代替） |
| `None` | `null`（人為的空）／`undefined`（系統的空，比較常見） |
| `True` / `False` | `true` / `false` |
| `len(x)` | `x.length` |
| `print(x)` | `console.log(x)` |

### 函式：三種寫法

```js
// 1. 傳統 function 宣告（function 提升、有 this）
function add(a, b) { return a + b }

// 2. function expression（指派給變數）
const add = function (a, b) { return a + b }

// 3. 箭頭函式（這專案最常用）
const add = (a, b) => a + b
const square = x => x * x         // 一個參數可省括號
const greet = name => {
  console.log(`Hi ${name}`)        // 多行要 {} 與 return
}
```

### 解構（destructuring）

從物件或陣列取值的捷徑：

```js
// 物件
const user = { name: 'Alice', age: 30 }
const { name, age } = user        // 等於 const name = user.name; const age = user.age

// 陣列
const [first, second] = [10, 20]

// React Hook 標準寫法
const [count, setCount] = useState(0)
```

### Spread 與 rest 運算子（`...`）

複製、合併物件／陣列：

```js
const a = [1, 2]
const b = [...a, 3, 4]              // [1, 2, 3, 4]

const user = { name: 'Alice' }
const updated = { ...user, age: 30 }  // { name: 'Alice', age: 30 }

// 這個專案裡常見的「更新一個欄位」寫法：
setSelections({ ...selections, slide_style: 'minimal' })
//          ^ 把舊的全部複製，再蓋掉一個
```

### 模版字串

```js
const name = 'Vickie'
const greeting = `Hi ${name}, age ${age}`   // 用反引號 `，不是單／雙引號
```

### 高階函式：`.map`、`.filter`、`.reduce`

對應 Python 的 list comprehension：

```python
# Python
squared = [x*x for x in nums if x > 0]
```

```js
// JS
const squared = nums.filter(x => x > 0).map(x => x * x)
```

這個專案用 `.map` 把資料轉成一堆 React 元件——**滾瓜爛熟之前先別往下讀**。

---

## 4. React 心智模型：先聽我說一段話

CS50 教 vanilla JavaScript 時是這樣寫的：

```js
document.querySelector('#count').textContent = count + 1
```

**直接抓 DOM 元素、直接改它**。這在 React 是不對的（雖然你還是可以這樣做）。

React 的核心宣言是：

> **UI = f(state)**
> 介面只是當下狀態的一個函式。你只負責更新狀態，UI 會自動同步。

意思是：

- 你不再說「找到 #count 元素，把它的 textContent 設成 5」
- 你說「目前的 count 是 5，請畫面長成這樣：`<span>{count}</span>`」
- 然後 React 比較前後狀態，自己決定 DOM 哪些地方要動

實務上：

```jsx
function Counter() {
  const [count, setCount] = useState(0)   // 「count 從 0 開始」
  return (
    <button onClick={() => setCount(count + 1)}>
      點過 {count} 次
    </button>
  )
}
```

你只寫「目前 count 是多少、按下去會變成多少」。**畫面更新完全是 React 在管的**。這個轉換很反直覺，但是建立起來之後一切都通了。

### Component（元件）= Function

React 的「元件」就是一個首字母大寫的函式，回傳 JSX：

```jsx
function Greeting({ name }) {        // props 用解構接
  return <h1>Hi {name}</h1>
}

// 用法
<Greeting name="Vickie" />
```

這個專案的 `<VariableSelect />`、`<TopicInput />`、`<PromptOutput />` 都是這樣的函式。

### JSX 不是 HTML（雖然長得很像）

```jsx
<div className="flex gap-2" onClick={handleClick}>
  Hello {name}
</div>
```

差異：
- `class` → `className`（因為 `class` 是 JS 保留字）
- `onclick` → `onClick`（駝峰式）
- `{}` 裡面是 **JS 表達式**——可以放變數、運算、函式呼叫
- 屬性值若是字串就用引號，若是表達式就用 `{}`

---

## 5. Hooks 三件套

### `useState` — 會觸發畫面更新的變數

```jsx
const [topic, setTopic] = useState('')
```

意思：「`topic` 是一個 state，初始值空字串。要改它請呼叫 `setTopic('新值')`，改完 React 會自動重畫用到 `topic` 的所有元件。」

**不要直接 `topic = '新值'`**——那樣 React 不知道要更新。

### `useMemo` — 快取昂貴計算

```jsx
const summaryPrompt = useMemo(() => {
  return render(template, values)
}, [language, selections, topic, normalizedSectionCount])
```

意思：「只有當 `[]` 裡面的依賴變了，才重新跑這個函式。否則用上次的結果。」

對小專案來說 `useMemo` 通常不必要。本專案用它來組出 NotebookLM 的兩段 prompt：第一段摘要 prompt 會看 `topic`、`selections`、`auditChecklist` 和 `normalizedSectionCount`；第二段風格 prompt 會看 `activeVisualMode`、`simpleVisualBrief` / `visualBrief` 和同一個章節數。這也是練習「依賴陣列必須列出所有用到的 state」的好地方。

### `useEffect` — 副作用（與外界互動）

```jsx
useEffect(() => {
  localStorage.setItem(key, JSON.stringify(value))
}, [key, value])
```

意思：「state 改了之後做點 React 控制範圍外的事——譬如寫 LocalStorage、發 fetch、訂閱 WebSocket。」

「副作用」聽起來很玄，意思就是「不是純粹回傳 JSX 的那些事」。

### 自訂 Hook：把上面那些包成可重用的工具

打開 `src/hooks/useLocalStorage.js`：

```js
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored !== null ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
```

這就是一個自訂 hook：用 `useState` + `useEffect` 組成一個「會自動寫進 LocalStorage 的 state」。介面跟 `useState` 完全一樣，所以呼叫端只需要：

```jsx
const [topic, setTopic] = useLocalStorage('spb_topic_v1', '')
```

換了一個函式名，這個 state 就會自動持久化。**這就是 React 強大的根本原因**：邏輯可以包起來重用。

---

## 6. 推薦閱讀順序：走讀 src/

不要從 `App.jsx` 開始，太多東西。**從最小的元件往大爬**：

1. **`src/main.jsx`** （10 行）
   進入點。看懂 `ReactDOM.createRoot().render()` 在做什麼。

2. **`src/data/banks.js`** （純資料）
   看資料的形狀。`BANKS` 是一個 object，每個 key（譬如 `slide_style`）對應一組「label + options」。沒有任何 React。

3. **`src/lib/render.js`** （5 行）
   一個純函式：吃一個範本字串和一個 values 物件，回傳替換完的字串。練習正規表達式。

4. **`src/components/VariableSelect.jsx`**
   最小的有意義元件之一。接收 `bankKey`、`value`、`onChange` 等 props，渲染卡片式選項與自訂輸入。看「props 怎麼傳進來、事件怎麼往外送」。

5. **`src/components/TopicInput.jsx`** + **`SectionCountSlider.jsx`**
   結構類似的小元件。`SectionCountSlider` 特別值得看：它是一個 controlled component，用 `value` 顯示目前主體章節數，用 `onChange` 把 slider 變更送回 `App.jsx`，並即時計算估計投影片張數。

6. **`src/hooks/useLocalStorage.js`**
   第一個自訂 hook。看完上面解釋之後再讀程式碼會很快。

7. **`src/hooks/useSavedPrompts.js`**
   一個「hook 用 hook」的例子。對照 `App.jsx` 怎麼用它。

8. **`src/components/SimpleBriefInput.jsx`**
   簡化版視覺設定。看它怎麼根據 `slideStyle` 排序色板與字型，並把使用者選擇回傳給上層。

9. **`src/components/PromptOutput.jsx`**
   有 local state（`copied`）、有 async（`navigator.clipboard.writeText`）、有 setTimeout。比前面的元件複雜一階。

10. **`src/components/SavedPromptsPanel.jsx`**
   最複雜的元件之一。有列表渲染、條件渲染（編輯模式 vs 顯示模式）、多個 callback。看懂它就 OK 了。

11. **`src/components/CustomBriefInput.jsx`**
    最大的元件。看「狀態提升（lifting state up）」是怎麼做的——它自己沒有 `useState`，所有狀態都從 `App.jsx` 傳下來。它和 `SimpleBriefInput` 是同一個視覺設定目標的兩種 UI。

12. **`src/App.jsx`**
    所有東西的組合點。重點看三件事：state 集中管理、`useMemo` 生成兩段 prompt、`handleSave` / `handleLoad` 如何維持舊資料相容。

13. **`Dockerfile` + `nginx.conf.template` + `railway.json`**
    跟 React 無關但跟「怎麼讓網站上線」有關。CS50 沒教的部分。

---

## 7. 練習題（由淺入深）

### 簡單

1. 在 `src/data/banks.js` 的 `slide_audience` 加一個新選項：「投資人 — 強調市場規模與商業模式」。存檔，重新整理瀏覽器，看下拉選單有沒有出現。
2. 改 `src/App.jsx` 的 footer 文字，加上你的名字（「Made by 你的名字」）。
3. 在 `src/data/palettes.js` 加一個新色板「日系雜誌」（自己挑三色）。存檔，去「視覺設定」看色板列。

### 中等

4. **不用任何 hook**，純粹用 props，寫一個元件 `<CharCounter text={topic} />` 顯示主題的字數，放在 `<TopicInput>` 下面。
5. 加一個按鈕「重設所有選項」，按下去後所有 state 回到預設值（至少包含 `topic`、`selections`、`sectionCount`、`visualMode`、`simpleVisualBrief`、`visualBrief`、`auditChecklist`）。
6. 在 `<SavedPromptsPanel>` 加一個「依時間排序／依字母排序」切換。

### 進階

7. **歷史紀錄**：每次 prompt 變動就存進 LocalStorage，最多保留 10 筆，可以「undo」回到上一份。提示：用 `useEffect` 監聽 `summaryPrompt` 和 `stylePrompt`，再用一個 ring buffer。
8. **匯出 JSON**：在收藏面板加一個「匯出全部」按鈕，把所有 saved prompts 下載成一個 `.json` 檔。提示：`Blob` + `URL.createObjectURL` + 一個隱藏的 `<a download>`。
9. **匯入 JSON**：對應上一題。`<input type="file">` + `FileReader`。

### 挑戰

10. **補完第二個輸出目標**：目前輸出目標已有 NotebookLM 與 Gemma 的位置，但 Gemma 還是建置中。請設計 Gemma 專用模板、接上 `OutputTargetPanel`，並想清楚 saved prompt 是否需要記住不同平台的設定。**這題會逼你做架構決策**——是這個專案最值得的一題。

---

## 8. 下一站學什麼

按推薦順序：

1. **React 官方文件 react.dev 的「Learn」分頁**
   這是地球上最好的 React 教學。讀完「Describing the UI」與「Adding Interactivity」兩節（約 4 小時）就贏過 80% 的初學者。

2. **TypeScript**
   把這個專案轉成 TS 是個極好的練習。先讀官方 5 分鐘 handbook，再用 `// @ts-check` 註解逐檔 opt-in。

3. **React Router**
   多頁網站。練習：把這個專案加一個「設定」分頁（譬如選預設語言、清除所有資料）。

4. **後端整合**
   有了前端，下一步學「怎麼跟後端講話」。建議路徑：Hono（輕量框架）→ Cloudflare Workers（免費、簡單）→ 練習做一個「分享我的收藏 prompt」短連結後端。

5. **Tailwind 文件**
   你已經在用了，但官方文件有很多你還沒看到的工具類。

6. **看別人的程式碼**
   推薦：[shadcn/ui](https://ui.shadcn.com)（極好的 React 元件設計範例）、[radix-ui](https://www.radix-ui.com)（無樣式的元件原始實作）。

---

## 9. 卡住的時候

- **JS 不熟**：[javascript.info](https://javascript.info) 是免費的進階教材，比 MDN 易讀。
- **React 觀念**：問 ChatGPT／Claude，貼程式碼問「這段 useEffect 為什麼會無窮迴圈」之類的具體問題。LLM 在解釋 React 卡點上特別強。
- **CSS／Tailwind**：[Tailwind 官方 playground](https://play.tailwindcss.com) 隨手實驗。

---

最後一句話：**寫程式不是讀懂的，是改壞再修好的**。挑一題練習、把專案跑起來、把它弄壞、再修好。看書／讀程式碼／看影片永遠抵不上自己 debug 兩小時。

加油，*推眼鏡* 看到你寫出來的東西回來分享。
