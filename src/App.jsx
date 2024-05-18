import { Route, Routes } from "react-router-dom";
import Layout from "./layouts";
import Quiz from "./page/quiz";
import Category from "./page/category";
import { Toaster } from "react-hot-toast";
import CheckIn from "./page/CheckIn";
import Result from "./page/result";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
// import LayoutAdmin from "./layouts/LayoutAdmin";

import Admin from "./admin";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Category />}></Route>
          <Route path="checkin/:id" element={<CheckIn />}></Route>
          <Route path="quiz/:id" element={<Quiz />}></Route>
          <Route path="quiz/result" element={<Result />}></Route>
        </Route>
        <Route path="/admin/*" element={<Admin />}></Route>
        {/* <Route path="*" element={<Page404 />}></Route> */}
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
