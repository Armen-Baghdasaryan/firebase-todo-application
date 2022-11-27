import React from "react";
import { Link } from "react-router-dom";
import { ubdateCompleted } from "../redux/slices/todoSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import emptyPhoto from "../assets/emptyPhoto.jpg";
import styles from "../index.module.scss";
import dayjs from "dayjs";

const TodoItem = ({ todo, handleDelete }) => {
  const dispatch = useAppDispatch();

  const handleChange = (e, id) => {
    const data = {
      ...todo,
      completed: e.target.checked,
    };

    dispatch(ubdateCompleted({ id: id, data: data }));
  };

  const isHaseTime =
    new Date(dayjs(todo?.finishDate?.date)) < new Date() &&
    new Date(dayjs(todo?.finishDate?.time)) < new Date() &&
    !todo.completed;

  return (
    <li className={styles.list_item_cont}>
      <div className={styles.title_container}>
        <input
          type="checkbox"
          checked={todo.completed}
          className={styles.checkbox}
          onChange={(e) => handleChange(e, todo.id)}
        />
        <h6 className={todo.completed ? styles.text_checked : null}>{todo.title}</h6>
        {isHaseTime && <span className={styles.over_time}>Time is over!</span>}
      </div>
      <div className={styles.buttons_container}>
        <div className={styles.views_container}>
          <span className={styles.views}>
            <i className="fa fa-thin fa-eye"></i>
          </span>
          <span>{todo.viewsQty}</span>
        </div>
        <img
          alt="img"
          src={todo.imgUrl ? todo.imgUrl : emptyPhoto}
          width={30}
          height={30}
          className="me-4"
        />
        <Link to={`todoitem/${todo.id}`}>
          <button className="btn btn-primary m-1">More...</button>
        </Link>
        <Link to={`edittodo/${todo.id}`}>
          <button className="btn btn-warning m-1"> Edit</button>
        </Link>
        <button
          className="btn btn-danger m-1"
          onClick={() => handleDelete(todo)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
