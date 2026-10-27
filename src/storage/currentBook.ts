import type { Book } from '../types/book'

const STORAGE_KEY = 'book-shelf:current'

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

export function loadCurrent(): Book | null {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw === null) return null

    try {
        return toBook(JSON.parse(raw))
    } catch {
        return null
    }
}

export function saveCurrent(book: Book) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(book))
}