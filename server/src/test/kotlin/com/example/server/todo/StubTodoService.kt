package com.example.server.todo

class StubTodoService: TodoService {
    var getTodo_return_value: List<String> = emptyList()
    override fun getTodo(): List<String> {
        return getTodo_return_value
    }

    override fun saveTodo(todo: String) {
    }
}
