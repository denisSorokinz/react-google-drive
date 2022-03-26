import React from "react";
import RichTextEditor, { EditorValue } from "react-rte";

interface IProps {
  value: EditorValue;
  setValue: React.Dispatch<React.SetStateAction<EditorValue>>;
}

export const Editor: React.FC<IProps> = ({ value, setValue }) => {
  // TODO: create debounced firebase update function

  function onValueChange(newValue) {
    setValue(newValue);
    // TODO: call debounced firebase update function
  }

  return <RichTextEditor onChange={onValueChange} value={value} />;
};

export default Editor;
