# 书单

在浏览器里搜索书，打开详情，把书加入「想读」。搜索使用 Open Library，不需要 key。想读清单存在本机。

## 功能

- 搜索书名或作者，列出书名、作者、出版年。关键词去掉首尾空格后须为 3–20 个字。
- 空关键词、字数不符、正在加载、没有结果、请求失败，都有可见提示。
- 从搜索结果进入 `/books/:id`，查看封面、书名、作者。接口没有的字段留空。
- 刷新详情页后，这一标签页刚打开的书还在。直接打开一个没点过的地址，会提示找不到这本书。
- 把当前这本书加入或移出「想读」。刷新后清单还在。
- 离开搜索页再回来，这一轮关键词和结果还在。整页刷新后，搜索清空，想读清单还在。

## 技术

Vue 3、TypeScript、Vite、Vue Router。状态放在 composable 里。请求在接口模块，想读清单和当前详情的读写在存储模块。

## 本地运行

需要 Node.js 20.19+ 或 22.12+。

```bash
npm install
npm run dev
```

打开终端里的本地地址，一般是 `http://localhost:5173/`。

```bash
npm run build
npm run preview
```

## 数据

- 搜索：`https://openlibrary.org/search.json?q=关键词&limit=20`
- 封面：`https://covers.openlibrary.org/b/id/封面编号-M.jpg`
- 想读清单：`localStorage`，键名 `book-shelf:books`
- 当前详情：`sessionStorage`，键名 `book-shelf:current`。关掉标签页后消失。

## 不做

账号、后端、评分评论、书摘、导入导出、移动端专门适配、UI 组件库。
