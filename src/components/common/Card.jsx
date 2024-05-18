import { FaFlag } from "react-icons/fa";

/* eslint-disable react/prop-types */
const Card = ({
  data,
  answers,
  setAnswers,
  answersNote,
  setAnswersNote,
  numberCount,
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const handleChangeAnswer = (id) => {
    setAnswers({
      ...answers,
      [`${data?.questionId}`]: id,
    });
  };
  return (
    <div
      className="bg-white p-5 rounded-md"
      id={`question-${data?.questionId}`}
    >
      <div className="">
        <label className="" htmlFor="">
          Câu {numberCount}:
        </label>
        <div className="flex justify-between items-center">
          <h1 className="font-bold">{data?.questionText}</h1>
          <span
            onClick={() =>
              setAnswersNote({
                ...answersNote,
                [`${data?.questionId}`]: answersNote?.[`${data?.questionId}`]
                  ? false
                  : true,
              })
            }
            className={`text-blue-500 cursor-pointer ${
              answersNote?.[`${data?.questionId}`] ? " text-red-500" : ""
            }`}
            title="Đặt cờ"
          >
            <FaFlag size={13}></FaFlag>
          </span>
        </div>
      </div>
      <div>
        {data?.answers.map((item, index) => {
          return (
            <label
              key={index}
              htmlFor={`answer` + item?.id}
              className="flex items-center cursor-pointer gap-3 mt-3 border p-3 rounded-lg"
            >
              <input
                className="h-4 w-4 border-gray-300 flex-shrink-0 focus:ring-2 focus:ring-blue-300"
                onChange={() => handleChangeAnswer(item?.id)}
                checked={answers?.[`${data?.questionId}`] === item?.id}
                id={`answer` + item?.id}
                type="radio"
                name={`question` + data?.questionId}
              />
              {alphabet[index] + ". "}
              {item?.name}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
