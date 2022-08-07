import React, { useEffect, useState } from "react";
import classes from "components/utility/Table.module.css";
import Container from "./Container";
import { fetchedTodos, Props } from "types/types";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/router";

import PaginationComponent from "./PaginationComponent";

const TodosTable = ({ allFetchedTodos, onDeleteTodo }: Props) => {
  const [todos, setTodos] = useState(allFetchedTodos);

  useEffect(() => {
    setTodos(allFetchedTodos);
  }, [allFetchedTodos]);

  const router = useRouter();

  // for paginationComponent
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = todos?.slice(indexOfFirstItem, indexOfLastItem);
  const numberOfPages = todos?.length && todos?.length / itemsPerPage;

  //change page
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < numberOfPages!) {
      setCurrentPage(currentPage + 1);
    }
  };

  const forwardPages = () => {
    setCurrentPage(7);
  };
  //change page

  // for paginationComponent

  return (
    <div className={classes.table__wrapper}>
      <table className="table table-striped table-hover table-light rounded-pill ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((todo) => (
            <tr key={todo._id}>
              <td>{todo.name}</td>
              <td>{todo.description}</td>
              <td>{todo.date && new Date(todo.date).toString()}</td>
              <td>
                <div className={classes.actionBtn__main}>
                  <div>
                    <button>
                      <FiEdit
                        className={classes.actions__icon}
                        onClick={() => {
                          router.push("/Todos/edit-todo/" + todo._id);
                        }}
                      />
                    </button>
                    <button
                      onClick={() => {
                        onDeleteTodo?.(todo._id);
                      }}
                    >
                      <FiTrash2 className={classes.actions__icon} />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationComponent
        className={classes.pagination_main}
        itemsPerPage={itemsPerPage}
        totalItems={todos?.length || 0}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
        forwardPages={forwardPages}
        numberOfPages={numberOfPages}
      />
    </div>
  );
};

export default TodosTable;
