package com.example.server.todo

import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup

@SpringBootTest
@AutoConfigureMockMvc
class TodoControllerTest {
    private lateinit var spyTodoService: SpyTodoService
    private lateinit var stubTodoService: StubTodoService

    @Nested
    inner class Get {
        @Test
        fun `correctly call getTodo on TodoService`() {
            spyTodoService = SpyTodoService()


            val todoController = TodoController(spyTodoService)
            val result = standaloneSetup(todoController)
                    .build()
                    .perform(get("/api/todos"))


            result.andExpect(status().isOk)
            assertTrue(spyTodoService.getTodo_wasCalled)
        }

        @Test
        fun `returns todos when call by getTodo of TodoService`() {
            stubTodoService = StubTodoService()
            stubTodoService.getTodo_return_value = listOf(
                    "todo1",
                    "todo2",
            )


            val todoController = TodoController(stubTodoService)
            val result = standaloneSetup(todoController)
                    .build()
                    .perform(get("/api/todos"))


            result
                    .andExpect(jsonPath("$[0]", equalTo("todo1")))
                    .andExpect(jsonPath("$[1]", equalTo("todo2")))
        }
    }

    @Nested
    inner class Post {
        @Test
        fun `correctly call saveTodo on SpyTodoService`() {
            spyTodoService = SpyTodoService()


            val todoController = TodoController(spyTodoService)
            val result = standaloneSetup(todoController)
                    .build()
                    .perform(
                            post("/api/todos")
                                    .contentType(MediaType.TEXT_PLAIN)
                                    .content("todo1")
                    )


            result.andExpect(status().isCreated)
            assertTrue(spyTodoService.saveTodo_wasCalled)
            assertEquals("todo1", spyTodoService.saveTodo_argument_todo)
        }
    }
}