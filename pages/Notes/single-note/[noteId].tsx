import React from "react";
import EditNote from "components/Notes/EditNote";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import * as mongoose from "mongoose";
import { Props } from "types/types";
import nextConfig from "next.config";
import SingleNote from "components/Notes/SingleNote";

function SingleNotePage({ note }: Props) {
  const router = useRouter();
  const { noteId } = router.query;

  return (
    <div>
      <SingleNote note={note} />
    </div>
  );
}

export async function getStaticPaths(context: any) {
  // fetching all note
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  };

  const response = await fetch(
    `${nextConfig.env?.backend_url}/user/get-note-collection`,
    {
      method: "GET",
      headers: headers,
      credentials: "include",
      // statusCode: 200,
    }
  );

  const res = await response.json();

  const notes = await res.data.result;

  return {
    fallback: "blocking",
    paths: notes.map((note: any) => ({
      params: { noteId: note._id.toString() },
    })),
  };
}

export async function getStaticProps(context: any) {
  // fetching one note

  const noteId = context.params.noteId;

  const note_id = {
    noteId: noteId,
  };

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  };

  const response = await fetch(
    `${nextConfig.env?.backend_url}/user/get-one-note`,
    {
      method: "POST",
      body: JSON.stringify(note_id),
      headers: headers,
      credentials: "include",
      // statusCode: 200,
    }
  );

  const res = await response.json();

  const note = await res.data.result;

  return {
    props: {
      note: {
        id: note?._id.toString(),
        note: note?.note,
      },
    },
    revalidate: 1,
  };
}

export default SingleNotePage;
