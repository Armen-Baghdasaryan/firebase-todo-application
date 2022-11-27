import React from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import styles from "../index.module.scss";
import { removeTodo } from "../redux/slices/todoSlice";

const CustomModal = ({ todo, setShowModal }) => {
  const dispatch = useAppDispatch();

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
    setShowModal(false);
  };

  return (
    <div className={styles.modal_container}>
      <div>
        <h4>Delete</h4>
      </div>
      <span className={styles.modal_content}>
        Delete <span className={styles.text_modal_content}>{todo?.title}</span>{" "}
        todo?
      </span>
      <div className={styles.modal_buttons}>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(todo?.id)}
        >
          Delete
        </button>
        <button className="btn btn-primary" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
