import { firebaseFirestore } from "../firebase/firebase";
import {
  addDoc,
  updateDoc,
  getDoc,
  collection,
  doc,
  query,
} from "firebase/firestore";

import {
  useCollection,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";

import documentType from "../types/documentType";

async function createDocument(
  name: string,
  serverTimestamp: number,
  uid: string
) {
  if (!name.length) return;

  const newDocument: documentType = {
    name,
    description: "",
    createdAtSec: serverTimestamp,
  };

  await addDoc(
    collection(firebaseFirestore, "users", uid, "documents"),
    newDocument
  );
}

const getDocumentData = async (uid: string, documentId: string) => {
  const documentRef = doc(
    firebaseFirestore,
    "users",
    uid,
    "documents",
    documentId
  );

  const documentSnapshot = await getDoc(documentRef);
  const documentData = documentSnapshot.data() as documentType;

  return documentData;
};

const useDocumentData = (uid: string, documentId: string) => {
  const documentRef = doc(
    firebaseFirestore,
    "users",
    uid,
    "documents",
    documentId
  );

  const documentData = useDocumentDataOnce(documentRef);

  return documentData;
};

const useDocumentsCollection = (uid: string) => {
  const documentsRef = collection(firebaseFirestore, "users", uid, "documents");

  const q = query(documentsRef);

  const data = useCollection(q);
  return data;
};

const updateDocument = (
  uid: string,
  documentId: string,
  documentData: documentType
) => {
  const documentRef = doc(
    firebaseFirestore,
    "users",
    uid,
    "documents",
    documentId
  );

  updateDoc(documentRef, documentData);
};

export {
  createDocument,
  getDocumentData,
  useDocumentData,
  useDocumentsCollection,
  updateDocument,
};
