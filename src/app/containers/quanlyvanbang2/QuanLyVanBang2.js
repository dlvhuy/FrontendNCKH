import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./QuanLyVanBang2.scss";
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
import ThemMoiNguoiDung from "./ThemMoiVanBang";
import { deleteUser, getAllUser } from "@app/services/NguoiDung";
import { AppproveDegree, deleteDegree, getAllDegree } from "@app/services/VanBang";
import ModalSign from "@components/ModalSign";
QuanLyVanBang.propTypes = {};

function QuanLyVanBang({ isLoading, ...props }) {
  const history = useHistory();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [data, setData] = useState(null);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState(null);
  const [visibleSign, setVisibleSign] = useState(false);
  const [visibleApprove, setVisibleApprove] = useState(false);
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
    queryStr += `${search.approvalStatus ? "&approvalStatus[like]={0}".format(search.approvalStatus) : ""}`;
    queryStr += `${search.approvalDate ? "&approvalDate[like]={0}".format(search.approvalDate) : ""}`;
    queryStr += `${search.approvalBy ? "&approvalBy[like]={0}".format(search.approvalBy) : ""}`;
    queryStr += `${search.degreeIssueDate ? "&degreeIssueDate={0}".format(search.degreeIssueDate) : ""}`;
    // queryStr += `${search.active ? "&active={0}".format(search.active) : ""}`;
    const apiResponse = await getAllDegree(page, limit, queryStr);
    if (apiResponse) {
      const dataRes = apiResponse.data.docs;
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
   const handleSign = async () => {
      if (dataDialog) {
        const response = await SignDegree(dataDialog._id);
        if (response) {
          toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.DEGREE.SIGN);
          cancelSign();
          getDataFilter();
        }
      }
    };
    const handleApprove = async () => {
      if (dataDialog) {
        const response = await AppproveDegree(dataDialog._id);
        if (response) {
          toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.DEGREE.APPROVE);
          cancelApprove();
          getDataFilter();
        }
      }
    };
  const dataSearch = [
    {
      name: "approvalStatus",
      label: "Trạng thái xet duyệt",
      type: "text",
    },
    {
      name: "approvalDate",
      label: "ngày xét duyệt",
      type: "text",
      operate: "like",
    },
    {
      name: "approvalBy",
      label: "Người xét duyệt",
      type: "text",
    },
    {
      name: "rejectionReason",
      label: "Lý do từ chối",
      type: "text",
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
    { title: "Tên sinh viên", dataIndex: ["studentId", "name"], key: "studentId.name" },
    { title: "Chuyên ngành", dataIndex: ["studentId", "major"], key: "major" },
    { title: "Phân loại", dataIndex: ["studentId", "degreeClassification"], key: "degreeClassification" },
    { title: "Điểm gpa 4", dataIndex: ["studentId", "gpaType4"], key: "gpaType4" },
    { title: "Trạng thái", dataIndex: ["studentId", "status"], key: "status" },
    { title: "Trạng thái Duyệt", dataIndex: "approvalStatus", key: "approvalStatus" },
    { title: "Ngày duyệt", dataIndex: "approvalDate", key: "approvalDate" },
    { title: "Người duyệt", dataIndex: "approvalBy", key: "approvalBy" },
   
    {
      title: "Tác vụ",
      key: "action",
      align: "center",
      width: 100,
      render: (_, value) => {
        return (
          <div className="action-dv">
            <Tooltip placement="left" title="Xét duyệt văn bằng" color="#FF811E">
              <Button
                icon={<EditOutlined />}
                size="small"
                type="primary"
                className="mr-1"
                style={{ backgroundColor: "#FF811E", borderColor: "#FF811E" }}
                onClick={() => showDialogApprove(value)}
              ></Button>
            </Tooltip>
            <Tooltip placement="right" title="Ký văn bằng" color="#FF0000">
              <Button
                icon={<DeleteOutlined />}
                type="danger"
                style={{ backgroundColor: "#FF0000" }}
                size="small"
                className="mr-1"
                onClick={() => showDialogSign(value)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
 
  const showDialogSign = (data) => {
    setDataDialog(data);
    setVisibleSign(true);
  };
  const cancelSign = () => {
    setDataXoa(null);
    setVisibleSign(false);
  };
  const showDialogApprove = (data) => {
    setDataDialog(data);
    setVisibleApprove(true);
  };
  const cancelApprove = () => {
    setDataXoa(null);
    setVisibleApprove(false);
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
      <ModalSign visible={visibleApprove} onCancel={cancelApprove}  isApprove={true} data={dataDialog} onOK={handleApprove}/>
      <ModalSign visible={visibleSign} onCancel={cancelSign} isApprove={false} data={dataDialog} onOK={handleSign}/>
    </>
  );
}
function mapStatetoProps(store) {
  const { isLoading } = store.app;
  return { isLoading };
}
export default connect(mapStatetoProps)(QuanLyVanBang);

