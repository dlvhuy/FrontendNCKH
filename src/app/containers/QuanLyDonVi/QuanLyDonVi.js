import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./QuanLyDonVi.scss";
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
import ThemMoiDonVi from "./ThemMoiDonVi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DialogDeleteConfim from "@components/DialogDeleteConfim/DialogDeleteConfim";
QuanLyDonVi.propTypes = {};

function QuanLyDonVi({ isLoading, myInfo, ...props }) {
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
    queryStr += `${search.type ? "&type={0}".format(search.type) : ""}`;
    // queryStr += `${search.active ? "&active={0}".format(search.active) : ""}`;
    const apiResponse = await getAllDonVi(page, limit, queryStr);
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
      name: "name",
      label: "Tên đơn vị",
      type: "text",
      operation: "like",
    },
    {
      type: "select",
      name: "type",
      label: "Loại đơn vị",
      options: SEARCH_ROLE_SYSTEM,
      key: "value",
      value: "name",
    },
  ];
  const onChangeTable = (page) => {
    setLimit(page.pageSize);
    setPage(page.current);
  };
  const ColumnDonVi = [
    {
      title: "STT",
      render: (v1, v2, value) => formatSTT(limit, page, value),
      key: "STT",
      align: "center",
      width: 60,
    },
    { title: "Tên đơn vị", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Điện thoại", dataIndex: "phone", key: "phone" },
    {
      title: "Loại đơn vị",
      key: "type",
      align: "center",
      render: (_, value) => {
        let type = "";
        if (value.type == ROLE_SYSTEM.SYSTEM) type = "Quản trị hệ thống";
        if (value.type == ROLE_SYSTEM.USER) type = "Người dùng";
        if (value.type == ROLE_SYSTEM.DEPARTMENT) type = "Sở tài nguyên và môi trưởng / UBND";
        return <span>{type}</span>;
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
            <Tooltip placement="left" title="Chỉnh sửa đơn vị" color="#FF811E">
              <Button
                icon={<EditOutlined />}
                size="small"
                type="primary"
                className="mr-1"
                style={{ backgroundColor: "#FF811E", borderColor: "#FF811E" }}
                onClick={() => handleEditDonVi(value)}
              ></Button>
            </Tooltip>
            {myInfo?.org?.name != value?.name && (
              <Tooltip placement="right" title="Xóa đơn vị" color="#FF0000">
                <Button
                  icon={<DeleteOutlined />}
                  type="danger"
                  style={{ backgroundColor: "#FF0000" }}
                  size="small"
                  className="mr-1"
                  onClick={() => showDialogXoa(value)}
                />
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];
  const handleThemMoiDonVi = () => {
    setDataDialog(null);
    showDialog();
  };
  const handleEditDonVi = (data) => {
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
      const response = await deleteOrg(dataXoa._id);
      if (response) {
        toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.ORG.REMOVE);
        cancelXoa();
        getDataFilter();
      }
    }
  };
  return (
    <>
      <BaseContent>
        <Loading active={isLoading}>
          <div className="QuanLyDonVi-container">
            <div className="QuanLyDonVi-header">
              <div className="QuanLyDonVi-title">Danh sách các đơn vị</div>
              <SearchBar
                dataSearch={dataSearch}
                onFilterChange={handleRefresh}
                buttonHeader={true}
                labelButtonHeader={"Thêm đơn vị"}
                handleBtnHeader={handleThemMoiDonVi}
              />
            </div>
            <div className="QuanLyDonVi-body">
              {data && !isLoading && (
                <Table
                  bordered
                  className="table"
                  showHeader={true}
                  columns={ColumnDonVi}
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
      <ThemMoiDonVi visible={visibleDialog} onCancel={closeDialog} data={dataDialog} reloadAPI={getDataFilter} />
      <DialogDeleteConfim visible={visibleXoa} onCancel={cancelXoa} onOK={handleRemove} />
    </>
  );
}
function mapStatetoProps(store) {
  const { isLoading } = store.app;
  const { myInfo } = store.user;
  return { isLoading, myInfo };
}
export default connect(mapStatetoProps)(QuanLyDonVi);

