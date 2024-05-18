/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { checkQuesions } from "../../service/quesionService";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { secToMin } from "../../utils";
/* eslint-disable react/prop-types */
const Result = () => {
  const [data, setData] = useState({});
  const [category, setCategory] = useState({});
  const navigate = useNavigate();
  const fetchCheckAnswer = async () => {
    const category = localStorage.getItem("category")
      ? JSON.parse(localStorage.getItem("category"))
      : null;
    const answers = localStorage.getItem("answers")
      ? JSON.parse(localStorage.getItem("answers"))
      : {};
    if (!category) return navigate("/");
    setCategory(category);
    const data = {
      answers: { ...answers },
      categoryId: category?.id,
      forecast: sessionStorage.getItem("forecast") ?? null,
    };
    const fetchApi = async () => {
      try {
        const res = await checkQuesions(data);
        localStorage.clear();
        Cookies.remove("quizStartTime");
        Cookies.remove("token");
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  };
  useEffect(() => {
    fetchCheckAnswer();
  }, []);
  console.log(category);
  return (
    <div>
      <div className={`fixed inset-0 z-10 bg-black opacity-45`}></div>
      <div
        className={`fixed max-w-full lg:w-[500px] w-full h-full lg:h-auto rounded-md bg-white p-5 z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 `}
      >
        <div className="">
          <div className="text-center text-lg uppercase mb-5 font-bold">
            Kết quả của bạn đã được lưu lại
          </div>
          <div>
            <p className="my-3">
              Họ và tên{" "}
              <span className="font-bold">
                {data?.user?.name ? data?.user?.name : ""}
              </span>{" "}
            </p>
            <p className="my-3">
              Bạn đã làm đúng{" "}
              <span className="text-green-500">
                {data.score ? data.score : 0}
              </span>{" "}
              câu
            </p>
            <p className="my-3">
              Bạn đã làm sai{" "}
              <span className="text-red-500">
                {category?.count_quesion && category?.count_quesion - data.score}
              </span>{" "}
              câu
            </p>
            <p className="my-3">
              Thời gian làm{" "}
              <span className="text-red-500">
                {secToMin(data.time ? data.time : 0)}
              </span>{" "}
            </p>
            <p className="my-3">
              Số Điểm:{" "}
              <span className="font-bold text-lg">
                {data.score ? data.score : 0} / {category?.count_quesion}
              </span>
            </p>
          </div>
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="w-full mt-5 rounded-lg font-medium bg-pink-500 border border-pink-500 text-white px-6 py-3"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
