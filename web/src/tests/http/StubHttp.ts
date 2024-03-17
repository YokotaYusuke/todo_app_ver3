import {Http} from '../../http/NetworkHttp.ts'

export class StubHttp implements Http{
    post(url: string, body: string): void {
    }
    get_return_value: Promise<object> = Promise.resolve([])
    get(url: string): Promise<object> {
        return this.get_return_value
    }
}