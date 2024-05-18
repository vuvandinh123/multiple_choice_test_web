/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { getAllCategory } from "../../../../service/categoryService";
import {
  allFieldsNotEmpty,
  formathDate,
  formathDate2,
  handleError,
} from "../../../../utils";
import { newCompetition } from "../../../../service/competitionService";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";
import { getAllFormFieldActive } from "../../../../service/formService";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const dataNew = {
  name: "",
  start_time: "",
  end_time: "",
  duration: "",
  category_id: "",
  count_quesion: "",
  is_active: 0,
  fields: [],
};
const ModalNew = ({ setLoading }) => {
  const [category, setCategory] = useState([]);
  const [fields, setFields] = useState([]);
  const [isOpenOke, setIsOpenOke] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState(dataNew);
  const formRef = useRef(null);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getAllCategory();
        const res2 = await getAllFormFieldActive();
        setFields(res2.data);
        setCategory(res.data.data);
      } catch (error) {
        console.log(error);
        toast.error("Lỗi server vui lòng liên hệ để đ̣c hỗ trợ !");
      }
    };
    if (isOpen) {
      fetchApi();
    }
  }, [isOpen]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (allFieldsNotEmpty(item) === false) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    const cate = category.find((item2) => item2.id == item.category_id);
    if (Number(cate?.quantity) < item.count_quesion) {
      toast.error("Câu hỏi trong Danh mục không được ít hơn số lượng câu hỏi");
      return;
    }
    setLoading(true);
    try {
      const res = await newCompetition({
        ...item,
      });
      if (res) {
        setIsOpen(false);
        formRef.current.reset();
        setItem(dataNew);
        toast.success("Thêm mới thành công");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    if (window.confirm("Bạn chưa lưu thay đổi bạn có muốn đóng")) {
      setIsOpen(false);
      formRef.current.reset();
      setItem(dataNew);
    }
  };

  const handleChangeCate = (e) => {
    const cate = category.find((item) => item.id == e.target.value);
    if (Number(cate?.quantity) < item.count_quesion) {
      toast.error("Câu hỏi trong Danh mục không được ít hơn số lượng câu hỏi");
      return;
    }
    setItem({ ...item, category_id: e.target.value });
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 bg-gray-200  rounded-lg flex items-center gap-2"
      >
        Tạo mới <BiPlus className="text-lg text-gray-50" />{" "}
      </button>
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black bg-opacity-25 z-40 ${
          isOpen ? "visible" : "invisible"
        }`}
      ></div>
      <div
        className={` fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   z-50 transition-all duration-300  ${
          isOpen
            ? "visible scale-100 opacity-100"
            : "invisible opacity-0 scale-50"
        }`}
      >
        <form ref={formRef} action="" onSubmit={handleSubmit} method="post">
          <div
            role="alert"
            className="container mx-auto mt-10 lg:w-[1000px] md:w-2/3 max-w-lg"
          >
            <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
              <h1 className="text-gray-800 text-xl font-lg font-bold tracking-normal leading-tight mb-4">
                Thêm mới
              </h1>
              <label
                htmlFor="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Tên cuộc thi{" "}
                <span className="text-red-500 ms-1 text-[12px]">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Tên mới"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="email2"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Số lượng câu hỏi{" "}
                    <span className="text-red-500 ms-1 text-[12px]">*</span>
                  </label>
                  <div className="relative mb-5 mt-2">
                    <input
                      id="email2"
                      type="number"
                      value={item.count_quesion}
                      onChange={(e) =>
                        setItem({ ...item, count_quesion: e.target.value })
                      }
                      className="text-gray-600 appearance-none  focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                      placeholder="30"
                    />
                    <div className="absolute text-gray-600 right-0 top-0 flex items-center px-4 border-l h-full">
                      Câu
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email2"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Thời gian thi{" "}
                    <span className="text-red-500 ms-1 text-[12px]">*</span>
                  </label>
                  <div className="relative mb-5 mt-2">
                    <input
                      id="email2"
                      type="number"
                      value={item.duration}
                      onChange={(e) =>
                        setItem({ ...item, duration: e.target.value })
                      }
                      className="text-gray-600 appearance-none  focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                      placeholder="30"
                    />
                    <div className="absolute text-gray-600 right-0 top-0 flex items-center px-4 border-l h-full">
                      Phút
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Ngày bắt đầu{" "}
                    <span className="text-red-500 ms-1 text-[12px]">*</span>
                  </label>
                  <div className="relative mb-5 mt-2">
                    <input
                      id="expiry"
                      value={formathDate2(item.start_time)}
                      onChange={(e) =>
                        setItem({
                          ...item,
                          start_time: formathDate(e.target.value),
                        })
                      }
                      type="datetime-local"
                      className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                      placeholder="MM/YY"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Ngày kết thúc{" "}
                    <span className="text-red-500 ms-1 text-[12px]">*</span>
                  </label>
                  <div className="relative mb-5 mt-2">
                    <input
                      id="expiry"
                      type="datetime-local"
                      value={formathDate2(item.end_time)}
                      onChange={(e) =>
                        setItem({
                          ...item,
                          end_time: formathDate(e.target.value),
                        })
                      }
                      className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                      placeholder="MM/YY"
                    />
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <label
                  htmlFor="cvc"
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Chọn danh mục câu hỏi{" "}
                  <span className="text-red-500 ms-1 text-[12px]">*</span>
                </label>
                <div className="relative mb-5 mt-2">
                  <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-info-circle"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx={12} cy={12} r={9} />
                      <line x1={12} y1={8} x2="12.01" y2={8} />
                      <polyline points="11 12 12 12 12 16 13 16" />
                    </svg>
                  </div>
                  <select
                    className="mb-5 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 bg-white rounded border appearance-none"
                    name=""
                    onChange={handleChangeCate}
                    value={item.category_id}
                    id=""
                  >
                    <option value="" selected disabled>
                      Chọn dữ liệu
                    </option>
                    {category?.map((item2) => (
                      <option
                        selected={item2.id === item.category_id}
                        key={item2.id}
                        value={item2.id}
                      >
                        {item2.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <label
                htmlFor="cvc"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Thêm trường <span className="font-normal">(option)</span>
              </label>
              <div className="relative mb-5 mt-2">
                <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-info-circle"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx={12} cy={12} r={9} />
                    <line x1={12} y1={8} x2="12.01" y2={8} />
                    <polyline points="11 12 12 12 12 16 13 16" />
                  </svg>
                </div>
                <div
                  className="mb-5 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex relative items-center pl-3 text-sm border-gray-300 bg-white rounded border appearance-none"
                  name=""
                  onClick={() => setIsOpenOke(!isOpenOke)}
                  id=""
                >
                  <div className="cursor-pointer w-full">
                    <p className="cursor-pointer w-full">Chọn trường</p>
                    <div className="absolute cursor-pointer top-1/2 right-3 -translate-y-1/2">
                      {isOpenOke ? <BsChevronUp /> : <BsChevronDown />}
                    </div>
                  </div>
                  <div
                    className={`absolute shadow-md py-2 bottom-full rounded-md transition-all  left-0 right-0 z-10 bg-white border ${
                      isOpenOke ? "block" : "hidden"
                    }`}
                  >
                    {fields?.map((item2) => (
                      <div key={item2.id}>
                        <label
                          className="flex py-1 p-3 transition-all hover:bg-gray-100 cursor-pointer items-center gap-2"
                          htmlFor={item2.name}
                        >
                          <input
                            type="checkbox"
                            value={item2.id}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setItem({
                                  ...item,
                                  fields: [...item.fields, item2.id],
                                });
                              } else {
                                setItem({
                                  ...item,
                                  fields: item.fields.filter(
                                    (item) => item !== item2.id
                                  ),
                                });
                              }
                            }}
                            name="status"
                            id={item2.name}
                          />
                          {item2.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative mb-5 mt-0">
                  <label
                    htmlFor="active"
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setItem({ ...item, is_active: e.target.checked })
                      }
                      value={item.status}
                      checked={item.is_active}
                      name="status"
                      id="active"
                    />
                    Hoạt động
                  </label>
                </div>
                <div className="relative mb-5 mt-0">
                  <label
                    htmlFor="is_forecast"
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setItem({ ...item, is_forecast: e.target.checked })
                      }
                      value={item.is_forecast}
                      checked={item.is_forecast}
                      name="status"
                      id="is_forecast"
                    />
                    Câu hỏi phụ
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-start w-full">
                <button
                  type="submit"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                >
                  Lưu
                </button>
                <button
                  onClick={handleClose}
                  type="button"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                >
                  Hủy
                </button>
              </div>
              <button
                onClick={handleClose}
                type="button"
                className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                aria-label="close modal"
                role="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-x"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalNew;
