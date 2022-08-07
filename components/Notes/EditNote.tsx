import React, { useContext, useEffect, useState } from "react";
import { fetchedNotes, Props } from "types/types";
import classes from "components/Notes/AddNotes.module.css";
import Container from "components/utility/Container";
import nextConfig from "next.config";
import { useRouter } from "next/router";
import AuthContext from "context/auth-context";
import UtilContext from "context/util-context";
import ProtectedRoutes from "components/utility/ProtectedRoutes";
import PageLoader from "components/utility/PageLoader";

function EditNote({ note }: Props) {
  const authCtx = useContext(AuthContext);
  const utilCtx = useContext(UtilContext);
  const [successMsg, setSuccessMsg] = useState("");
  const [failureMsg, setFailureMsg] = useState("");
  const [noteState, setNoteState] = useState({
    id: note?.id,
    note: note?.note,
  });
  const router = useRouter();

  // useEffect to check if user is still authenticated

  // useEffect to check if user is still authenticated

  const onEditNote = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    authCtx.reqLoadingStateHandler();

    const editedNote = {
      id: noteState.id,
      note: noteState.note,
    };

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(
      `${nextConfig.env?.backend_url}/user/edit-note`,
      {
        method: "POST",
        body: JSON.stringify(editedNote),
        headers: headers,
        credentials: "include",
        // statusCode: 200,
      }
    );

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
      router.push("/Notes/NotesPage");
    }
    authCtx.reqLoadingStateResetHandler();
  };

  useEffect(() => {
    setSuccessMsg("");
    setFailureMsg("");
  }, [router]);

  return (
    <>
      {authCtx.reqLoadingState ? (
        <PageLoader />
      ) : (
        <ProtectedRoutes>
          <Container className={classes.editNote__main_container}>
            <div
              className={`${classes.form_style_3} ${classes.form__main_area}`}
            >
              <h5 className={classes.h5}>{successMsg && successMsg}</h5>
              <h5 className={classes.h5}>{failureMsg && failureMsg}</h5>
              <h3>Edit Your Notes</h3>
              <form onSubmit={onEditNote}>
                <fieldset>
                  <legend> YOUR NOTE</legend>
                  <label htmlFor="field6">
                    <span>
                      Enter text <span className={classes.required}>*</span>
                    </span>
                    <textarea
                      name="field6"
                      className={classes.textarea_field}
                      value={noteState?.note}
                      onChange={(e) => {
                        setSuccessMsg("");
                        setFailureMsg("");
                        setNoteState({ ...noteState, note: e.target.value });
                      }}
                    ></textarea>
                  </label>
                  <label>
                    <span> </span>
                    <input type="submit" value="Submit" />
                  </label>
                </fieldset>
              </form>
            </div>
          </Container>
        </ProtectedRoutes>
      )}
    </>
  );
}

export default EditNote;
