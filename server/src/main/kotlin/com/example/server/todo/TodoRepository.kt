package com.example.server.todo

import com.example.server.todo.entity.TodoRecord
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TodoRepository: JpaRepository<TodoRecord, String> {
}
