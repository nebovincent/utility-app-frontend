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
import Searchbar from "components/utility/Searchbar";
import { server } from "config/index";

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

    const response = await fetch(`${server}/user/delete-todo`, {
      method: "POST",
      body: JSON.stringify(todoId),
      headers: headers,
      credentials: "include",
      // statusCode: 200,
    });
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

    const response = await fetch(`${server}/user/get-all-todos`, {
      method: "POST",
      body: JSON.stringify(todoData),
      headers: headers,
      credentials: "include",
      // statusCode: 200,
    });
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

    const response = await fetch(`${server}/user/add-todo`, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: headers,
      credentials: "include",
    });
    const res = await response.json();

    if (res.status === "successful") {
      onFetchTodos();
    }
    authCtx.reqLoadingStateResetHandler();
  };

  //search functionality section

  const [searchInput, setSearchInput] = useState("");
  const [searchErrors, setSearchErrors] = useState({});
  const onSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const filteredTodos = allFetchedTodos.filter((todos) =>
      todos.name?.includes(searchInput)
    );
    if (filteredTodos.length === 0) {
      console.log("no match");
    } else {
      setAllFetchedTodos(filteredTodos);
    }
    console.log(filteredTodos);
  };
  const onChangeSearchInput = (e: any) => {
    setSearchInput(e.target.value);
  };
  const resetSearchInput = useCallback(() => {
    setSearchInput("");
    onFetchTodos();
  }, [onFetchTodos]);

  //search functionality section
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
                <div className={classes.search_main_area}>
                  <h5>Search for a todo by name</h5>
                  <Searchbar
                    onSubmit={onSearch}
                    onChange={onChangeSearchInput}
                    value={searchInput}
                    onFocus={resetSearchInput}
                  />
                </div>

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
