import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { useApiCall } from "../../hook";
import { AddUser } from "../../service/userService";
import Cookies from "js-cookie";
import { getAllUnion } from "../../service/unionService";
import { getCompetitionByUserId } from "../../service/competitionService";
import { getFormById } from "../../service/formService";
const CheckIn = () => {
  const [category, setCategory] = useState({});
  const [union, setUnion] = useState([]);
  const { id } = useParams();
  const [field, setField] = useState([]);
  const [data, setData] = useState({});
  const [unionID, setUnionID] = useState("");
  const [name, setName] = useState("");
  useApiCall(async () => {
    try {
      const [re1, re2, re3] = await Promise.all([
        getCompetitionByUserId(id),
        getAllUnion(),
        getFormById(id),
      ]);
      setUnion(re2.data);
      setCategory(re1.data);
      setField(re3.data);
      const newData = re3.data.reduce((acc, item) => {
        acc[item.id] = "";
        return acc;
      }, {});
      setData({ ...newData });
    } catch (e) {
      console.log(e);
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (unionID === "") {
      toast.error("Vui lòng nhập đầy đủ");
      return;
    }
    for (const item of field) {
      const value = data[item.id];
      if (item.is_required && value === "") {
        toast.error("Vui lòng điền đầy đủ");
        return;
      }
      if (
        item.validation_rules &&
        value.length !== Number(item.validation_rules)
      ) {
        toast.error(item.label + " không đúng định dạng");
        return;
      }
    }
    const fetchApi = async () => {
      try {
        const res = await AddUser({
          data: data,
          name: name,
          union_id: unionID,
          compe_id: id,
        });
        if (res.status === 402) {
          toast.error("Mỗi ng̀ười chỉ thi 1 lần !");
          return;
        }
        if (res?.answer) {
          toast.success("Đăng ký thãi hiện");
          localStorage.setItem("answers", res.answer);
          localStorage.setItem("questionOrder", res.history);
          const date = new Date(res.startTime);
          Cookies.set("quizStartTime", date.getTime());
        } else {
          localStorage.removeItem("questionOrder");
          localStorage.removeItem("answers");
          Cookies.set("quizStartTime", new Date().getTime());
        }
        localStorage.setItem("category", JSON.stringify(category));
        const duration = Number(category.duration) || 60;
        Cookie.set("token", res.token.token, {
          expires: (duration + 1) / 1440,
        });
        Cookie.set("userId", res.token.user_id, {
          expires: (duration + 1) / 1440,
        });
        window.location.href = "/quiz/" + id;
      } catch (error) {
        // if (error.response.status === 403) {
        //   toast.error("Mỗi người chỉ thi 1 lần !");
        // } else {
        //   toast.error("Chưa đến thời gian đăng ký");
        //   navigate("/");
        // }
        console.log(error);
      }
    };
    fetchApi();
  };
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center ">
        <div className="relative flex flex-col rounded-lg bg-white px-10 py-5 font-sans    text-gray-700 shadow-none">
          <p className="text-center uppercase mb-2 text-md text-pink-500">
            Chuyên mục
          </p>
          <h1 className="text-center font-bold text-2xl">{category.name}</h1>
          <p className="text-center text-gray-500 text-sm mt-2">
            Thông tin và kết quả của bạn sẽ được lưu lại trong hệ thống
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-8 mb-2 lg:w-[400px] h-screen lg:h-auto  !max-w-full  "
          >
            <div className="mb-4 flex flex-col gap-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <select
                  className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  value={unionID}
                  onChange={(e) => setUnionID(e.target.value)}
                >
                  <option className="capitalize" disabled value="">
                    Chọn công đoàn
                  </option>
                  {union?.map((item) => (
                    <option
                      key={item.id}
                      className="capitalize"
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Công Đoàn
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type={"text"}
                  className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 capitalize">
                  Họ và tên
                </label>
              </div>
              {field?.map((item) => (
                <div
                  key={item.id}
                  className="relative h-11 w-full min-w-[200px]"
                >
                  <input
                    type={item.type}
                    className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    value={data?.[item.id]}
                    onChange={(e) =>
                      setData({ ...data, [item.id]: e.target.value })
                    }
                  />

                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 capitalize">
                    {item.label}
                  </label>
                </div>
              ))}

              {/* <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="number"
                  disabled={category.is_active == 1 ? false : true}
                  className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  value={data.CCCD}
                  onChange={(e) => {
                    setData({ ...data, CCCD: e.target.value });
                  }}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Căn cước công dân
                </label>
              </div> */}
            </div>
            <button
              className="mt-5 block w-full select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              data-ripple-light="true"
            >
              Tiếp tục
            </button>
          </form>
        </div>
      </div>

      {/* <Intro></Intro> */}
    </div>
  );
};

export default CheckIn;
