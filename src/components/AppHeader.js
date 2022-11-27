import React from "react";
import { Link } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import styles from "../index.module.scss";

const AppHeader = () => {
  const { todos } = useAppSelector((store) => store.todos);
  const done = todos?.filter((todo) => todo.completed === true);

  return (
    <div className={styles.header_container}>
      <h3>Todo List</h3>
      <Link to={"addtodo"}>
        <button className="btn btn-primary">Add todo</button>
      </Link>
      <div className={styles.todo_count}>
        <span>All: {todos.length || 0}</span>
        <span>Done: {done.length || 0}</span>
        <span>Active: {todos.length - done.length || 0} </span>
      </div>
    </div>
  );
};

export default AppHeader;
