// import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { firebaseAuth, firebaseFirestore } from "../../firebase/firebase";
import {
  getDocumentData,
  updateDocument,
  useDocumentData,
} from "../../firebase/utils";

import withAuth from "../../hooks/withAuth";
import { EditorState, ContentState } from "draft-js";
import { useCallback, useEffect, useMemo, useState } from "react";

// import RichTextEditor, { EditorValue } from "react-rte";
// import DraftEditor from "../../components/DraftEditor";

import debounce from "../../utils/debounce";

import styles from "../../styles/DraftEditor.module.css";
import documentType from "../../types/documentType";
import { GetServerSideProps } from "next";

const getEditorText = (editorState: EditorState) =>
  editorState.getCurrentContent().getPlainText();

// const Editor = dynamic(() => import("../../components/RichTextEditor"), {
//   ssr: false,
// });

// const debounced = debounce((documentData, description) => {
//   const updatedDocumentData = {
//     ...(documentData as documentType),
//     description,
//   };
//   updateDocument(currentUser.uid, documentId, updatedDocumentData);
// });

const DraftEditor = dynamic(() => import("../../components/DraftEditor"), {
  ssr: false,
});

function Document() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      const currentUser = firebaseAuth.currentUser;
      const { id: documentId } = router.query as { id: string };

      const data = await getDocumentData(currentUser.uid, documentId);
      data ? setDocumentData(data) : setError("Document not Found");

      setLoading(false);
    })();
  }, []);

  const [documentData, setDocumentData] = useState<documentType>({
    name: "",
    description: "",
    createdAtSec: 0,
  });
  useEffect(() => {
    const { description } = documentData;
    description &&
      setEditorState(
        EditorState.createWithContent(ContentState.createFromText(description))
      );
  }, [documentData]);

  const createdAtString = useMemo(
    () => new Date(documentData.createdAtSec * 1000).toLocaleDateString(),
    [documentData]
  );

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editor) => {
    setEditorState(editor);

    const editorText = getEditorText(editor);
    const updatedDocumentData = { ...documentData, description: editorText };
    debouncedUpdateDocument(updatedDocumentData);
  };

  const debouncedUpdateDocument = useCallback(
    debounce((documentData: documentType) =>
      console.log("[0]")
      // updateDocument(currentUser.uid, documentId, documentData)
    ),
    []
  );

  if (loading) return <span>loading...</span>;

  if (error) return <span>{error}</span>;

  return (
    <div className="h-screen bg-gray-50 pt-10 text-center">
      <div className="max-w-3xl mx-auto mb-4 text-lg font-medium text-gray-700">
        <h1>{documentData.name}</h1>
      </div>
      <div className="max-w-3xl mx-auto mb-8 shadow-xl bg-white">
        <DraftEditor
          editorState={editorState}
          setEditorState={onEditorStateChange}
          wrapperClassName={styles.wrapper}
          editorClassName={styles.editor}
        />
        {/* <Editor value={editorValue} setValue={setEditorValue} /> */}
      </div>
      <div className="max-w-3xl mx-auto mb-4 text-lg font-medium text-gray-700">
        <span>{createdAtString}</span>
      </div>
    </div>
  );
}

// #region
// function Document() {
//   const router = useRouter();

//   const currentUser = firebaseAuth.currentUser;
//   const { id: documentId } = router.query as { id: string };

//   const [documentData, loading, error, snapshot, reload] = useDocumentData(
//     currentUser.uid,
//     documentId
//   );

//   const [editorState, setEditorState] = useState<EditorState>(
//     EditorState.createWithContent(
//       ContentState.createFromText(documentData ? documentData.description : "")
//     )
//   );

//   if (!firebaseAuth || !firebaseFirestore)
//     console.log(
//       "debugger:",
//       currentUser,
//       documentId,
//       firebaseAuth,
//       firebaseFirestore
//     );

//   const debouncedUpdateDocument = useCallback(
//     debounce((editorState) => console.log("cb:", getEditorText(editorState))),
//     []
//   );

//   const onEditorStateChange = (editor) => {
//     setEditorState(editor);

//     debouncedUpdateDocument(editor);
//   };

//   const createdAtString = useMemo(
//     () =>
//       documentData &&
//       new Date(documentData.createdAtSec * 1000).toLocaleDateString(),
//     [documentData]
//   );

//   if (loading) return <span>loading...</span>;

//   if (error) return <span>{error}</span>;

//   return (
//     <div className="h-screen bg-gray-50 pt-10 text-center">
//       <div className="max-w-3xl mx-auto mb-4 text-lg font-medium text-gray-700">
//         <h1>{documentData.name}</h1>
//       </div>
//       <div className="max-w-3xl mx-auto mb-8 shadow-xl bg-white">
//         <DraftEditor
//           editorState={editorState}
//           setEditorState={onEditorStateChange}
//           wrapperClassName={styles.wrapper}
//           editorClassName={styles.editor}
//         />
//         {/* <Editor value={editorValue} setValue={setEditorValue} /> */}
//       </div>
//       <div className="max-w-3xl mx-auto mb-4 text-lg font-medium text-gray-700">
//         <span>{createdAtString}</span>
//       </div>
//     </div>
//   );
// }
// #endregion

export default withAuth(Document);
