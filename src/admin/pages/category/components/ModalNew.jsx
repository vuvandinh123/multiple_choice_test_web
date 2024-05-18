/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";

import toast from "react-hot-toast";
import { newCategory } from "../../../../service/categoryService";
import PreviewJson from "./PreviewJson";
import { BiPlus } from "react-icons/bi";
import { validateJSONStructure } from "../../../../utils";
import FileDownloadComponent from "../../../../components/common/DowloadFile";

const ModalNew = ({ setLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState({
    name: "",
    description: "",
    is_active: 0,
  });
  const [jsonData, setJsonData] = useState(null);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!validateJSONStructure(jsonData)) {
        toast.error("Dữ liệu JSON không đúng định dạng");
        return;
      }
      const newData = { ...item, questions: jsonData };
      const res = await newCategory(newData);
      if (res) {
        setIsOpen(false);
        toast.success("Thêm thành công");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    if (window.confirm("Bạn chưa lưu thay đổi bạn có muốn đóng")) {
      setIsOpen(false);
      setItem({
        name: "",
        description: "",
        is_active: 0,
      });
      setJsonData(null);
    }
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
        <form action="" onSubmit={handleSubmit} method="post">
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
                Tên chủ đề
              </label>
              <input
                id="name"
                type="text"
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal max-h-[100px] w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Tên chủ đề"
              />
              <label
                htmlFor="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Mô tả
              </label>
              <textarea
                value={item.description}
                onChange={(e) =>
                  setItem({ ...item, description: e.target.value })
                }
                className="mb-5 mt-2 p-3 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-20 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Mô tả"
              ></textarea>
              <label
                htmlFor="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Dữ liệu câu hỏi
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsOpenPreview(true)}
                  className="mb-2 p-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                >
                  {jsonData ? "Xem dữ liệu" : "Thêm dữ liệu"}
                </button>
                <div className="absolute text-gray-600 right-0 top-0 flex items-center px-4 border-l h-full">
                  JSON
                </div>
              </div>
              <div className="mb-3 flex justify-end">
                <FileDownloadComponent></FileDownloadComponent>
              </div>
              <div className="relative mb-5 mt-0">
                <label
                  htmlFor="statuscc"
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
                    id="statuscc"
                  />
                  Hoạt động
                </label>
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
          <PreviewJson
            item={item}
            data={jsonData}
            isOpen={isOpenPreview}
            setJsonData={setJsonData}
            setIsOpen={setIsOpenPreview}
          ></PreviewJson>
        </form>
      </div>
    </>
  );
};

export default ModalNew;
