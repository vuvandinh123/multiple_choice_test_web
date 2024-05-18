import Cookies from "js-cookie";
import { BiCategory, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
const SiderBar = () => {
  const handleClickLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("userId");
    window.location.href = "/admin/login";
  };
  return (
    <div className=" rounded-lg bg-white ">
      <div>
        <div className="ml-6 hidden lg:flex w-16 flex-row lg:flex-col items-center space-y-10 py-6">
          <div className="flex items-center justify-center rounded-md bg-white p-4 text-blue-600">
            <Link to="/admin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-8 w-8 cursor-pointer transition-all hover:text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
            </Link>
          </div>
          <div className="space-y-20 rounded-md bg-white">
            <ul className="flex lg:flex-col">
              <li className="p-5">
                <Link to={"/admin/users"}>
                  <BiUser className="h-6 w-6 cursor-pointer text-gray-500 transition-all hover:text-blue-600" />
                </Link>
              </li>
              <li className="p-5">
                <Link to={"/admin/categories"}>
                  <BiCategory className="h-6 w-6 cursor-pointer text-gray-500 transition-all hover:text-blue-600" />
                </Link>
              </li>
            </ul>
            <div className="flex items-center justify-center pb-5">
              <button onClick={handleClickLogout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 cursor-pointer text-gray-500 hover:text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          <ul className="flex items-center justify-between gap-10 px-3 py-2">
            <li>
              {" "}
              <Link to="/admin" className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 cursor-pointer transition-all hover:text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                  />
                </svg>
                <p>Trang chủ</p>
              </Link>
            </li>
            <li>
              <Link to={"/admin/users"} className="flex flex-col items-center">
                <BiUser className="h-6 w-6 cursor-pointer text-gray-500 transition-all hover:text-blue-600" />
                <p>Người dùng</p>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/categories"
                className="flex flex-col items-center"
              >
                <BiCategory className="h-6 w-6 cursor-pointer text-gray-500 transition-all hover:text-blue-600" />
                <p>Danh mục</p>
              </Link>
            </li>
            <li className="flex items-center flex-col gap-2 justify-end">
              <button onClick={handleClickLogout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 cursor-pointer text-gray-500 hover:text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button>
              Đăng xuất
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SiderBar;
