import { ref } from 'vue'

export function useSearch() {
    const message = ref('')
     
    function submit(raw: string) {
        const keyword = raw.trim()

        if (keyword.length === 0) {
            message.value = '关键词为空，请输入 2-20 字书名或者作者'
            return
        }
        if (keyword.length === 1) {
            message.value = '至少 2 个字'
            return
        }
        if (keyword.length > 20) {
            message.value = '不超过 20 个字'
            return
        }

        message.value = ''
    }

    return { message, submit }
}