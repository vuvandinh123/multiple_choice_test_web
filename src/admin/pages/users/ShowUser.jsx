/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserById } from "../../../service/userService";
import moment from "moment";
import { secToMin } from "../../../utils";
import HistoryUser from "./components/HistoryUser";
import { getCompetitionById } from "../../../service/competitionService";
import toast from "react-hot-toast";

const ShowUser = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState("1");
  const [history, setHistory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [correct, setCorrect] = useState([]);
  const [count, setCount] = useState(0);
  const [rank, setRank] = useState(0);
  const [fields, setFields] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getCompetitionById(data?.compe_id);
      setCount(res.data.count_quesion);
    };
    if (data?.compe_id) fetchApi();
  }, [id, data?.compe_id]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getUserById(id);
        setData(res.data.user);
        setHistory(JSON.parse(res.data.user.history));
        setAnswers(JSON.parse(res.data.user.answers));
        setCorrect(JSON.parse(res.data.user.data_correct));
        setFields(res.data.fields);
        setRank(res.data.rank);
      } catch (error) {
        console.log(error);
        toast.error("Lỗi serve vui lòng liên hệ trợ giúp !");
      }
    };
    fetchApi();
  }, [id]);
  return (
    <div>
      {/* component */}
      <div className="hidden space-y-6 p-10 pb-16 md:block bg-white min-h-screen">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            Chi tiết thí sinh
          </h2>
          <p className="text-muted-foreground">
            Thông tin điểm số và lịch sử bài làm
          </p>
        </div>
        {/* Seperator */}
        <div className="shrink-0 bg-border h-[1px] w-full" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-3 lg:space-y-0">
          <nav className="flex space-x-1 w-[200px] lg:flex-col lg:space-x-0 lg:space-y-1">
            <div className="sticky border py-5 rounded-md border-gray-100 shadow-sm top-20 flex flex-col ">
              <button
                onClick={() => setIsOpen("1")}
                className={`inline-flex items-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:text-blue-500 justify-start ${
                  isOpen === "1"
                    ? " before:content-[''] before:block before:w-3 before:h-3 before:rounded-full before:bg-blue-500 before:me-2 text-blue-500 !font-bold"
                    : ""
                }`}
              >
                Thông tin
              </button>
              <button
                onClick={() => setIsOpen("2")}
                className={`inline-flex items-center rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:text-blue-500 justify-start transition-all ${
                  isOpen === "2"
                    ? " before:content-[''] before:block before:w-3 before:h-3 before:rounded-full before:bg-blue-500 before:me-2 text-blue-500 !font-bold"
                    : ""
                }`}
              >
                Lịch sử bài làm
              </button>
            </div>
          </nav>
          <div className="flex-1">
            {/* About Page Content */}
            <div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-9">
                  {isOpen === "1" && (
                    <div className="border border-gray-100 shadow-sm rounded-lg p-3">
                      <div className="grid mb-5  grid-cols-12">
                        <div className="font-bold col-span-3 border-r">
                          Họ và tên:
                        </div>
                        <div className="ms-4 w-max col-span-9">
                          {data?.name}
                        </div>
                      </div>
                      {data.forecast ? (
                        <div className="grid mb-5  grid-cols-12">
                          <div className="font-bold col-span-3 border-r">
                            Câu hỏi phụ:
                          </div>
                          <div className="ms-4 w-max col-span-9">
                            {data?.forecast}
                          </div>
                        </div>
                      ) : null}
                      {fields?.map((field, index) => (
                        <div key={index} className="grid mb-5 grid-cols-12">
                          <div className="font-bold col-span-3 border-r">
                            {field.label}:
                          </div>
                          <div className="ms-4 col-span-9">{field.value}</div>
                        </div>
                      ))}
                      <div className="grid mb-5 grid-cols-12">
                        <div className="font-bold col-span-3 border-r">
                          Cuộc thi:
                        </div>
                        <div className="ms-4 col-span-9">
                          {data?.compe_name}
                        </div>
                      </div>
                      <div className="grid mb-5 grid-cols-12">
                        <div className="font-bold col-span-3 border-r">
                          Thời gian bắt đầu:
                        </div>
                        <div className="ms-4 col-span-9">
                          {moment(data.start_time).format(
                            "HH:mm:ss DD-MM-YYYY "
                          )}
                        </div>
                      </div>
                      <div className="grid mb-5 grid-cols-12">
                        <div className="font-bold col-span-3 border-r">
                          Thời gian nộp bài:
                        </div>
                        <div className="ms-4 col-span-9">
                          {moment(data.end_time).format("HH:mm:ss DD-MM-YYYY ")}
                        </div>
                      </div>
                      <div className="grid mb-5 grid-cols-12">
                        <div className="font-bold col-span-3 border-r">
                          Công đoàn:
                        </div>
                        <div className="ms-4 col-span-9">{data.union_name}</div>
                      </div>
                      <div className="grid mb-5 grid-cols-12">
                        <div className="font-bold col-span-3 border-r">
                          Tổng thời gian làm bài
                        </div>
                        <div className="ms-4 col-span-9">
                          {secToMin(data.time)}
                        </div>
                      </div>
                    </div>
                  )}
                  {isOpen === "2" && (
                    <div className="border border-gray-100 shadow-sm rounded-lg p-3">
                      <HistoryUser
                        count={count}
                        history={history}
                        data={data}
                        correct={correct}
                        answers={answers}
                      ></HistoryUser>
                    </div>
                  )}
                </div>
                <div className="col-span-3">
                  <div className="border sticky top-20 border-gray-100 shadow-sm rounded-lg p-3">
                    <div className="grid grid-cols-2 py-2">
                      <div className="font-bold text-sm col-span-1 pr-3 border-r">
                        Xếp hạng:
                      </div>
                      <div className="ms-4 col-span-1 text-center">
                        {rank ?? -99}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 py-2">
                      <div className="font-bold text-sm col-span-1 pr-3 border-r">
                        Số câu đúng:
                      </div>
                      <div className="ms-4 col-span-1 text-center">
                        {data?.correct ?? 0}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 py-2">
                      <div className="font-bold text-sm col-span-1 pr-3 border-r">
                        Số câu sai:
                      </div>
                      <div className="ms-4 col-span-1 text-center">
                        {count -
                          (count - Object.keys(answers ?? {})?.length) -
                          data?.correct}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 py-2">
                      <div className="font-bold text-sm col-span-1 pr-3 border-r">
                        Số câu bỏ trống:
                      </div>
                      <div className="ms-4 col-span-1 text-center">
                        {answers && count - Object.keys(answers).length}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 py-2">
                      <div className="font-bold text-sm col-span-1 pr-3 border-r">
                        Thời gian làm bài:
                      </div>
                      <div className="ms-4 col-span-1 text-center">
                        {secToMin(data?.time)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowUser;
