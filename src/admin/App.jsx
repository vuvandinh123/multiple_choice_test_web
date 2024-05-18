import { Route, Routes } from "react-router";
import { privateRouter } from "../router/privateRouter";

const App = () => {
  return (
    <div>
      <Routes>
        {privateRouter.map((route, index) => {
          const { path, component: Component, layout: Layout } = route;
          if (route.layout) {
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              ></Route>
            );
          }
          return (
            <Route key={index} path={path} element={<Component />}></Route>
          );
        })}
        {/* <Route index element={<Dashboard />}></Route> */}
        {/* <Route path="categories" element={<ListCategory />}></Route>
        <Route path="categories/new" element={<NewCategory />}></Route>
        <Route path="users" element={<UserAdmin />}></Route>
        <Route path="users/:id" element={<ShowUser />}></Route>
        <Route path="categories/:id" element={<ShowCategory />}></Route>
        <Route path="categories/edit/:id" element={<EditCategory />}></Route>
        <Route path="category/test" element={<ExcelDataComponent />}></Route> */}
      </Routes>
    </div>
  );
};

export default App;
