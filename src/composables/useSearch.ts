import { ref } from 'vue'
import { searchBooks } from '../api/searchBooks'
import type { Book } from '../types/book'

// 搜索关键词、提示、结果、请求编号
const keyword = ref('')
const message = ref('')
const books = ref<Book[]>([])
let requestId = 0

export function useSearch() {
     
    async function submit() {
        const text = keyword.value.trim()

        if (text.length === 0) {
            message.value = '关键词为空，请输入 3-20 字书名或者作者'
            return
        }
        if (text.length < 3) {
            message.value = '至少 3 个字'
            return
        }
        if (text.length > 20) {
            message.value = '不超过 20 个字'
            return
        }

        const currentId = ++requestId
        message.value = '正在加载'

        try {
            const list = await searchBooks(text)
            if (currentId !== requestId) return
            books.value = list 
            message.value = list.length === 0 ? '没有结果' : ''
        } catch {
            if (currentId !== requestId) return
            message.value = '请求失败'
        }
    }

    return { keyword, message, books, submit }
}