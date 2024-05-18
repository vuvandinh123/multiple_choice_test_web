import { useNavigate } from "react-router-dom";
import { useApiCall } from "../../hook";
import congdoan from "../../assets/congdoan.png";
import logoCT from "../../assets/image.png";
import moment from "moment";
import { getAllCompetitionByUser } from "../../service/competitionService";
const Category = () => {
  const navigate = useNavigate();
  const [data,loading,err] = useApiCall(async () => {
    return await getAllCompetitionByUser();
  }, []);
  console.log(err);
  const handleClickStart = (id) => {
    navigate(`/checkin/${id}`);
  };
  return (
    <div className=" flex items-center justify-center h-screen">
      <div className="lg:min-h-[90vh] bg-white fixed lg:relative inset-0 overflow-scroll lg:overflow-auto lg: pb-10 lg:w-[90vw] m-auto ">
        <div className=" text-center ">
          <div>
            <p className="text-xl py-4  flex  items-center gap-5 justify-center">
              <img className="w-[200px] hidden lg:block" src={logoCT} alt="" />
              <div className="flex items-center gap-2">
                <img className="w-[40px] h-[40px]" src={congdoan} alt="" />
                <div className="text-[14px] capitalize  text-blue-800 font-bold">
                  <span className="block translate-y-1">
                    Công đoàn trường cao đẳng
                  </span>
                  <span className="block -translate-y-1 text-center m-0 p-0">
                    Công Thương TP.HCM
                  </span>
                </div>
              </div>
            </p>
            <p className="mt-10 font-bold uppercase text-3xl lg:text-2xl">
              Trường cao đẳng
              <span className="ms-2">Công Thương TPHCM</span>
            </p>
            <p className="mt-5">Chọn chủ để bên dưới để thi</p>
          </div>
        </div>
        <div className="flex items-center flex-wrap px-3 mt-10 justify-center gap-3">
          {data?.data?.map((item) => {
            const currentTime = moment();
            const start_time = moment(item.start_time);
            const end_time = moment(item.end_time);
            let isInRange = currentTime.isBetween(start_time, end_time);
            if (!isInRange) {
              return null;
            }
            return (
              <div
                key={item.id}
                className="bg-white lg:w-[400px] w-full border mt-5 shadow-lg rounded-lg p-6 space-y-4"
              >
                <div className="">
                  <h3 className="uppercase text-center text-gray-600 text-sm">
                    Danh mục
                  </h3>
                  <div>
                    <div className="text-gray-600 uppercase text-xl font-bold mt-2 text-center">
                      {item.name}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-gray-500 mt-2 text-sm">
                        Mở:{" "}
                        <span className="text-black">
                          {moment(item.start_time).format("H:mm - D/M/YYYY")}
                        </span>
                      </div>
                      <div className="text-gray-500 mt-2 text-sm">
                        Đóng:{" "}
                        <span className="text-black">
                          {moment(item.end_time).format("H:mm - D/M/YYYY")}
                        </span>
                      </div>
                    </div>

                    <div className="text-gray-500 mt-2 text-sm">
                      Thời gian làm bài:{" "}
                      <span className="text-black">{item.duration} phút</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleClickStart(item.id)}
                  disabled={!isInRange}
                  className={`w-full text-pink-600 bg-pink-100 hover:bg-pink-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out ${
                    isInRange ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {isInRange ? "Bắt đầu thi" : "Đang đóng thi"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
