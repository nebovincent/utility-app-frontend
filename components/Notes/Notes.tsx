import React, { useContext, useEffect, useCallback, useState } from "react";
import classes from "components/Notes/Notes.module.css";
import AddNotes from "components/Notes/AddNotes";
import Container from "components/utility/Container";
import { FiTrash2, FiEdit } from "react-icons/fi";
import PageLoader from "components/utility/PageLoader";
import UtilContext from "context/util-context";
import { Note, fetchedNotes } from "types/types";
import nextConfig from "next.config";
import AuthContext from "context/auth-context";
import { useRouter } from "next/router";
import ProtectedRoutes from "components/utility/ProtectedRoutes";
import PaginationComponent from "components/utility/PaginationComponent";
import { server } from "config/index";

const Notes = () => {
  const router = useRouter();
  const utilCtx = useContext(UtilContext);
  const authCtx = useContext(AuthContext);
  const [errorStates, setErrorStates] = useState({
    saveNotes: "",
    fetchNotes: "",
    deleteNote: "",
  });
  const [successStates, setSuccessStates] = useState({
    saveNotes: "",
    fetchNotes: "",
    deleteNote: "",
  });

  // useEffect to check if user is still authenticated

  // useEffect to check if user is still authenticated

  const [allFetchedNotes, setAllFetchedNotes] = useState<fetchedNotes[]>([]);

  //fetch all notes for a user

  const onDeleteNote = async (e: any) => {
    const noteId = {
      id: e,
    };
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(`${server}/user/delete-note`, {
      method: "POST",
      body: JSON.stringify(noteId),
      headers: headers,
      credentials: "include",
    });
    const res = await response.json();

    if (res.status === "successful") {
      setSuccessStates({
        saveNotes: "",
        fetchNotes: "",
        deleteNote: res.data.message,
      });
      setErrorStates({
        saveNotes: "",
        fetchNotes: "",
        deleteNote: "",
      });
      onFetchNotes();
    } else {
      setSuccessStates({
        saveNotes: "",
        fetchNotes: "",
        deleteNote: "",
      });
      setErrorStates({
        saveNotes: "",
        fetchNotes: "",
        deleteNote: res.data.message,
      });
    }
  };

  const onFetchNotes = useCallback(async () => {
    const noteData = { userId: authCtx.authUserId };

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(`${server}/user/get-all-notes`, {
      method: "POST",
      body: JSON.stringify(noteData),
      headers: headers,
      credentials: "include",
    });
    const res = await response.json();
    if (res.status === "successful") {
      setSuccessStates({
        saveNotes: "",
        fetchNotes: "",
        // fetchNotes: res.data.message,
        deleteNote: "",
      });
      setErrorStates({
        saveNotes: "",
        fetchNotes: "",
        deleteNote: "",
      });
      onFetchNotes();
    } else {
      setSuccessStates({
        saveNotes: "",
        fetchNotes: "",
        deleteNote: "",
      });
      setErrorStates({
        saveNotes: "",
        fetchNotes: res.data.message,
        deleteNote: "",
      });
    }

    setAllFetchedNotes(res.data.result);
  }, [authCtx.authUserId]);

  //fetch all notes for a user

  // useEffect to fetch all notes for a particular user
  useEffect(() => {
    onFetchNotes();
  }, [onFetchNotes]);
  // useEffect to fetch all notes for a particular user

  const onSaveNote = async (newNote: Note) => {
    authCtx.reqLoadingStateHandler();
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(`${server}/user/add-note`, {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: headers,
      credentials: "include",
      // statusCode: 200,
    });
    const res = await response.json();

    if (res.status === "successful") {
      setSuccessStates({
        saveNotes: res.data.message,
        fetchNotes: "",
        deleteNote: "",
      });
      setErrorStates({
        saveNotes: "",
        fetchNotes: "",
        deleteNote: "",
      });
      onFetchNotes();
    } else {
      setSuccessStates({
        saveNotes: "",
        fetchNotes: "",
        deleteNote: "",
      });
      setErrorStates({
        saveNotes: res.data.message,
        fetchNotes: "",
        deleteNote: "",
      });
    }
    authCtx.reqLoadingStateResetHandler();
  };

  // for paginationComponent
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allFetchedNotes?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const numberOfPages =
    allFetchedNotes?.length && allFetchedNotes?.length / itemsPerPage;

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
    <>
      {authCtx.reqLoadingState ? (
        <PageLoader />
      ) : (
        <ProtectedRoutes>
          <Container className={classes.notes__main_container}>
            <AddNotes onSaveNote={onSaveNote} />

            {allFetchedNotes.length > 0 && (
              <div className={classes.notes__container}>
                <h3>List of your notes</h3>
                <h5>Click on the note&apos;s description to view full note</h5>
                {successStates.deleteNote && (
                  <p className={classes.successMsg}>
                    {successStates.deleteNote}
                  </p>
                )}
                {successStates.saveNotes && (
                  <p className={classes.successMsg}>
                    {successStates.saveNotes}
                  </p>
                )}
                {/* {successStates.fetchNotes && (
                  <p className={classes.successMsg}>
                    {successStates.fetchNotes}
                  </p>
                )} */}

                {errorStates.deleteNote && (
                  <p className={classes.errorMsg}>{errorStates.deleteNote}</p>
                )}
                {errorStates.deleteNote && (
                  <p className={classes.errorMsg}>{errorStates.deleteNote}</p>
                )}
                {errorStates.deleteNote && (
                  <p className={classes.errorMsg}>{errorStates.deleteNote}</p>
                )}
                <div className={classes.notes__container_child_area_wrapper}>
                  {currentItems.map((note) => (
                    <div
                      className={classes.notes__container_child_area}
                      key={note._id}
                    >
                      <div className={classes.notes__container_child}>
                        <div className={classes.note__area}>
                          <div
                            className={classes.note__desc_area}
                            onClick={() => {
                              router.push("/Notes/single-note/" + note._id);
                            }}
                          >
                            <p>
                              <span>Note: </span>
                              {note?.note?.substring(0, 15)}..........
                              <span>click to view full note</span>
                            </p>
                          </div>
                          <div className={classes.notes__actions}>
                            <div
                              className={classes.action__icon}
                              onClick={() => {
                                router.push("/Notes/edit-note/" + note._id);
                              }}
                            >
                              <FiEdit />
                            </div>
                            <div
                              className={classes.action__icon}
                              onClick={() => {
                                onDeleteNote(note._id);
                              }}
                            >
                              <FiTrash2 />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <PaginationComponent
              className={classes.pagination_main}
              itemsPerPage={itemsPerPage}
              totalItems={allFetchedNotes?.length || 0}
              paginate={paginate}
              prevPage={prevPage}
              nextPage={nextPage}
              forwardPages={forwardPages}
              numberOfPages={numberOfPages}
            />
          </Container>
        </ProtectedRoutes>
      )}
    </>
  );
};

export default Notes;
