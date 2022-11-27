import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ubdateCompleted } from "../redux/slices/todoSlice";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import emptyPhoto from "../assets/emptyPhoto.jpg";
import {
  checkNewDateDateAndHour,
  checkRespDateAndHour,
  transformToDate,
} from "../helpers/tranformToDate";
import styles from "../index.module.scss";

const ItemPage = () => {
  const { todos } = useAppSelector((store) => store.todos);
  const [todo, setTodo] = useState({});
  const { id } = useParams();
  const [diff, setDiff] = useState(null);
  const [hasTime, setHasTime] = useState(true);
  const dayjs = require("dayjs");
  const dispatch = useAppDispatch();

  const respDate = dayjs(todo?.finishDate?.date);
  const respTime = dayjs(todo?.finishDate?.time);
  const finishDate = transformToDate(respDate, respTime);

  const newDateNow = dayjs(new Date());
  const newDateAndHour = checkNewDateDateAndHour(newDateNow);
  const respDateAndHour = checkRespDateAndHour(respDate, respTime);

  useEffect(() => {
    todos?.map((todo) => {
      if (todo.id === id) {
        setTodo(todo);
        dispatch(
          ubdateCompleted({
            id: id,
            data: { ...todo, viewsQty: todo.viewsQty + 1 },
          })
        );
      }
      return null;
    });
  }, [id, todos, dispatch]);

  useEffect(() => {
    if (
      new Date(respDate) < new Date() &&
      new Date(respTime) < new Date() &&
      !todo.completed
    ) {
      setHasTime(false);
    } else setHasTime(true);
  }, [respDate, respTime, todo.completed]);

  useEffect(() => {
    if (newDateAndHour === respDateAndHour) {
      let diff = `${respTime.minute() - newDateNow.minute()}`;
      if (diff > 0 && !todo?.completed) {
        setDiff(diff);
      } else {
        setDiff(null);
      }
    } else {
      setDiff(null);
    }
  }, [newDateAndHour, newDateNow, respDateAndHour, respTime, respDate, todo.completed]);

  return (
    <div className={styles.main_page_container}>
      <Link to={"/"}>
        <button className="btn btn-secondary mt-3">Back</button>
      </Link>
      <div className={styles.item_container}>
        <section className={styles.item_left_section}>
          <img
            alt="img"
            src={todo?.imgUrl ? todo.imgUrl : emptyPhoto}
            className={styles.item_image}
          />
        </section>
        <section className={styles.item_right_section}>
          <div>
            <h6>Todo Title</h6>
            <span>{todo?.title}</span>
          </div>
          <div>
            <h6>Todo Description</h6>
            <span>{todo?.description}</span>
          </div>
          <span>Views: {todo?.viewsQty}</span>
          <span>Finish Date: {finishDate} </span>
          {diff && (
            <span style={{ color: "orangered" }}>Left Time: {diff} minute!</span>
          )}
          {!hasTime && (
            <span style={{ color: "red" }}>Time is over. Todo not done!</span>
          )}
        </section>
      </div>
    </div>
  );
};

export default ItemPage;
