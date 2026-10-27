# 书单 技术决策（v1）

## 技术栈

Vue 3 + TypeScript + Vite + Vue Router。

状态放在 composable，不用 Pinia。样式用组件里的 scoped CSS。

## 状态放哪里

Composable 是以 `use` 开头的函数，负责会变的数据和修改它们的动作。

| 数据 | 放在 |
| --- | --- |
| 关键词校验、搜索结果、四种搜索状态、本次搜索编号、发起搜索 | `useSearch()`，数据放在模块顶层 |
| 刚点开的那一条 | `useCurrentBook()`，数据放在模块顶层 |
| 想读清单 | `useWant()` |

搜索页调用 `useSearch()` 和 `useCurrentBook()`。详情页调用 `useCurrentBook()` 和 `useWant()`。想读页调用 `useWant()`。

`useWant()` 加载时从存储模块读取，加入或移出时写回，并判断某本书是否已在清单里。

## 路由

使用 HTML5 history，地址里没有 `#`。

- `/`：搜索页
- `/books/:id`：详情页
- `/want`：想读页

PRD 有这三个地址。刷新、复制链接、前进后退都靠地址找到页面。

## 搜索

关键词是否合法，在 `useSearch()` 发请求前判断。接口模块只发送已经合法的关键词。

每次搜索有一个编号，返回时编号对不上就丢弃。这样只采用最后一次请求的结果。

## 详情

刚点开的那本书放在`useCurrentBook()`的模块顶层，并用`sessionStorage`记住这一本。刷新后从`sessionStorage`读回。不写入`localStorage`。本标签页没点开过的地址对不上，显示找不到这本书。

点击搜索结果时写入 `useCurrentBook()`，再进入 `/books/:id`。详情页用路由里的 id 和内存里的 id 比较，对不上就显示找不到这本书。

## 存储

想读清单放在 localStorage。键名是 `book-shelf:books`。

页面不调用 `localStorage`。读写只放在存储模块，由 `useWant()` 调用。

## 失败

接口模块遇到下面三种情况，只向上报告失败：

- 网络异常
- HTTP 状态不是成功
- 返回内容不是预期的 JSON

`useSearch()` 把状态改成请求失败，页面显示对应提示。

## 分层

```
搜索页（useSearch / useCurrentBook）
详情页（useCurrentBook / useWant）
想读页（useWant）
    → 接口模块（搜索）
    → 存储模块（想读清单）
```

页面只调用 composable。
