import { useState } from "react";

interface ModalHook {
  isModalShown: boolean;
  toggleShowModal: () => void;
  showModal: () => void;
  hideModal: () => void;
}

const useModal = (): any => {
  const [isModalShown, setIsModalShown] = useState(false);

  const toggleShowModal = () => setIsModalShown(!isModalShown);

  const showModal = () => setIsModalShown(true);

  const hideModal = () => setIsModalShown(false);

  return { isModalShown, toggleShowModal, showModal, hideModal };
};

export default useModal;
