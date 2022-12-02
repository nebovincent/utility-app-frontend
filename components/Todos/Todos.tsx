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
  const [errorStates, setErrorStates] = useState({
    saveTodos: "",
    fetchTodos: "",
    deleteTodo: "",
    randomError: "",
  });
  const [successStates, setSuccessStates] = useState({
    saveTodos: "",
    fetchTodos: "",
    deleteTodo: "",
  });

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
      setSuccessStates({
        saveTodos: "",
        fetchTodos: "",
        deleteTodo: res.data.message,
      });
      setErrorStates({
        saveTodos: "",
        fetchTodos: "",
        deleteTodo: "",
        randomError: "",
      });
      onFetchTodos();
    } else {
      setSuccessStates({
        saveTodos: "",
        fetchTodos: "",
        deleteTodo: "",
      });
      setErrorStates({
        saveTodos: "",
        fetchTodos: "",
        deleteTodo: res.data.message,
        randomError: "",
      });
      if (
        res.data.message === "Not Authorized, please log in" ||
        res.data.message === "Session Expired please login again"
      ) {
        setErrorStates({
          saveTodos: "",
          fetchTodos: "",
          deleteTodo: "",
          randomError: res.data.message,
        });
        setTimeout(() => router.push("/Auth/User/LoginPage"), 5000);
      }
    }
  };

  //fetch all Todos for a user

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
    if (res.status === "successful") {
      setSuccessStates({
        saveTodos: "",
        fetchTodos: "",
        // fetchTodos: res.data.message,
        deleteTodo: "",
      });
      setErrorStates({
        saveTodos: "",
        fetchTodos: "",
        deleteTodo: "",
        randomError: "",
      });
      setAllFetchedTodos(res.data.result);
    } else {
      setSuccessStates({
        saveTodos: "",
        fetchTodos: "",
        deleteTodo: "",
      });
      setErrorStates({
        saveTodos: "",
        fetchTodos: res.data.message,
        deleteTodo: "",
        randomError: "",
      });
      if (
        res.data.message === "Not Authorized, please log in" ||
        res.data.message === "Session Expired please login again"
      ) {
        setErrorStates({
          saveTodos: "",
          fetchTodos: "",
          deleteTodo: "",
          randomError: res.data.message,
        });
        setTimeout(() => router.push("/Auth/User/LoginPage"), 5000);
      }
    }
    authCtx.authLoadingStateResetHandler();
  }, [router, authCtx]);

  //fetch all Todos for a user

  // useEffect to fetch all Todos for a particular user
  useEffect(() => {
    onFetchTodos();
  }, []);
  // useEffect to fetch all Todos for a particular user

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
      setSuccessStates({
        saveTodos: res.data.message,
        fetchTodos: "",
        deleteTodo: "",
      });
      setErrorStates({
        saveTodos: "",
        fetchTodos: "",
        deleteTodo: "",
        randomError: "",
      });
      onFetchTodos();
    } else {
      setSuccessStates({
        saveTodos: "",
        fetchTodos: "",
        deleteTodo: "",
      });
      setErrorStates({
        saveTodos: res.data.message,
        fetchTodos: "",
        deleteTodo: "",
        randomError: "",
      });
      if (
        res.data.message === "Not Authorized, please log in" ||
        res.data.message === "Session Expired please login again"
      ) {
        setErrorStates({
          saveTodos: "",
          fetchTodos: "",
          deleteTodo: "",
          randomError: res.data.message,
        });
        setTimeout(() => router.push("/Auth/User/LoginPage"), 5000);
      }
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
    if (filteredTodos?.length === 0) {
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
            {allFetchedTodos?.length > 0 && (
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
                {successStates.deleteTodo && (
                  <p className={classes.successMsg}>
                    {successStates.deleteTodo}
                  </p>
                )}
                {successStates.saveTodos && (
                  <p className={classes.successMsg}>
                    {successStates.saveTodos}
                  </p>
                )}
                {errorStates.deleteTodo && (
                  <p className={classes.errorMsg}>{errorStates.deleteTodo}</p>
                )}
                {errorStates.deleteTodo && (
                  <p className={classes.errorMsg}>{errorStates.deleteTodo}</p>
                )}
                {errorStates.deleteTodo && (
                  <p className={classes.errorMsg}>{errorStates.deleteTodo}</p>
                )}
                {errorStates.randomError && (
                  <p className={classes.errorMsg}>{errorStates.randomError}</p>
                )}

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
