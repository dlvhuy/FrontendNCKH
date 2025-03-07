import React, { lazy } from "react";
import {
  CalculatorIcon,
  ChartIcon,
  CheckIcon,
  FileIcon,
  HomeIcon,
  ListIcon,
  OrgUnitIcon,
  SettingIcon,
  TaskIcon,
  UserIcon,
} from "@app/components/Icons";

import { URL } from "@url";
import { create } from "@app/rbac/permissionHelper";
import resources from "@app/rbac/resources";
import actions from "@app/rbac/actions";
import { ROLE_SYSTEM } from "@constants";
import { ROLE } from "@components/Notification/NotificationPayLoadType";
import SearchIcon from "@components/Icons/SearchIcon";

const MyInfo = lazy(() => import("@containers/MyInfo/MyInfo"));
const TrangChu = lazy(() => import("@containers/TrangChu/TrangChu"));
const Setting = lazy(() => import("@containers/Setting/Setting"));
const DuLieuBoSung = lazy(() => import("@containers/DuLieuBoSung/DuLieuBoSung"));
const User = lazy(() => import("@containers/User/User"));
const QuanLyDonVi = lazy(() => import("@containers/QuanLyDonVi/QuanLyDonVi"));
const KhoiPhucTaiKhoan = lazy(() => import("@containers/User/KhoiPhucTaiKhoan"));
const Role = lazy(() => import("@containers/Role/Role"));


const QuanLyNguoiDung = lazy(() => import("@containers/QuanLyNguoiDung/QuanLyNguoiDung"));
const Staff = lazy(() => import("@containers/QuanLyVanBang/Staff/QuanLyVanBang"));
const Department = lazy(() => import("@containers/QuanLyVanBang/Department/QuanLyVanBang"));
const DepartmentStaff = lazy(() => import("@containers/QuanLyVanBang/DepartmentStaff/QuanLyVanBang"));

function renderIcon(icon) {
  return (
    <span role="img" className="main-menu__icon">
      <div className="position-absolute" style={{ top: "50%", transform: "translateY(-50%)" }}>
        <div className="position-relative" style={{ width: "30px", height: "30px" }}>
          {icon}
        </div>
      </div>
    </span>
  );
}

const MY_INFO_ROUTE = {
  path: URL.THONG_TIN_CA_NHAN,
  breadcrumbName: "Thông tin cá nhân",
  component: MyInfo,
  permission: "all",
};

export const ADMIN_ROUTES = [
  // { isRedirect: true, from: '/', to: URL.MENU.DASHBOARD },
  {
    path: URL.MENU.DASHBOARD,
    menuName: "Trang chủ",
    component: TrangChu,
    icon: renderIcon(<HomeIcon />),
    permission: "all",
  },
  {
    key: URL.MENU.QUAN_LY_NGUOI_DUNG,
    menuName: "Người dùng",
    icon: renderIcon(<UserIcon />),
    permission: [ROLE_SYSTEM.ADMIN],
    children: [
      {
        path: URL.MENU.USER,
        menuName: "Quản lý người dùng",
        component: QuanLyNguoiDung,
        permission: [ROLE_SYSTEM.ADMIN],
      },
      {
        path: URL.MENU.KHOI_PHUC_TAI_KHOAN,
        menuName: "Khôi phục tài khoản",
        component: KhoiPhucTaiKhoan,
        permission: [],
      },
      {
        path: URL.MENU.ROLE,
        menuName: "Vai trò",
        component: QuanLyVanBang,
        permission: "all",
      },
    ],
  }, {
    key: URL.MENU.QUAN_LY_VAN_BANG,
    menuName: "Văn Bằng",
    icon: renderIcon(<UserIcon />),
    permission: "all",
    children: [{
      path: URL.MENU.CERTIFICATE,
      menuName: "Quản lý Văn Bằng",
      component: Staff,
      permission: [ROLE_SYSTEM.ADMIN,ROLE_SYSTEM.STAFF],
    },
    {
      path: URL.MENU.USER,
      menuName: "Quản lý Văn Bằng",
      component: DepartmentStaff,
      permission: [ROLE_SYSTEM.ADMIN,ROLE_SYSTEM.DEPARTMENTSTAFF],
    },
    {
      path: URL.MENU.USER,
      menuName: "Quản lý Văn Bằng",
      component: Department,
      permission: [ROLE_SYSTEM.ADMIN,ROLE_SYSTEM.DEPARTMENT],
    },
    ],
  },
  {
    key: URL.MENU.DANH_MUC,
    menuName: "Danh mục",
    icon: renderIcon(<ListIcon />),
    permission: [
     

    ],
    children: [
      // {
      //   path: URL.MENU.QUAN_LY_TO_CHUC,
      //   menuName: "Quản lý đơn vị",
      //   component: QuanLyDonVi,
      //   permission: ROLE_SYSTEM.SYSTEM,
      // },
     
    ],
  },

  {
    path: URL.MENU.DU_LIEU_BO_SUNG,
    menuName: "Dữ liệu bổ sung",
    component: DuLieuBoSung,
    permission: [create(resources.EXTRA_DATA, actions.READ)],
    icon: renderIcon(<SettingIcon />),
    hide: true,
  },
  {
    path: URL.MENU.SETTING,
    menuName: "Cài đặt hệ thống",
    component: Setting,
    permission: [create(resources.CAI_DAT, actions.READ)],
    icon: renderIcon(<SettingIcon />),
  },

  // not render in menu
  MY_INFO_ROUTE,
  //Chỗ này ko hiện lên menu , thích điền gì thì điền
  // nếu có id thì có prefix id vào trc
  //ví dụ
  // {
  //   path: URL.THEM_MOI_GIAY_TO,
  //   breadcrumbName: "Thêm mới giấy tờ",
  //   component: ThemMoiThemMoiGiayTo,
  //   permission: [ROLE_SYSTEM.USER],
  // },

 
];

export function ConstantsRoutes() {
  return ADMIN_ROUTES;
}

