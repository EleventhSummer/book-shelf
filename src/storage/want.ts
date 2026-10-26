import type { Book } from '../types/book'

const STORAGE_KEY = 'book-shelf:books'

// 将本地记录收成 Book
function toBook(value: unknown): Book | null {
    if (typeof value !== 'object' || value === null) return null
    const item = value as Record<string, unknown>
    if (typeof item.id !== 'string' || item.id === '') return null

    const authors = Array.isArray(item.authors)
        ? item.authors.filter((author): author is string => typeof author === 'string')
        : []

    return {
        id: item.id,
        title: typeof item.title === 'string' ? item.title : '',
        authors,
        year: typeof item.year === 'number' ? item.year : null,
        coverId: typeof item.coverId === 'number' ? item.coverId : null,
    }
}

// 按键取出文本
export function loadWant(): Book[] {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return []

    try {
        const data: unknown = JSON.parse(raw)
        if (!Array.isArray(data)) return []
        return data.flatMap((item) => {
            const book = toBook(item)
            return book ? [book] : []
        })
    } catch {
        return []
    }
}

// 把数据写成 JSON 文本再存回键
export function saveWant(books: Book[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}