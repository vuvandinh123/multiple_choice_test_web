import { Link } from "react-router-dom";
import logo from "../../assets/logo2.png";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    Cookies.get("user") && setUser(JSON.parse(Cookies.get("user")));
  }, []);
  return (
    <header className="fixed left-0 right-0 z-50 flex h-16 flex-shrink-0 items-center bg-white">
      <div className="absolute inset-y-0 left-0 lg:static lg:flex-shrink-0">
        <Link
          to={"/"}
          className="flex h-16 w-16 items-center justify-center bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 lg:w-20"
        >
          <img className="w-auto h-10" src={logo} alt="Your Company" />
        </Link>
      </div>
      {/* Menu button area */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-6 lg:hidden">
        {/* Mobile menu button */}
        <button
          type="button"
          className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      {/* Desktop nav area */}
      <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="relative ms-3 max-w-2xl text-gray-400 focus-within:text-gray-500">
            <label htmlFor="desktop-search" className="sr-only">
              Tìm kiếm
            </label>
            <input
              id="desktop-search"
              type="search"
              placeholder="Search all inboxes"
              className="block py-3 outline-blue-400 border rounded-md border-blue-200 px-2 w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent focus:ring-0 sm:text-sm"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="ml-10 flex flex-shrink-0 items-center space-x-10 pr-4">
          <nav aria-label="Global" className="flex space-x-10">
            <div className="relative text-left">
              <button
                type="button"
                className="flex items-center rounded-md text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                id="menu-0-button"
              >
                <span>Quản lý</span>
                <svg
                  className="ml-1 h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <a
              onClick={() => alert("Coming soon")}
              href="#"
              className="text-sm font-medium text-gray-900"
            >
              Cài đặt
            </a>
          </nav>
          <div className="flex items-center space-x-8">
            <span className="inline-flex">
              <a
                href="#"
                onClick={() => alert("Coming soon")}
                className="-mx-1 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </a>
            </span>
            <div className="relative inline-block text-left">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                id="menu-1-button"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt
                />
              </button>
              {isOpen && (
                <>
                  <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 h-full w-full z-10"
                  />
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Coming soon");
                      }}
                      href="#"
                      className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                    >
                      {user?.name}
                    </Link>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Coming soon");
                      }}
                      className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                    >
                      {user?.email}
                    </Link>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Coming soon");
                      }}
                      className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                    >
                      Cài đặt
                    </Link>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        Cookies.remove("accessToken");
                        Cookies.remove("userId");
                        window.location.href = "/admin/login";
                      }}
                      href="#"
                      className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                    >
                      Đăng xuất
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide this `div` based on menu open/closed state */}
      <div className="relative z-40 lg:hidden">
        <div className="hidden sm:fixed sm:inset-0 sm:block sm:bg-gray-600 sm:bg-opacity-75" />
        <div className="fixed text-gray-400 flex items-center justify-center inset-0 z-40 bg-white">
          <div>
            <p className="text-xl text-center">KHÔNG HỖ TRỢ MOBILE</p>
            <p>Vui lòng đăng nhập trang quản trị trên máy tính</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
