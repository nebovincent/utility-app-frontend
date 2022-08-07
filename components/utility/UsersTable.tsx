import React, { useEffect, useState, useContext } from "react";
import classes from "components/utility/Table.module.css";
import Container from "components/utility/Container";
import { Props, allUsersType } from "types/types";
import {
  FiEdit,
  FiTrash2,
  FiUserCheck,
  FiUserPlus,
  FiUserX,
} from "react-icons/fi";
import { useRouter } from "next/router";
import moment from "moment";
import AuthContext from "context/auth-context";
import PaginationComponent from "./PaginationComponent";

const UsersTable = ({
  allUsers,
  onDeleteUser,
  onActivateUser,
  onDeactivateUser,
  onMakeUserAdmin,
}: Props) => {
  const authCtx = useContext(AuthContext);
  moment().format();
  const [users, setUsers] = useState(allUsers);
  const router = useRouter();

  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  // trying pagination
  // for paginationComponent
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users?.slice(indexOfFirstItem, indexOfLastItem);
  const numberOfPages = users?.length && users?.length / itemsPerPage;

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
  // trying pagination

  return (
    <>
      <div className={classes.table__wrapper}>
        <table className="table table-striped table-hover table-light rounded-pill">
          <thead>
            <tr>
              <th scope="col" className={classes.table_th_user_table}>
                Name
              </th>
              <th scope="col" className={classes.table_th_user_table}>
                Email
              </th>
              <th scope="col" className={classes.table_th_user_table}>
                DOB
              </th>
              <th scope="col" className={classes.table_th_actions_user_table}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              currentItems?.map((user) => (
                <tr key={user._id}>
                  <td className={classes.user_table_td_text}>{user.name}</td>
                  <td className={classes.user_table_td_text}>{user.email}</td>
                  <td className={classes.user_table_td_text}>
                    {user.dateOfBirth && new Date(user.dateOfBirth).toString()}
                  </td>

                  <td className={classes.actionBtn__main_user_table}>
                    <div className={classes.actionBtn__main}>
                      <div>
                        <button className="btn btn-primary">
                          <FiEdit
                            className={classes.actions__icon}
                            onClick={() => {
                              router.push("/Auth/Admin/edit-user/" + user._id);
                            }}
                          />
                        </button>
                        <button
                          onClick={() => {
                            onDeleteUser?.(user._id);
                          }}
                          className="btn btn-primary"
                        >
                          <FiTrash2 className={classes.actions__icon} />
                        </button>
                        <button
                          onClick={() => {
                            onActivateUser?.(user._id);
                          }}
                          className="btn btn-primary"
                        >
                          <FiUserCheck className={classes.actions__icon} />
                        </button>
                        <button
                          onClick={() => {
                            onDeactivateUser?.(user._id);
                          }}
                          className="btn btn-primary"
                        >
                          <FiUserX className={classes.actions__icon} />
                        </button>
                        <button
                          onClick={() => {
                            onMakeUserAdmin?.(user._id, "admin");
                          }}
                          className="btn btn-primary"
                        >
                          <FiUserPlus className={classes.actions__icon} />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <PaginationComponent
        className={classes.pagination_main}
        itemsPerPage={itemsPerPage}
        totalItems={users?.length || 0}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
        forwardPages={forwardPages}
        numberOfPages={numberOfPages}
      />
    </>
  );
};

export default UsersTable;
