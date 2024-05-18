/* eslint-disable react/prop-types */
import { FaFlag } from "react-icons/fa";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Siderbar = ({ data, isOpen, setIsOpen, answers, answersNote }) => {
  return (
    <>
      <div
        className="fixed bg-opacity-80 rounded-r-lg top-24 border p-2 bg-white cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <HiMiniBars3BottomLeft
          onClick={() => setIsOpen(false)}
          size={30}
        ></HiMiniBars3BottomLeft>
      </div>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed top-0 lg:hidden left-0 right-0 bottom-0  bg-black opacity-45 ${isOpen
          ? "visible"
          : "invisible"
          }`}
      ></div>
      <div
        className={`fixed left-0 top-[90px]  bg-white z-10 rounded-r-lg  bottom-0 w-[300px] shadow-lg transition-all duration-200 max-w-full overflow-hidden p-5 ${
          isOpen ? "translate-x-0 visible " : "translate-x-[-100%] invisible"
        }`}
      >
        <div className="flex justify-between mb-3  bg-white">
          <div className="font-medium">Danh sách câu hỏi</div>
          <HiMiniBars3BottomLeft
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
            size={30}
          ></HiMiniBars3BottomLeft>
        </div>
        <div className="flex flex-wrap scro gap-1 overflow-y-auto">
          {data?.map((item, index) => {
            return (
              <Link
                to={`#question-${item.questionId}`}
                key={index}
                className={`border w-12 h-12 flex justify-center items-center relative rounded-lg ${
                  answers[item.questionId] ? "bg-pink-500 text-white" : ""
                }
                `}
              >
                {index + 1}
                {answersNote?.[`${item?.questionId}`] ? (
                  <span className="absolute right-0 top-0 text-blue-700">
                    <FaFlag size={13}></FaFlag>
                  </span>
                ) : (
                  ""
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Siderbar;
