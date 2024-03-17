import {Http} from '../../http/NetworkHttp.ts'

export class SpyHttp implements Http{
    get_argument_url?: string = undefined
    get(url: string): Promise<object> {
        this.get_argument_url = url
        return Promise.resolve([])
    }
    post_argument_url?: string = undefined
    post_argument_body?: string = undefined
    post(url: string, body: string): void {
        this.post_argument_url = url
        this.post_argument_body = body
    }

}