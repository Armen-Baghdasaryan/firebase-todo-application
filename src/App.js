import { Route, Routes } from "react-router-dom";
import ItemPage from "./pages/ItemPage";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="addtodo" element={<AddTodo />} />
        <Route path="edittodo/:id" element={<EditTodo />} />
        <Route path="todoitem/:id" element={<ItemPage />} />
      </Routes>
    </>
  );
};

export default App;
