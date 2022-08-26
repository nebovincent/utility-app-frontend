import React, { useState, useEffect, useContext } from "react";
import { Props } from "types/types";
import classes from "components/Todos/AddTodo.module.css";
import Container from "components/utility/Container";
import { Todo } from "types/types";
import nextConfig from "next.config";
import moment from "moment";
import { useRouter } from "next/router";
import AuthContext from "context/auth-context";
import UtilContext from "context/util-context";
import ProtectedRoutes from "components/utility/ProtectedRoutes";
import { server } from "config/index";

function EditTodo({ todo }: Props) {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const utilCtx = useContext(UtilContext);

  // useEffect to check if user is still authenticated

  // useEffect to check if user is still authenticated

  const [successMsg, setSuccessMsg] = useState("");
  const [failureMsg, setFailureMsg] = useState("");
  const [todoState, setTodoState] = useState({
    id: todo?.id,
    name: todo?.name,
    description: todo?.description,
    date: todo?.date,
  });

  const onEditTodo = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    authCtx.reqLoadingStateHandler();

    const newTodo = {
      id: todoState?.id,
      name: todoState?.name,
      description: todoState?.description,
      date: todoState?.date,
    };

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(`${server}/user/edit-todo`, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: headers,
      credentials: "include",
      // statusCode: 200,
    });
    const res = await response.json();

    const setResStates = (): string => {
      if (res.status === "successful") {
        setSuccessMsg(res.data.message);
        return res.status;
      } else {
        setFailureMsg(res.data.message);
        return res.status;
      }
    };

    const returnedSetResStates = setResStates();
    if (returnedSetResStates === "successful") {
      router.push("/Todos/TodoPage");
    }
    authCtx.reqLoadingStateResetHandler();
  };

  useEffect(() => {
    setSuccessMsg("");
    setFailureMsg("");
  }, [router]);

  return (
    <ProtectedRoutes>
      <Container className={classes.editTodo__main_container}>
        <div className={`${classes.form_style_3} ${classes.form__main_area}`}>
          <h3>Edit Your Todo</h3>
          <form onSubmit={onEditTodo}>
            <fieldset>
              <legend>TODO</legend>
              <label htmlFor="field1">
                <span>
                  Name <span className={classes.required}>*</span>
                </span>
                <input
                  type="text"
                  className={classes.input_field}
                  name="field1"
                  value={todoState?.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTodoState({ ...todoState, name: e.target.value });
                  }}
                />
              </label>
              <label htmlFor="field2">
                <span>
                  Desc <span className="required">*</span>
                </span>
                <input
                  type="text"
                  className={classes.input_field}
                  name="field2"
                  value={todoState?.description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTodoState({ ...todoState, description: e.target.value });
                  }}
                />
              </label>
              <label htmlFor="field3">
                <span>
                  Date <span className={classes.required}> * </span>
                </span>
                <input
                  type="datetime-local"
                  className={classes.input_field}
                  name="field3"
                  value={
                    todoState?.date &&
                    moment
                      .parseZone(todoState?.date)
                      .local()
                      .format("YYYY-MM-DD[T]HH:mm:ss")
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTodoState({
                      ...todoState,
                      date: new Date(e.target.value),
                    });
                  }}
                />
              </label>
              <label>
                <span> </span>
                <input type="submit" />
              </label>
            </fieldset>
          </form>
        </div>
      </Container>
    </ProtectedRoutes>
  );
}

export default EditTodo;
