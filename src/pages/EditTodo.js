import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ubdateTodo } from "../redux/slices/todoSlice";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import DataPicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import emptyPhoto from "../assets/emptyPhoto.jpg";
import styles from "../index.module.scss";

const EditTodo = () => {
  const { todos } = useAppSelector((store) => store.todos);
  const navigate = useNavigate();
  const { id } = useParams();
  const [upLoad, setUpLoad] = useState(null);
  const [file, setFile] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [uploadImg, setUploadImg] = useState("");
  const [submitData, setSubmitData] = useState({
    title: "",
    description: "",
    endData: "",
    completed: false,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    todos?.map((todo) => {
      if (todo.id === id) {
        setSubmitData({
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
          endData: null,
          endTime: null,
        });
        setUploadImg(todo.imgUrl);
      }
      return null;
    });
  }, [id, todos]);

  useEffect(() => {
    const upLoadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setUpLoad(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUploadImg(downloadURL);
          });
        }
      );
    };
    file && upLoadFile();
  }, [file]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ollData = {
      ...submitData,
      imgUrl: uploadImg,
      viewsQty: 0,
      createdAt: Date.now(),
      finishDate: {
        date: endDate?.toString(),
        time: endTime?.toString(),
      },
    };

    if (submitData.title && submitData.description && endDate && endTime) {
      dispatch(ubdateTodo({ id: id, data: ollData }));
      navigate("/");
      setSubmitData({
        title: "",
        description: "",
        endData: "",
      });
      setUploadImg("");
    } else {
      toast("Title, Description, Date and Time required fields!");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.main_page_container}>
      <button className="btn btn-secondary mt-3 mb-3" onClick={handleBack}>
        Back
      </button>

      <h4>Edit todo</h4>
      <div className={styles.add_page_container}>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <img
              alt="img"
              src={uploadImg || emptyPhoto}
              className={styles.img_input_file}
            />
          </div>
          <input
            className="form-control"
            placeholder="Edit Todo Title"
            value={submitData.title}
            onChange={(e) =>
              setSubmitData({ ...submitData, title: e.target.value })
            }
          />
          <input
            className="form-control"
            placeholder="Edit Todo Description"
            value={submitData.description}
            onChange={(e) =>
              setSubmitData({ ...submitData, description: e.target.value })
            }
          />
          <div className={styles.calendar_container}>
            <p>Edit date after how much the task should be done</p>
            <DataPicker endDate={endDate} setEndDate={setEndDate} />
            <TimePicker endTime={endTime} setEndTime={setEndTime} />
          </div>
          <button
            disabled={upLoad !== null && upLoad < 100}
            type="submit"
            className="btn btn-primary"
          >
            Edit Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;
