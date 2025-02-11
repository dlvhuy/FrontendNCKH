import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./QuanLyVanBang.scss";
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
import ThemMoiVanBang from "./ThemMoiVanBang";
import { deleteUser, getAllUser } from "@app/services/NguoiDung";
import { deleteDegree, getAllDegree } from "@app/services/VanBang";
QuanLyVanBang.propTypes = {};

function QuanLyVanBang({ isLoading, ...props }) {
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
        queryStr += `${search.degreeId ? "&degreeId={0}".format(search.degreeId) : ""}`;
        queryStr += `${search.name ? "&name[like]={0}".format(search.name) : ""}`;
        queryStr += `${search.studentID ? "&studentID={0}".format(search.studentID) : ""}`;
        queryStr += `${search.org ? "&major={0}".format(search.major) : ""}`;
        // queryStr += `${search.active ? "&active={0}".format(search.active) : ""}`;
        const apiResponse = await getAllDegree(page, limit, queryStr);
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
            name: "degreeId",
            label: "Số hiệu bằng",
            type: "text",
        },
        {
            name: "name",
            label: "Họ và tên",
            type: "text",
            //   operate: "like",
        },
        {
            name: "studentID",
            label: "Mã sinh viên",
            type: "text",
        },
        {
            name: "major",
            label: "Ngành học",
            type: "text",
        },
    ];
    const onChangeTable = (page) => {
        setLimit(page.pageSize);
        setPage(page.current);
    };
    const ColumnVanBang = [
        {
            title: "STT",
            render: (v1, v2, value) => formatSTT(limit, page, value),
            key: "STT",
            align: "center",
            width: 60,
        },
        { title: "Số Hiệu Bằng", dataIndex: "degreeId", key: "degreeId" },
        { title: "Họ và tên", dataIndex: "name", key: "name" },
        { title: "Mã sinh viên", dataIndex: "studentID", key: "studentID" },
        { title: "Ngành đào tạo", dataIndex: "major", key: "major" },
        { title: "Xếp loại tốt nghiệp", dataIndex: "degreeClassification", key: "degreeClassification" },
        { title: "GPA(hệ số 4)", dataIndex: "gpaType4", key: "gpaType4" },
        { title: "Tổng tín chỉ", dataIndex: "totalCredit", key: "totalCredit" },
        {
            title: "Tác vụ",
            key: "action",
            align: "center",
            width: 100,
            render: (_, value) => {
                return (
                    <div className="action-dv">
                        <Tooltip placement="left" title="Chỉnh sửa văn bằng" color="#FF811E">
                            <Button
                                icon={<EditOutlined />}
                                size="small"
                                type="primary"
                                className="mr-1"
                                style={{ backgroundColor: "#FF811E", borderColor: "#FF811E" }}
                                onClick={() => handleEditVanBang(value)}
                            ></Button>
                        </Tooltip>
                        <Tooltip placement="right" title="Xóa văn bằng" color="#FF0000">
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
    const handleThemMoiVanBang = () => {
        setDataDialog(null);
        showDialog();
    };
    const handleEditVanBang = (data) => {
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
            const response = await deleteDegree(dataXoa._id);
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
                    <div className="QuanLyVanBang-container">
                        <div className="QuanLyVanBang-header">
                            <div className="QuanLyVanBang-title">Danh sách người dùng</div>
                            <SearchBar
                                dataSearch={dataSearch}
                                onFilterChange={handleRefresh}
                                buttonHeader={true}
                                labelButtonHeader={"Thêm văn bằng"}
                                handleBtnHeader={handleThemMoiVanBang}
                            />
                        </div>
                        <div className="QuanLyVanBang-body">
                            {data && !isLoading && (
                                <Table
                                    bordered
                                    className="table"
                                    showHeader={true}
                                    columns={ColumnVanBang}
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
            <ThemMoiVanBang
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
export default connect(mapStatetoProps)(QuanLyVanBang);

