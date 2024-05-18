import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="bg-gray-200 pb-10">
      <Outlet></Outlet>
      <p className="text-gray-500 text-center mb-5">Copyright © 2024 Vu Dinh</p>
    </div>
  );
};

export default Layout;
