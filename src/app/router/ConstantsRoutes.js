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
const PortalThemMoiGiayTo = lazy(() => import("@containers/QuanLyCapMoi/TrangChu/QuanLyGiayToPortal"));
const ThemMoiThemMoiGiayTo = lazy(() => import("@containers/QuanLyCapMoi/ThemMoi/ThemMoiThemMoiGiayTo"));
const CapLaiGiayTo = lazy(() => import("@containers/QuanLyChuyenNhuong/ThemMoiChuyenNhuong/ThemMoiChuyenNhuong"));
const PortalCapLai = lazy(() => import("@containers/QuanLyChuyenNhuong/QuanLyChuyenNhuong/QuanLyChuyenNhuong"));
const QLCapLai = lazy(() => import("@containers/QuanLyCapLai/TrangChu/TrangChuCapLai"));
const ThemMoiCapLai = lazy(() => import("@containers/QuanLyCapLai/ThemMoi/ThemMoiCapLai"));
const KiemDinhCapMoi = lazy(() => import("@containers/KiemDinhCapMoi/KiemDinhCapMoi"));
const KiemDinhCapLai = lazy(() => import("@containers/KiemDinhCapLai/KiemDinhCapLai"));
const KiemDinhChuyenNhuong = lazy(() => import("@containers/KiemDinhChuyenNhuong/KiemDinhChuyenNhuong"));
const TruyXuatGiayTo = lazy(() => import("@containers/TruyXuatGiayTo/TruyXuatGiayTo"));
const ChiTietCapMoi = lazy(() => import("@containers/ChiTietKiemDinhCapMoi/ChiTietCapMoi"));
const ChiTietCapLai = lazy(() => import("@containers/ChiTietKiemDinhCapLai/ChiTietCapLai"));
const ChiTietChuyenNhuongKiemDinh = lazy(() => import("@containers/ChiTietKiemDinhChuyenNhuong/KiemDinhChuyenNhuong"));
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
    path: URL.MENU.TRUY_XUAT_GIAY_TO,
    menuName: "Truy xuất khu đất",
    component: TruyXuatGiayTo,
    icon: renderIcon(<SearchIcon />),
    permission: "all",
  },
  {
    key: URL.MENU.QUAN_LY_NGUOI_DUNG,
    menuName: "Người dùng",
    icon: renderIcon(<UserIcon />),
    permission: [ROLE_SYSTEM.SYSTEM],
    children: [
      {
        path: URL.MENU.USER,
        menuName: "Quản lý người dùng",
        component: QuanLyNguoiDung,
        permission: [ROLE_SYSTEM.SYSTEM],
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
        component: Role,
        permission: [],
      },
    ],
  },
  {
    key: URL.MENU.DANH_MUC,
    menuName: "Danh mục",
    icon: renderIcon(<ListIcon />),
    permission: [
      ROLE_SYSTEM.USER,
      ROLE_SYSTEM.DEPARTMENT,
      ROLE_SYSTEM.LANDOFFICER,
      ROLE_SYSTEM.LANDREGISTRATION,
      ROLE_SYSTEM.PRESIDENTWARD,
      ROLE_SYSTEM.VICEPRESIDENTCITY,

    ],
    children: [
      // {
      //   path: URL.MENU.QUAN_LY_TO_CHUC,
      //   menuName: "Quản lý đơn vị",
      //   component: QuanLyDonVi,
      //   permission: ROLE_SYSTEM.SYSTEM,
      // },
      {
        path: URL.MENU.QUAN_LY_THEM_MOI,
        menuName: "Quản lý yêu cầu cấp mới",
        component: PortalThemMoiGiayTo,
        permission: [
          ROLE_SYSTEM.DEPARTMENT,
          ROLE_SYSTEM.LANDOFFICER,
          ROLE_SYSTEM.USER,
          ROLE_SYSTEM.LANDREGISTRATION,
          ROLE_SYSTEM.PRESIDENTWARD,
        ],
      },
      {
        path: URL.MENU.QUAN_LY_CHUYEN_NHUONG,
        menuName: "Quản lý đơn chuyển nhượng",
        component: PortalCapLai,
        permission: [
          ROLE_SYSTEM.DEPARTMENT,
          ROLE_SYSTEM.LANDOFFICER,
          ROLE_SYSTEM.USER,
          ROLE_SYSTEM.LANDREGISTRATION,
          ROLE_SYSTEM.PRESIDENTWARD,
        ],
      },
      {
        path: URL.MENU.QUAN_LY_CAP_LAI,
        menuName: "Quản lý cấp lại",
        component: QLCapLai,
        permission: [
          ROLE_SYSTEM.DEPARTMENT,
          ROLE_SYSTEM.LANDOFFICER,
          ROLE_SYSTEM.USER,
          ROLE_SYSTEM.LANDREGISTRATION,
          ROLE_SYSTEM.PRESIDENTWARD,
        ],
      },
      {
        path: URL.MENU.KIEM_DINH_CAP_MOI,
        menuName: "Thẩm định cấp mới",
        component: KiemDinhCapMoi,
        permission: ROLE_SYSTEM.VICEPRESIDENTCITY,
      },
      {
        path: URL.MENU.KIEM_DINH_CAP_LAI,
        menuName: "Thẩm định cấp lại",
        component: KiemDinhCapLai,
        permission: ROLE_SYSTEM.VICEPRESIDENTCITY,
      },
      {
        path: URL.MENU.KIEM_DINH_CHUYEN_NHUONG,
        menuName: "Thẩm định chuyển nhượng",
        component: KiemDinhChuyenNhuong,
        permission: ROLE_SYSTEM.VICEPRESIDENTCITY,
      },
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
  {
    path: URL.THEM_MOI_GIAY_TO,
    breadcrumbName: "Thêm mới giấy tờ",
    component: ThemMoiThemMoiGiayTo,
    permission: [ROLE_SYSTEM.USER],
  },
  {
    path: URL.THEM_MOI_GIAY_TO_ID.format(":id"),
    breadcrumbName: "Chi tiết giấy tờ",
    component: ThemMoiThemMoiGiayTo,
    permission: [
      ROLE_SYSTEM.DEPARTMENT,
      ROLE_SYSTEM.LANDOFFICER,
      ROLE_SYSTEM.USER,
      ROLE_SYSTEM.LANDREGISTRATION,
      ROLE_SYSTEM.PRESIDENTWARD,
    ],
  },
  {
    path: URL.MENU.THEM_MOI_CHUYEN_NHUONG,
    breadcrumbName: "Thêm mới đơn chuyển nhượng",
    component: CapLaiGiayTo,
    permission: [ROLE_SYSTEM.USER],
  },
  {
    path: URL.THEM_MOI_CHUYEN_NHUONG_ID.format(":id"),
    breadcrumbName: "Chi tiết đơn chuyển nhượng",
    component: CapLaiGiayTo,
    permission: [
      ROLE_SYSTEM.DEPARTMENT,
      ROLE_SYSTEM.LANDOFFICER,
      ROLE_SYSTEM.USER,
      ROLE_SYSTEM.LANDREGISTRATION,
      ROLE_SYSTEM.PRESIDENTWARD,
    ],
  },
  {
    path: URL.THEM_MOI_CAP_LAI,
    breadcrumbName: "Thêm mới cấp lại",
    component: ThemMoiCapLai,
    permission: [ROLE_SYSTEM.USER],
  },
  {
    path: URL.THEM_MOI_CAP_LAI_ID.format(":id"),
    breadcrumbName: "Chi tiết đơn cấp lại",
    component: ThemMoiCapLai,
    permission: [
      ROLE_SYSTEM.DEPARTMENT,
      ROLE_SYSTEM.LANDOFFICER,
      ROLE_SYSTEM.USER,
      ROLE_SYSTEM.LANDREGISTRATION,
      ROLE_SYSTEM.PRESIDENTWARD,
    ],
  },
  {
    path: URL.TRUY_XUAT_GIAY_TO_ID.format(":id"),
    breadcrumbName: "Truy xuất khu đất",
    component: TruyXuatGiayTo,
    permission: "all",
  },
  {
    path: URL.CHI_TIET_CAP_MOI_ID.format(":id"),
    breadcrumbName: "Chi tiết cấp mới",
    component: ChiTietCapMoi,
    permission: ROLE_SYSTEM.VICEPRESIDENTCITY,
  },
  {
    path: URL.CHI_TIET_CAP_LAI_ID.format(":id"),
    breadcrumbName: "Chi tiết cấp lại",
    component: ChiTietCapLai,
    permission: ROLE_SYSTEM.VICEPRESIDENTCITY,
  },
  {
    path: URL.THAM_DINH_CHUYEN_NHUONG_ID.format(":id"),
    breadcrumbName: "Chi tiết đơn chuyển nhượng",
    component: ChiTietChuyenNhuongKiemDinh,
    permission: ROLE_SYSTEM.VICEPRESIDENTCITY,
  },
];

export function ConstantsRoutes() {
  return ADMIN_ROUTES;
}

