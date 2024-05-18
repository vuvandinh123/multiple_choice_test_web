/* eslint-disable react-hooks/exhaustive-deps */
import Card from "../../components/common/Card";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useScrollElement } from "../../hook";
import Header from "./components/Header";
import Siderbar from "./components/Siderbar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ModalSubmit from "./components/ModalSubmit";
import { updateAnswer, updateHistory } from "../../service/categoryService";
import { getQusitionCompetition } from "../../service/competitionService";
const Quiz = () => {
  useScrollElement();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [answersNote, setAnswersNote] = useState({});
  const [forecast, setForecast] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
      toast.error("Bạn không còn quyền truy cập");
    }
    return () => {};
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getQusitionCompetition(id);
        setData(res.questions);
        await updateHistory({
          data_order: res.questions,
        });
        localStorage.setItem("questionOrder", JSON.stringify(res.questions));
      } catch (error) {
        // navigate("/");
        console.log(error);
        toast.error("Bạn không có quyền truy cập");
      }
    };
    const questionOrder = localStorage.getItem("questionOrder");
    const category = localStorage.getItem("category");
    if (!questionOrder) {
      // Cookie chưa tồn tại, gọi API để lấy dữ liệu mới
      setCategory(JSON.parse(category));
      fetchApi();
    } else {
      // Cookie đã tồn tại, kiểm tra thời gian và hiển thị câu hỏi
      setData(JSON.parse(questionOrder));
      if (category) {
        setCategory(JSON.parse(category));
      }
    }

    if (localStorage.getItem("answers")) {
      setAnswers(JSON.parse(localStorage.getItem("answers")));
    }
    if (localStorage.getItem("answersNote")) {
      setAnswersNote(JSON.parse(localStorage.getItem("answersNote")));
    }
  }, []);
  const updateAnswersToDatabase = async (data) => {
    const res = await updateAnswer({
      answer: data,
    });
    return res;
  };
  useEffect(() => {
    if (Object.keys(answers).length !== 0) {
      localStorage.setItem("answers", JSON.stringify(answers));
      updateAnswersToDatabase(answers);
    }
    if (Object.keys(answersNote).length !== 0) {
      localStorage.setItem("answersNote", JSON.stringify(answersNote));
    }
  }, [answers, answersNote]);
  const fetchCheckAnswer = async () => {
    navigate("/quiz/result");
  };
  const onCountdownEnd = async () => {
    fetchCheckAnswer();
  };
  const handleClickSumbit = () => {
    if (!Number(category?.count_quesion) && category.is_forecast) {
      toast.error("Vui lòng nhập dự đoán CĐV tham gia cuộc thi");
      return;
    }
    sessionStorage.setItem("forecast", forecast);
    window.location.href = "/quiz/result";
  };
  return (
    <div>
      <Header
        answers={answers}
        data={data}
        category={category}
        onCountdownEnd={onCountdownEnd}
      ></Header>
      <Siderbar
        data={data}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        answers={answers}
        answersNote={answersNote}
      ></Siderbar>
      <div className="w-[900px] mt-20 max-w-full min-h-[100vh] mx-auto my-auto p-5 mb-10">
        {data?.map((item, index) => {
          return (
            <div key={index} className="mb-2">
              <Card
                answers={answers}
                category={category}
                numberCount={index + 1}
                setAnswersNote={setAnswersNote}
                answersNote={answersNote}
                setAnswers={setAnswers}
                data={item}
              ></Card>
            </div>
          );
        })}
        <div
          className={`bg-white p-5 rounded-md ${
            Number(category?.is_forecast) ? "block" : "hidden"
          }`}
        >
          <div className="">
            <label className="" htmlFor=""></label>
            <div className="flex justify-between items-center">
              <h1 className="font-bold">
                Dự đoán có bao nhiêu CĐV tham gia cuộc thi ?
              </h1>
            </div>
          </div>
          <div>
            <input
              onChange={(e) => setForecast(e.target.value)}
              type="number"
              className="w-full mt-4 p-3 border outline-pink-400 rounded-md border-gray-300"
            />
          </div>
        </div>
        <div className="flex justify-end mb-10 mt-10">
          <ModalSubmit
            handleClickSumbit={handleClickSumbit}
            onCountdownEnd={onCountdownEnd}
            category={category}
            answers={answers}
            duration={category?.duration}
          ></ModalSubmit>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
