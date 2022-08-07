import React, { useContext } from "react";
import EditTodo from "components/Todos/EditTodo";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import * as mongoose from "mongoose";
import { Props } from "types/types";
import nextConfig from "next.config";
import AuthContext from "context/auth-context";
import useFetchTodos from "hooks/useFetchTodos";

function EditTodoPage({ todo }: Props) {
  const router = useRouter();
  const { todoId } = router.query;

  return (
    <div>
      <EditTodo todo={todo} />
    </div>
  );
}

export async function getStaticPaths(context: any) {
  // fetching all todos

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  };

  const response = await fetch(
    `${nextConfig.env?.backend_url}/user/get-todo-collection`,
    {
      method: "GET",
      headers: headers,
      credentials: "include",
      // statusCode: 200,
    }
  );
  const res = await response.json();

  const todos = await res.data.result;

  return {
    fallback: "blocking",
    paths: todos.map((todo: any) => ({
      params: { todoId: todo._id.toString() },
    })),
  };
}

export async function getStaticProps(context: any) {
  // fetching one todo

  const todoId = context.params.todoId;

  const todo_id = {
    todoId: todoId,
  };

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  };

  const response = await fetch(
    `${nextConfig.env?.backend_url}/user/get-one-todo`,
    {
      method: "POST",
      body: JSON.stringify(todo_id),
      headers: headers,
      credentials: "include",
      // statusCode: 200,
    }
  );

  const res = await response.json();

  const todo = await res.data.result;

  return {
    props: {
      todo: {
        id: todo?._id.toString(),
        name: todo?.name,
        description: todo?.description,
        date: todo?.date,
      },
    },
    revalidate: 1,
  };
}

export default EditTodoPage;