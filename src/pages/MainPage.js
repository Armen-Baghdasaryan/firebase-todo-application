import React, { useEffect, useState } from "react";
import { getData } from "../redux/slices/todoSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import Header from "../components/AppHeader";
import TodoItem from "../components/TodoItem";
import styles from "../index.module.scss";
import CustomModal from "../components/CustomModal";

const MainPage = () => {
  const { todos, isUbdate, isLoading } = useAppSelector((store) => store.todos);
  const [showModal, setShowModal] = useState(false);
  const [todoModal, setTodoModal] = useState({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch, isUbdate]);

  const handleDelete = (todo) => {
    setTodoModal(todo);
    setShowModal(true);
  };

  return (
    <div className={styles.main_page_container}>
      <div className={showModal ? styles.blur : null}>
        <Header />
        <div className={styles.main_container}>
          {isLoading && <h4 className="text-center">Loading...</h4>}
          {!isLoading && JSON.stringify(todos) === "[]" && (
            <h4 className="text-center"> No Todos! </h4>
          )}
          <ul className={styles.list_container}>
            {todos?.map((todo) => (
              <TodoItem key={todo.id} todo={todo} handleDelete={handleDelete} />
            ))}
          </ul>
        </div>
      </div>
      {showModal && (
        <CustomModal
          todo={todoModal}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default MainPage;
