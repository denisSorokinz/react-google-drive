import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";

import { firebase, firebaseAuth} from "../firebase/firebase";
import { createDocument } from "../firebase/utils";

interface IProps {
  isModalShown: boolean;
  toggleShowModal: () => void;
  hideModal: () => void;
}

function CreateDocumentModal({
  isModalShown,
  toggleShowModal,
  hideModal,
}: IProps) {
  const [name, setName] = useState("");

  const onCreateDocument = () => {
    const uid = firebaseAuth.currentUser.uid;
    const serverTimestamp = firebase.firestore.Timestamp.now().seconds;

    createDocument(name, serverTimestamp, uid);

    setName("");
    hideModal();
  };

  return (
    <>
      {isModalShown &&
        ReactDOM.createPortal(
          <Modal size="sm" active={isModalShown} toggler={toggleShowModal}>
            <ModalBody>
              <input
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                type="text"
                className="outline-none"
                placeholder="Enter Document Name"
                onKeyPress={(ev) => ev.key === "Enter" && onCreateDocument()}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="red"
                buttonType="filled"
                size="regular"
                rounded={true}
                block={false}
                iconOnly={true}
                ripple="light"
                onClick={hideModal}
              >
                <Icon name="close" size="sm" />
              </Button>
              <Button
                color="blue"
                buttonType="filled"
                size="regular"
                rounded={true}
                block={false}
                iconOnly={true}
                ripple="light"
                onClick={onCreateDocument}
              >
                <Icon name="check" size="sm" />
              </Button>
            </ModalFooter>
          </Modal>,
          document.body
        )}
    </>
  );
}

export default CreateDocumentModal;
