import NewDocumentSection from "../components/NewDocumentSection";
import DocumentsSection from "../components/DocumentsSection";
import CreateDocumentModal from "../components/CreateDocumentModal";

import Header from "../components/Header";

import { firebaseAuth } from "../firebase/firebase";
import { useDocumentsCollection } from "../firebase/utils";
import { useAuthState } from "react-firebase-hooks/auth";

import useModal from "../hooks/useModal";
import withAuth from "../hooks/withAuth";

function Home() {
  const [user] = useAuthState(firebaseAuth as any);
  const { isModalShown, toggleShowModal, showModal, hideModal } = useModal();
  const [userDocuments] = useDocumentsCollection(user.uid);

  return (
    <>
      <Header user={user} />

      <NewDocumentSection isModalShown={isModalShown} showModal={showModal} />

      <DocumentsSection userDocuments={userDocuments} />

      <CreateDocumentModal
        isModalShown={isModalShown}
        toggleShowModal={toggleShowModal}
        hideModal={hideModal}
      />
    </>
  );
}

export default withAuth(Home);
