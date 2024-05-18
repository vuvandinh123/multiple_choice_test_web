/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { allFieldsNotEmpty } from "../../../../utils";
import toast from "react-hot-toast";
import { createAccount, editAccount } from "../../../../service/accountService";

const dataNew = {
  name: "",
  email: "",
  is_active: 0,
};
const ModalEdit = ({ isOpen, setIsOpen, data, setLoading }) => {
  const [item, setItem] = useState(data);
  const formRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      setItem(data);
    }
  }, [isOpen]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (item.email === "" || item.name === "") {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setLoading(true);

    try {
      const res = await editAccount(item.id, {
        ...item,
      });
      if (res) {
        setIsOpen(false);
        formRef.current.reset();
        setItem(dataNew);
        toast.success("Sửa thành công");
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi vui lòng liên hệ đẩ đ̣c hỗ trợ !");
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

  return (
    <>
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
                Sửa
              </h1>
              <label
                htmlFor="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Họ và tên{" "}
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
              <div>
                <label
                  htmlFor="email2"
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Email
                  <span className="text-red-500 ms-1 text-[12px]">*</span>
                </label>
                <div className="relative mb-5 mt-2">
                  <input
                    id="email2"
                    type="text"
                    value={item.email}
                    onChange={(e) =>
                      setItem({ ...item, email: e.target.value })
                    }
                    className="text-gray-600 appearance-none  focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    placeholder="exemple@abc.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email2"
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Tên tài khoản
                  <span className="text-red-500 ms-1 text-[12px]">*</span>
                </label>
                <div className="relative mb-5 mt-2">
                  <input
                    type="text"
                    value={item.username}
                    disabled
                    onChange={(e) =>
                      setItem({ ...item, username: e.target.value })
                    }
                    className="text-gray-600 appearance-none  focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    placeholder="Tên tài khoản"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="expiry"
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Mật khẩu
                  <span className="text-red-500 ms-1 text-[12px]">*</span>
                </label>
                <div className="relative mb-5 mt-2">
                  <input
                    id="expiry"
                    value={item.password}
                    disabled
                    onChange={(e) =>
                      setItem({ ...item, password: e.target.value })
                    }
                    type="password"
                    className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    placeholder="********"
                  />
                </div>
              </div>
              <div className="relative mb-5 mt-0">
                <label
                  htmlFor="active2"
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setItem({ ...item, is_active: e.target.checked })
                    }
                    value={item.is_active}
                    checked={item.is_active}
                    name="active"
                    id="active2"
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
        </form>
      </div>
    </>
  );
};

export default ModalEdit;
