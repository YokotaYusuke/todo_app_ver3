package com.example.server.todo.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.UUID

@Entity
@Table(name = "todos")
data class TodoRecord(
        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        val id: UUID = UUID.randomUUID(),

        val todo: String,
)
