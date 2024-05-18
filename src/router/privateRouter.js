import LayoutAdmin from '../admin/layouts';
import * as PAGE from '../admin/pages';
export const privateRouter = [
    {
        path: '/',
        name: 'admin',
        component: PAGE.Dashboard,
        layout: LayoutAdmin
    },
    {
        path: '/danh-sach-chu-de',
        name: 'admin',
        component: PAGE.ListCategory,
        layout: LayoutAdmin
    },
    {
        path: '/danh-sach-chu-de/:id',
        name: 'admin',
        component: PAGE.EditQuesions,
        layout: LayoutAdmin
    },
    {
        path: '/danh-sach-thi-sinh',
        name: 'admin',
        component: PAGE.ListUsers,
        layout: LayoutAdmin
    },
    {
        path: '/danh-sach-thi-sinh/:id',
        name: 'admin',
        component: PAGE.ShowUser,
        layout: LayoutAdmin
    },
    {
        path: '/danh-sach-cac-truong',
        name: 'admin',
        component: PAGE.ListField,
        layout: LayoutAdmin
    },
    {
        path: '/danh-sach-cuoc-thi',
        name: 'admin',
        component: PAGE.Compe,
        layout: LayoutAdmin
    },
    {
        path: '/danh-sach-tai-khoan',
        name: 'admin',
        component: PAGE.ListAccount,
        layout: LayoutAdmin
    },
    {
        path: '/login',
        name: 'Login',
        component: PAGE.Login,
        // layout: LayoutAdmin
    },

]