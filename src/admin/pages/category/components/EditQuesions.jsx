import React, { useEffect } from "react";
import { getAllQuesionsByCategoryAdmin } from "../../../../service/categoryService";
import { useParams } from "react-router";

const EditQuesions = () => {
  const [question, setQuestion] = React.useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getAllQuesionsByCategoryAdmin(id);
        console.log(res, "res...");
        setQuestion(res.data.questions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [id]);
  return (
    <div>
      <div>
        <div className="mt-10 mb-2">
          <label
            htmlFor=""
            className="block uppercase text-center font-semibold text-2xl mb-2"
          >
            Lịch sử bài làm{" "}
          </label>
          {/* <div className="flex justify-center gap-5 items-center">
            <div className="border px-2 py-1">Đúng: {data?.correct}</div>
            {answers ? (
              <>
                <div className="border px-2 py-1">
                  Sai:{" "}
                  {count -
                    (count - Object.keys(answers)?.length) -
                    data?.correct}
                </div>
                <div className="border px-2 py-1">
                  Bỏ trống: {count - Object.keys(answers).length}
                </div>
              </>
            ) : (
              <>
                <div className="border px-2 py-1">Sai: 0</div>
                <div className="border px-2 py-1">Bỏ trống: 0</div>
              </>
            )}
          </div> */}
          {question?.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-white p-5 "
                id={`question-${item?.questionId}`}
              >
                <div className="">
                  <label className="" htmlFor="">
                    Câu {index + 1}:
                  </label>
                  <div className="flex justify-between items-center">
                    <h1 className="font-bold">{item?.questionText}</h1>
                  </div>
                </div>
                <div>
                  {item?.answers?.map((item2, index) => {
                    return (
                      <label
                        key={index}
                        htmlFor={`anwer` + item2?.id}
                        className={`flex items-center cursor-pointer gap-3 mt-3 border p-3 rounded-lg ${
                          item2.is_correct ? "!bg-green-500 text-white" : ""
                        } `}
                      >
                        {item2?.value}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditQuesions;
