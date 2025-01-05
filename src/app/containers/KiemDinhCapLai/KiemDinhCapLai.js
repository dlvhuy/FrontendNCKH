import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./KiemDinhCapLai.scss";
import BaseContent from "@components/BaseContent";
import { connect } from "react-redux";
import Loading from "@components/Loading";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { URL } from "@url";
import SearchBar from "@containers/SearchBar";
import { formatSTT, getChangeFormSearch } from "@app/common/functionCommons";
import queryString, { stringify } from "query-string";
import {  getTableReCertificateDepartment } from "@app/services/CapLaiGiayTo";
import {  PAGINATION_CONFIG, VI_STATUS_THAM_DINH_DEPARTMENT } from "@constants";
import { Button, Table } from "antd";
import VisibleIcon from "@components/Icons/VisibleIcon";
KiemDinhCapLai.propTypes = {};

function KiemDinhCapLai({isLoading}) {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalDocs, setTotalDocs] = useState(0);
  const [data, setData] = useState(null);
  useEffect(() => {
    getDataFilter();
  }, [location.search]);
  useEffect(() => {
    handleRefresh({}, true);
  }, [page, limit]);
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
  const getDataFilter = async () => {
    const search = queryString.parse(location.search);
    let queryStr = "";
    queryStr += `${search.magiayto ? "&magiayto={0}".format(search.magiayto) : ""}`;
    queryStr += `${search.tennguoisudung ? "&tennguoisudung[like]={0}".format(search.tennguoisudung) : ""}`;
    const apiResponse = await getTableReCertificateDepartment(page, limit, queryStr);
    if (apiResponse) {
      const dataRes = apiResponse.docs;
      setData(dataRes);
      setLimit(apiResponse.limit);
      setPage(apiResponse.page);
      setTotalDocs(apiResponse.totalDocs);
    }
  };
  const dataSearch = [
    {
      name: "magiayto",
      label: "Mã khu đất",
      type: "text",
    },
    {
      name: "tennguoisudung",
      label: "Tên người sử dụng",
      type: "text",
      operation: "like",
    },
  ];
  const ColumnCapLai = [
    {
      title: "STT",
      render: (v1, v2, value) => formatSTT(limit, page, value),
      key: "STT",
      align: "center",
      width: 60,
    },
    { title: "Mã khu đất", dataIndex: "magiayto", key: "magiayto" },
    { title: "Tên người sử dụng đất", dataIndex: "tennguoisudung", key: "tennguoisudung" },
    {
      title: "Trạng thái",
      key: "status",
      align: "center",
      width: 170,
      render: (_, value) => {
        return (
          <div className={`action_dv color-status-${value.status}`}>
            <span>{VI_STATUS_THAM_DINH_DEPARTMENT[value.status]}</span>
          </div>
        );
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
            <Button
              icon={<VisibleIcon />}
              style={{ border: 0 }}
              onClick={() => {
                history.push(URL.CHI_TIET_CAP_LAI_ID.format(value._id));
              }}
            ></Button>
          </div>
        );
      },
    },
  ];
  const onChangeTable = (page) => {
    setLimit(page.pageSize);
    setPage(page.current);
  };
  return (
    <div>
      <Loading active={isLoading}>
        <BaseContent>
          <div className="TrangChuCapLai-container">
            <div className="header">
              <span>Thẩm định đơn cấp lại</span>
            </div>
            <div className="searchBar">
              <SearchBar
                dataSearch={dataSearch}
                onFilterChange={handleRefresh}
                
              />
            </div>
            {!isLoading && (
              <Table
                bordered
                className="table"
                showHeader={true}
                columns={ColumnCapLai}
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
        </BaseContent>
      </Loading>
    </div>
  );
}
function mapStateToProps(store) {
  const { isLoading } = store.app;
  return { isLoading };
}
export default connect(mapStateToProps)(KiemDinhCapLai);
