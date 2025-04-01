import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./QuanLySinhVien.scss";
import BaseContent from "@components/BaseContent";
import { connect } from "react-redux";
import Loading from "@components/Loading";
import SearchBar from "@containers/SearchBar";
import { formatSTT, getChangeFormSearch, toast } from "@app/common/functionCommons";
import queryString, { stringify } from "query-string";
import { deleteOrg, getAllDonVi } from "@app/services/DonVi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CONSTANTS, Education_SYSTEM, Education_SYSTEM2, GRADUATION_CLASSIFICATION, GRADUATION_CLASSIFICATION_KEY, PAGINATION_CONFIG, ROLE_SYSTEM, SEARCH_ROLE_SYSTEM, TOAST_MESSAGE, UNIVERSITY_MAJOR_SYSTEM } from "@constants";
import { Button, Table, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DialogDeleteConfim from "@components/DialogDeleteConfim/DialogDeleteConfim";
import ThemMoiNguoiDung from "./ThemMoiSinhVien";
import { deleteUser, getAllUser } from "@app/services/NguoiDung";
import { deleteStudent, getAllStudent } from "@app/services/SinhVien";
import ThemMoiSinhVien from "./ThemMoiSinhVien";
import { options } from "less";
QuanLySinhVien.propTypes = {};

function QuanLySinhVien({ isLoading, ...props }) {
  const history = useHistory();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [data, setData] = useState(null);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState(null);
  const [visibleXoa, setVisibleXoa] = useState(false);
  const [dataXoa, setDataXoa] = useState(null);
  useEffect(() => {
    getDataFilter();
  }, [location.search]);
  useEffect(() => {
    handleRefresh({}, true);
  }, [page, limit]);
  const getDataFilter = async () => {
    const search = queryString.parse(location.search);
    let queryStr = "";
    queryStr += `${search.name ? "&name[like]={0}".format(search.name) : ""}`;
    queryStr += `${search.major ? "&major[like]={0}".format(search.major) : ""}`;
    queryStr += `${search.degreeClassification ? "&degreeClassification[like]={0}".format(search.degreeClassification) : ""}`;
    queryStr += `${search.gpaType4 ? "&gpaType4[like]={0}".format(search.gpaType4) : ""}`;
    queryStr += `${search.birthDate ? "&birthDate[like]={0}".format(search.birthDate) : ""}`;
    queryStr += `${search.status ? "&status[like]={0}".format(search.status) : ""}`;
    // queryStr += `${search.active ? "&active={0}".format(search.active) : ""}`;
    const apiResponse = await getAllStudent(page, limit, queryStr);
    if (apiResponse) {
      const dataRes = apiResponse.data.docs;
      console.log(dataRes)
      setData(dataRes);
      setLimit(apiResponse.limit);
      setPage(apiResponse.page);
      setTotalDocs(apiResponse.totalDocs);
    }
  };
  const handleRefresh = (newQuery, changeTable) => {
    const { pathname } = location;
    let objFilterTable = { page, limit };
    if (changeTable) {
      newQuery = queryString.parse(location.search);
      delete newQuery.page;
      delete newQuery.limit;
    }
    if (getChangeFormSearch(newQuery, queryString.parse(location.search))) {
      objFilterTable.page = 1;
    }
    newQuery = Object.assign(objFilterTable, newQuery);
    history.push({ pathname, search: stringify({ ...newQuery }, { arrayFormat: "repeat" }) });
  };
  const showDialog = () => {
    setVisibleDialog(true);
  };
  const closeDialog = () => {
    setDataDialog(null);
    setVisibleDialog(false);
  };
  const dataSearch = [
    {
      name: "name",
      label: "Tên người dùng",
      type: "text",
      operate: "like",
    },
    {
      name: "major",
      label: "Chuyên ngành",
      type: "select",
      options: UNIVERSITY_MAJOR_SYSTEM,
      key: "value",
      value: "name",
    },
    {
      name: "degreeClassification",
      label: "phân loại",
      type: "select",
      options: GRADUATION_CLASSIFICATION,
      key: "value",
      value: "name",
    },
    {
      name: "gpaType4",
      label: "điểm gpa",
      type: "text",
    },
    {
      name: "status",
      label: "Trạng thái",
      type: "text",
    },
  ];
  const onChangeTable = (page) => {
    setLimit(page.pageSize);
    setPage(page.current);
  };
  const ColumnNguoiDung = [
    { title: "Tên sinh viên", dataIndex: "name", key: "name" },
    { title: "Mã sinh viên", dataIndex: "_id", key: "_id" },
    { title: "Chuyên ngành", dataIndex: "major", key: "major" },
    { title: "Phân loại", dataIndex: "degreeClassification", key: "degreeClassification" },
    { title: "Điểm gpa 4", dataIndex: "gpaType4", key: "gpaType4" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    { title: "Ngày sinh", dataIndex: "birthDate", key: "birthDate" },
    {
      title: "Tác vụ",
      key: "action",
      align: "center",
      width: 100,
      render: (_, value) => {
        return (
          <div className="action-dv">
            <Tooltip placement="left" title="Chỉnh sửa sinh viên" color="#FF811E">
              <Button
                icon={<EditOutlined />}
                size="small"
                type="primary"
                className="mr-1"
                style={{ backgroundColor: "#FF811E", borderColor: "#FF811E" }}
                onClick={() => handleEditSinhVien(value)}
              ></Button>
            </Tooltip>

            <Tooltip placement="right" title="Xóa sinh viên" color="#FF0000">
              <Button
                icon={<DeleteOutlined />}
                type="danger"
                style={{ backgroundColor: "#FF0000" }}
                size="small"
                className="mr-1"
                onClick={() => showDialogXoa(value)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const handleThemMoiSinhVien = () => {
    setDataDialog(null);
    showDialog();
  };
  const handleEditSinhVien = (data) => {
    setDataDialog(data);
    showDialog();
  };
  const showDialogXoa = (data) => {
    setDataXoa(data);
    setVisibleXoa(true);
  };
  const cancelXoa = () => {
    setDataXoa(null);
    setVisibleXoa(false);
  };
  const handleRemove = async () => {
    if (dataXoa) {
      const response = await deleteStudent(dataXoa._id);
      if (response) {
        toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.USER.REMOVE);
        cancelXoa();
        getDataFilter();
      }
    }
  };
  return (
    <>
      <BaseContent>
        <Loading active={isLoading}>
          <div className="QuanLyNguoiDung-container">
            <div className="QuanLyNguoiDung-header">
              <div className="QuanLyNguoiDung-title">Danh sách người dùng</div>
              <SearchBar
                dataSearch={dataSearch}
                onFilterChange={handleRefresh}
                buttonHeader={true}
                labelButtonHeader={"Thêm người dùng"}
                handleBtnHeader={handleThemMoiSinhVien}
              />
            </div>
            <div className="QuanLyNguoiDung-body">
              {data && !isLoading && (
                <Table
                  bordered
                  className="table"
                  showHeader={true}
                  columns={ColumnNguoiDung}
                  dataSource={data}
                  scroll={{ x: 900 }}
                  pagination={{
                    ...PAGINATION_CONFIG,
                    current: page,
                    pageSize: limit,
                    total: totalDocs,
                  }}
                  onChange={onChangeTable}
                />
              )}
            </div>
          </div>
        </Loading>
      </BaseContent>
      <ThemMoiSinhVien
        visible={visibleDialog}
        onCancel={closeDialog}
        data={dataDialog} 
        reloadAPI={getDataFilter}
      />
      <DialogDeleteConfim visible={visibleXoa} onCancel={cancelXoa} onOK={handleRemove} />
    </>
  );
}
function mapStatetoProps(store) {
  const { isLoading } = store.app;
  return { isLoading };
}
export default connect(mapStatetoProps)(QuanLySinhVien);

