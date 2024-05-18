/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import {
  AiFillProfile,
  AiOutlineBook,
  AiOutlinePieChart,
} from "react-icons/ai";
import { FaWpforms } from "react-icons/fa";
import { GrDocumentUser } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdManageAccounts } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  return (
    <div>
      <div className="h-screen w-screen relative overflow-x-hidden gap-3 flex bg-gray-200">
        {/* container */}
        <aside className="flex w-20 fixed z-20 flex-col items-center bg-white text-gray-700 shadow h-full">
          {/* Side Nav Bar*/}
          <div className="h-16 flex items-center w-full">
            {/* Logo Section */}
          </div>
          <ul>
            {/* Items Section */}
            <li className="hover:bg-gray-100 group relative ">
              <NavLink
                to={"/admin"}
                end
                className={({ isActive }) =>
                  "h-16 px-6 flex justify-center items-center w-full" +
                  (isActive ? " text-orange-500 " : "")
                }
                activeClassName=" bg-gray-100"
              >
                <AiOutlinePieChart size={24}></AiOutlinePieChart>
              </NavLink>
              <div className="absolute group-hover:bg-gray-100 group-hover:visible group-hover:opacity-100 opacity-0 transition-all invisible flex items-center justify-center shadow-sm !z-50 left-full top-0 bg-white rounded-e-lg w-24 h-full px-3">
                Thống kê
              </div>
            </li>
            <li className="hover:bg-gray-100 group relative">
              <NavLink
                to={"/admin/danh-sach-cuoc-thi"}
                className={({ isActive }) =>
                  "h-16 px-6 flex justify-center items-center w-full" +
                  (isActive ? " text-orange-500 " : "")
                }
                activeClassName=" bg-gray-100"
              >
                <LuLayoutDashboard size={24}></LuLayoutDashboard>
                <div className="absolute group-hover:bg-gray-100 group-hover:visible group-hover:opacity-100 opacity-0 transition-all invisible flex items-center justify-center shadow-sm !z-50 left-full top-0 bg-white rounded-e-lg min-w-24 w-max h-full px-3">
                  Danh sách cuộc thi
                </div>
              </NavLink>
            </li>
            <li className="hover:bg-gray-100 group relative">
              <NavLink
                to={"/admin/danh-sach-chu-de"}
                title="Chủ đề thi"
                className={({ isActive }) =>
                  "h-16 px-6 flex justify-center items-center w-full" +
                  (isActive ? " text-orange-500 " : "")
                }
              >
                <AiOutlineBook size={24}></AiOutlineBook>
              </NavLink>
              <div className="absolute group-hover:bg-gray-100 group-hover:visible group-hover:opacity-100 opacity-0 transition-all invisible flex items-center justify-center shadow-sm !z-50 left-full top-0 bg-white rounded-e-lg w-24 h-full px-3">
                Chủ đề thi
              </div>
            </li>
            <li className="hover:bg-gray-100 group relative">
              <NavLink
                to={"/admin/danh-sach-thi-sinh"}
                title="Danh sách thí sinh"
                className={({ isActive }) =>
                  "h-16 px-6 flex justify-center items-center w-full" +
                  (isActive ? " text-orange-500 " : "")
                }
              >
                <GrDocumentUser size={24}></GrDocumentUser>
              </NavLink>
              <div className="absolute group-hover:bg-gray-100 group-hover:visible group-hover:opacity-100 opacity-0 transition-all invisible flex items-center justify-center shadow-sm !z-50 left-full top-0 bg-white rounded-e-lg min-w-24 w-max h-full px-3">
                Danh sách thí sinh
              </div>
            </li>
            <li className="hover:bg-gray-100 group relative">
              <NavLink
                to={"/admin/danh-sach-cac-truong"}
                className={({ isActive }) =>
                  "h-16 px-6 flex justify-center items-center w-full" +
                  (isActive ? " text-orange-500 " : "")
                }
              >
                <FaWpforms size={24}></FaWpforms>
              </NavLink>
              <div className="absolute group-hover:bg-gray-100 group-hover:visible group-hover:opacity-100 opacity-0 transition-all invisible flex items-center justify-center shadow-sm !z-50 left-full top-0 bg-white rounded-e-lg min-w-24 w-max h-full px-3">
                Danh sách các trường
              </div>
            </li>
            <li className="hover:bg-gray-100 group relative">
              <NavLink
                to={"/admin/danh-sach-tai-khoan"}
                className={({ isActive }) =>
                  "h-16 px-6 flex justify-center items-center w-full" +
                  (isActive ? " text-orange-500 " : "")
                }
              >
                <MdManageAccounts size={24}></MdManageAccounts>
              </NavLink>
              <div className="absolute group-hover:bg-gray-100 group-hover:visible group-hover:opacity-100 opacity-0 transition-all invisible flex items-center justify-center shadow-sm !z-50 left-full top-0 bg-white rounded-e-lg min-w-24 w-max h-full px-3">
                Danh sách các tài khoản
              </div>
            </li>
            <li className="hover:bg-gray-100 group relative">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  alert("Coming soon");
                }}
                className="h-16 px-6 flex justify-center items-center w-full
					focus:text-orange-500"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx={12} cy={12} r={3} />
                  <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1
							0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0
							0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2
							2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0
							0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1
							0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0
							0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65
							0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0
							1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0
							1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2
							0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0
							1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0
							2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0
							0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65
							1.65 0 0 0-1.51 1z"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </aside>
        <div className="w-20"></div>
        {/* Sidebar - End */}
        {/* Main Content */}
        <main className="flex-1 z-0">
          <div className="mt-20 me-3">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
