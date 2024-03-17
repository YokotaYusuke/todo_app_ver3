import NetworkHttp, {Http} from '../http/NetworkHttp.ts'

export default interface TodoRepository {
    getTodo() : Promise<string[]>
    saveTodo(todo: string): void
}

export class DefaultTodoRepository implements TodoRepository{
    http: Http

    constructor(http: Http = new NetworkHttp()) {
        this.http = http
    }
    async getTodo(): Promise<string[]> {
        return await this.http.get("/api/todos") as string[]
    }
    saveTodo(todo: string): void {
        this.http.post("/api/todos", todo)
    }
}