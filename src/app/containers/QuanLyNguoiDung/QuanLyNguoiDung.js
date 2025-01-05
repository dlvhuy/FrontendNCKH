import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./QuanLyNguoiDung.scss";
import BaseContent from "@components/BaseContent";
import { connect } from "react-redux";
import Loading from "@components/Loading";
import SearchBar from "@containers/SearchBar";
import { formatSTT, getChangeFormSearch, toast } from "@app/common/functionCommons";
import queryString, { stringify } from "query-string";
import { deleteOrg, getAllDonVi } from "@app/services/DonVi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CONSTANTS, PAGINATION_CONFIG, ROLE_SYSTEM, SEARCH_ROLE_SYSTEM, TOAST_MESSAGE } from "@constants";
import { Button, Table, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DialogDeleteConfim from "@components/DialogDeleteConfim/DialogDeleteConfim";
import ThemMoiNguoiDung from "./ThemMoiNguoiDung";
import { deleteUser, getAllUser } from "@app/services/NguoiDung";
QuanLyNguoiDung.propTypes = {};

function QuanLyNguoiDung({ isLoading, ...props }) {
  const history = useHistory();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [data, setData] = useState(null);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState(null);
  const [visibleXoa, setVisibleXoa] = useState(false);
  const [dataXoa, setDataXoa] = useState(null);
  const [dataOrg, setDataOrg] = useState([]);
  useEffect(() => {
    getDataFilter();
  }, [location.search]);
  useEffect(() => {
    handleRefresh({}, true);
  }, [page, limit]);
  const getDataFilter = async () => {
    const search = queryString.parse(location.search);
    let queryStr = "";
    queryStr += `${search.username ? "&username[like]={0}".format(search.username) : ""}`;
    queryStr += `${search.name ? "&name[like]={0}".format(search.name) : ""}`;
    queryStr += `${search.phone ? "&phone[like]={0}".format(search.phone) : ""}`;
    queryStr += `${search.org ? "&org={0}".format(search.org) : ""}`;
    // queryStr += `${search.active ? "&active={0}".format(search.active) : ""}`;
    const getOrg = await getAllDonVi(1, 0, "");
    if (getOrg) {
      const options = getOrg?.docs?.map((value) => {
        return {
          value: value._id,
          label: value.name,
          type: value.type,
          id: value._id,
        };
      });
      setDataOrg(options);
    }
    const apiResponse = await getAllUser(page, limit, queryStr);
    if (apiResponse) {
      const dataRes = apiResponse.docs;
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
      name: "username",
      label: "Tên tài khoản",
      type: "text",
    },
    {
      name: "name",
      label: "Tên người dùng",
      type: "text",
      operate: "like",
    },
    {
      name: "phone",
      label: "Số điện thoại",
      type: "text",
    },
    {
      type: "select",
      name: "org",
      label: "Tên tổ chức",
      options: dataOrg,
      key: "value",
      value: "label",
    },
  ];
  const onChangeTable = (page) => {
    setLimit(page.pageSize);
    setPage(page.current);
  };
  const ColumnNguoiDung = [
    {
      title: "STT",
      render: (v1, v2, value) => formatSTT(limit, page, value),
      key: "STT",
      align: "center",
      width: 60,
    },
    { title: "Tên tài khoản", dataIndex: "username", key: "username" },
    { title: "Tên người dùng", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Điện thoại", dataIndex: "phone", key: "phone" },
    {
      title: "Tổ chức",
      key: "type",
      align: "center",
      render: (_, value) => {
        return <span>{value?.org?.name}</span>;
      },
    },
    {
      title: "Tác vụ",
      key: "action",
      align: "center",
      width: 100,
      render: (_, value) => {
        return (
          <div className="action-dv">
            <Tooltip placement="left" title="Chỉnh sửa người dùng" color="#FF811E">
              <Button
                icon={<EditOutlined />}
                size="small"
                type="primary"
                className="mr-1"
                style={{ backgroundColor: "#FF811E", borderColor: "#FF811E" }}
                onClick={() => handleEditNguoiDung(value)}
              ></Button>
            </Tooltip>
            <Tooltip placement="right" title="Xóa Người dùng" color="#FF0000">
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
  const handleThemMoiNguoiDung = () => {
    setDataDialog(null);
    showDialog();
  };
  const handleEditNguoiDung = (data) => {
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
      const response = await deleteUser(dataXoa._id);
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
                handleBtnHeader={handleThemMoiNguoiDung}
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
      <ThemMoiNguoiDung
        visible={visibleDialog}
        onCancel={closeDialog}
        data={dataDialog}
        reloadAPI={getDataFilter}
        orgType={dataOrg}
      />
      <DialogDeleteConfim visible={visibleXoa} onCancel={cancelXoa} onOK={handleRemove} />
    </>
  );
}
function mapStatetoProps(store) {
  const { isLoading } = store.app;
  return { isLoading };
}
export default connect(mapStatetoProps)(QuanLyNguoiDung);

