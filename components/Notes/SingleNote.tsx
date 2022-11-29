import React, { useState } from "react";
import { Props } from "types/types";
import { useRouter } from "next/router";
import ProtectedRoutes from "components/utility/ProtectedRoutes";
import Container from "components/utility/Container";
import classes from "components/Notes/SingleNote.module.css";
import { server } from "config/index";

function SingleNote({ note }: Props) {
  const [noteState, setNoteState] = useState({
    id: note?.id,
    note: note?.note,
  });
  const router = useRouter();
  return (
    <>
      <ProtectedRoutes>
        <Container className={classes.singleNote__main_container}>
          <div className={classes.notes__desc}>
            <h3>Here&apos;s your note</h3>
            <span style={{ fontSize: "100px" }}>&#128064;</span>
          </div>
          <div className={classes.notes__container_child}>
            {noteState?.note}
          </div>
          <div
            onClick={() => {
              router.back();
            }}
            className={classes.notes__container_goBack}
          >
            <span style={{ fontSize: "100px" }}>&#9198;</span>
            <h4>Go Back</h4>
          </div>
        </Container>
      </ProtectedRoutes>
    </>
  );
}

export default SingleNote;
