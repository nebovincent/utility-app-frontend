import React, { useContext, useEffect, useState, useCallback } from "react";
import AddTodo from "./AddTodo";
import Container from "components/utility/Container";
import classes from "components/Todos/Todo.module.css";
import UtilContext from "context/util-context";
import PageLoader from "components/utility/PageLoader";
import { Todo, Props, fetchedTodos } from "types/types";
import TodosTable from "components/utility/TodosTable";
import nextConfig from "next.config";
import AuthContext from "context/auth-context";
import { useRouter } from "next/router";
import ProtectedRoutes from "components/utility/ProtectedRoutes";

const Todos = (props: Props) => {
  const utilCtx = useContext(UtilContext);
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const [allFetchedTodos, setAllFetchedTodos] = useState<fetchedTodos[]>([]);

  const onDeleteTodo = async (e: any) => {
    const todoId = {
      id: e,
    };
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(
      `${nextConfig.env?.backend_url}/user/delete-todo`,
      {
        method: "POST",
        body: JSON.stringify(todoId),
        headers: headers,
        credentials: "include",
        // statusCode: 200,
      }
    );
    const res = await response.json();

    if (res.status === "successful") {
      onFetchTodos();
    }
  };

  //fetch all notes for a user

  const onFetchTodos = useCallback(async () => {
    const todoData = { userId: authCtx.authUserId };

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(
      `${nextConfig.env?.backend_url}/user/get-all-todos`,
      {
        method: "POST",
        body: JSON.stringify(todoData),
        headers: headers,
        credentials: "include",
        // statusCode: 200,
      }
    );
    const res = await response.json();
    setAllFetchedTodos(res.data.result);
  }, [authCtx.authUserId]);

  //fetch all notes for a user

  // useEffect to fetch all notes for a particular user
  useEffect(() => {
    onFetchTodos();
  }, [onFetchTodos]);
  // useEffect to fetch all notes for a particular user

  const onSaveTodo = async (newTodo: Todo) => {
    authCtx.reqLoadingStateHandler();
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(
      `${nextConfig.env?.backend_url}/user/add-todo`,
      {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: headers,
        credentials: "include",
      }
    );
    const res = await response.json();

    if (res.status === "successful") {
      onFetchTodos();
    }
    authCtx.reqLoadingStateResetHandler();
  };

  return (
    <>
      {authCtx.reqLoadingState ? (
        <PageLoader />
      ) : (
        <ProtectedRoutes>
          <Container className={classes.todo__main_container}>
            <AddTodo
              className={classes.addTodo__main}
              onSaveTodo={onSaveTodo}
            />
            {allFetchedTodos.length > 0 && (
              <div className={classes.table__container}>
                <h3>List of Todos</h3>
                {/* <h5>Click on a todo to view full information</h5> */}

                <TodosTable
                  allFetchedTodos={allFetchedTodos}
                  onDeleteTodo={onDeleteTodo}
                />
              </div>
            )}
          </Container>
        </ProtectedRoutes>
      )}
    </>
  );
};

export default Todos;
