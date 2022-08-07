import React, { useContext, useState, useEffect } from "react";
import classes from "components/Notes/AddNotes.module.css";
import { Props, Note } from "types/types";
import AuthContext from "context/auth-context";
import UtilContext from "context/util-context";
import { useRouter } from "next/router";
import ProtectedRoutes from "components/utility/ProtectedRoutes";

const AddNotes = ({ onSaveNote }: Props) => {
  const authCtx = useContext(AuthContext);
  const utilCtx = useContext(UtilContext);
  const router = useRouter();

  // useEffect to check if user is still authenticated

  // useEffect to check if user is still authenticated

  const [note, setNote] = useState<Note>({
    user_id: authCtx.authUserId,
    note: "",
  });

  const newNote: Note = {
    ...note,
  };

  const saveNotes = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    onSaveNote?.(newNote);
    setNote({ ...note, note: "" });
  };

  return (
    <ProtectedRoutes>
      <div className={`${classes.form_style_3} ${classes.form__main_area}`}>
        <h3>Add Notes</h3>
        <form onSubmit={saveNotes}>
          <fieldset>
            <legend> YOUR NOTE</legend>
            <label htmlFor="field6">
              <span>
                Enter text <span className={classes.required}>*</span>
              </span>
              <textarea
                name="field6"
                value={note.note}
                className={classes.textarea_field}
                onChange={(e) => {
                  setNote({ ...note, note: e.target.value });
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
    </ProtectedRoutes>
  );
};

export default AddNotes;
