/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";

import toast from "react-hot-toast";
import { editFieldById } from "../../../../service/formService";
import { allFieldsNotEmpty, checkWhitespace } from "../../../../utils";

const ModalEdit = ({ isOpen, setIsOpen, data, setLoading }) => {
  const [item, setItem] = useState({
    ...data,
    is_validate: data.validation_rules ? true : false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (item.name === "" || item.label === "" || item.type === "") {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (checkWhitespace(item.name)) {
      toast.error("Vui lòng không điền khoảng trống trong tên trường !!!");
      return;
    }
    setLoading(true);
    const editApi = async () => {
      try {
        const res = await editFieldById(item.id, item);
        if (res) {
          toast.success("Sửa thanh cong");
          setIsOpen(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Lỗi server vui lòng liên hệ để được hỗ trợ !");
      } finally {
        setLoading(false);
      }
    };
    editApi();
  };
  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
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
                Sửa
              </h1>
              <label
                htmlFor="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Tên trường{" "}
                <span className=" font-normal text-[12px]">
                  (Viết liền không dấu)
                </span>
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
                Loại <span className=" font-normal text-[12px]"></span>
              </label>
              <select
                className="mb-5 mt-2 bg-white text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal max-h-[100px] w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border capitalize"
                name=""
                value={item.type}
                onChange={(e) => setItem({ ...item, type: e.target.value })}
                id=""
              >
               <option className="capitalize" value="text">text</option>
                <option className="capitalize"  value="number">number</option>
                <option className="capitalize"  value="email">email</option>
                <option className="capitalize"  value="date">date</option>
              </select>

              <label
                htmlFor="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Tên hiển thị
              </label>
              <input
                value={item.label}
                onChange={(e) => setItem({ ...item, label: e.target.value })}
                className="mb-5 mt-2 p-3 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Mô tả"
              />
              {item.is_validate && (
                <>
                  <label
                    htmlFor="name"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Kiểm tra độ dài (bằng)
                  </label>
                  <input
                    value={item.validation_rules}
                    onChange={(e) =>
                      setItem({ ...item, validation_rules: e.target.value })
                    }
                    type="number"
                    className="mb-5 mt-2 p-3 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full flex items-center pl-3 text-sm border-gray-300 rounded border"
                    placeholder="Mô tả"
                  />
                </>
              )}

              <div className="flex items-center gap-5">
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
                    htmlFor="required"
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setItem({ ...item, is_required: e.target.checked })
                      }
                      value={item.is_required}
                      checked={item.is_required}
                      name="status"
                      id="required"
                    />
                    Bắt buộc
                  </label>
                </div>
                <div className="relative mb-5 mt-0">
                  <label
                    htmlFor="validate"
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setItem({ ...item, is_validate: true });
                        } else {
                          setItem({
                            ...item,
                            is_validate: false,
                            validation_rules: null,
                          });
                        }
                      }}
                      checked={item?.is_validate}
                      name="status"
                      id="validate"
                    />
                    Kiểm tra
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
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                >
                  Hủy
                </button>
              </div>
              <button
                onClick={() => setIsOpen(false)}
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

export default ModalEdit;
