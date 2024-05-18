/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useCoutDown } from "../../../hook";
import Cookies from "js-cookie";
const ModalSubmit = ({
  handleClickSumbit,
  answers,
  onCountdownEnd,
  duration,
  category,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const startTime = Cookies.get("quizStartTime");
  const { display } = useCoutDown({
    startTime: Number(startTime),
    duration,
    onCountdownEnd,
  });
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-pink-500  font-bold text-white px-3 py-2 rounded-sm"
      >
        Kết thúc
      </button>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-10 bg-black opacity-45 ${
          isOpen ? "visible" : "invisible"
        }`}
      ></div>
      <div
        className={`fixed max-w-full lg:w-[500px] w-full h-full lg:h-auto rounded-md bg-white p-5 z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div className="">
          <div className="text-center font-bold">Xác nhận nộp bài</div>
          <div>
            <p className="my-3">
              Bạn đã làm {Object.keys(answers).length} / {category?.count_quesion} câu
            </p>
            <p className="my-3">Thời gian còn lại là {display}</p>
            <p className="text-red-500 text-center mt-10">
              Bạn có chắc muốn nộp bài !
            </p>
          </div>
          <button
            onClick={() => {
              handleClickSumbit();
              setIsOpen(false);
            }}
            className="w-full mt-5 rounded-lg font-medium bg-pink-500 border hover:bg-pink-600 border-pink-600 text-white px-6 py-3"
          >
            Xác nhận
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="w-full mt-5 rounded-lg font-medium  px-6 py-2 text-gray-500"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSubmit;
