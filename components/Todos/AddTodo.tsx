import Container from "components/utility/Container";
import React, { useContext, useState, useEffect } from "react";
import classes from "components/Todos/AddTodo.module.css";
import Table from "components/utility/UsersTable";
import { Props, Todo } from "types/types";
import nextConfig from "next.config";
import AuthContext from "context/auth-context";
import UtilContext from "context/util-context";
import { useRouter } from "next/router";
import ProtectedRoutes from "components/utility/ProtectedRoutes";

const AddTodo = ({ onSaveTodo }: Props) => {
  const authCtx = useContext(AuthContext);
  const utilCtx = useContext(UtilContext);
  const router = useRouter();

  // useEffect to check if user is still authenticated

  // useEffect to check if user is still authenticated

  const [todo, setTodo] = useState<Todo>({
    user_id: authCtx.authUserId,
    name: "",
    description: "",
    date: new Date(),
  });

  const newTodo: Todo = {
    ...todo,
  };

  const saveTodos = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    onSaveTodo?.(newTodo);
  };

  return (
    <ProtectedRoutes>
      <div className={`${classes.form_style_3} ${classes.form__main_area}`}>
        <h3>Add New Todo</h3>
        <form onSubmit={saveTodos}>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTodo({ ...todo, name: e.target.value });
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTodo({ ...todo, description: e.target.value });
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTodo({ ...todo, date: new Date(e.target.value) });
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
    </ProtectedRoutes>
  );
};

export default AddTodo;
