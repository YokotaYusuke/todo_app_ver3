export interface Http {
    get(url: string): Promise<object>
    post(url: string, body: string): void
}

export default class NetworkHttp implements Http {
    async get(url: string): Promise<object> {
        const response = await fetch(url)
        return await response.json()
    }

    async post(url: string, body: string): Promise<void> {
        const data = {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            body: body
        }
        await fetch(url, data)
    }
}