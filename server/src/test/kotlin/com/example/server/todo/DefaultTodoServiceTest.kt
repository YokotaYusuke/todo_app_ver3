package com.example.server.todo

import com.example.server.todo.entity.TodoRecord
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest

@DataJpaTest
class DefaultTodoServiceTest {
    @Autowired
    private lateinit var todoRepository: TodoRepository

    private lateinit var todoService: TodoService

    @Nested
    inner class GetTodo {
        @Test
        fun `returns all todos that repository returns`() {
            todoRepository.saveAll(listOf(
                    TodoRecord(todo = "todo1"),
                    TodoRecord(todo = "todo2")
            ))
            todoService = DefaultTodoService(todoRepository)


            val todos = todoService.getTodo()


            assertEquals(2, todos.count())
            assertEquals("todo1", todos.first())
            assertEquals("todo2", todos.last())
        }

        @Test
        fun `saves received todo in the h2 database`() {
            todoService = DefaultTodoService(todoRepository)


            todoService.saveTodo("todo1")


            assertEquals(1, todoRepository.count())
            assertEquals("todo1", todoRepository.findAll().first().todo)
        }
    }
}