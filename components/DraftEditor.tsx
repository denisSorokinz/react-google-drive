import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface IProps {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}

export default function DraftEditor<IProps>({ editorState, setEditorState, ...props }) {
  return (
    <>
      <div
        style={{
          height: "400px",
        }}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          {...props}
        />
      </div>
    </>
  );
}
