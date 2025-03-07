export const dataSearch = [
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

export const ColumnDegree4Staff = [
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
    { title: "Tổng tín chỉ", dataIndex: "totalCredit", key: "totalCredit" }]

export const ColumnDegree4DepartmentStaff = [
    ...ColumnDegree4Staff,
    { title: "Ngày xét duyệt", dataIndex: "approvalDate", key: "approvalDate" },
    { title: "Người xét duyệt", dataIndex: "approvedBy", key: "approvedBy" },
    { title: "Trạng thái xét duyệt", dataIndex: "approvalStatus", key: "approvalStatus" },
    { title: "Lý do từ chối", dataIndex: "rejectionReason", key: "rejectionReason" },
]
export const ColumnDegree4Department = [
    ...ColumnDegree4DepartmentStaff,
    { title: "Số Hiệu Bằng", dataIndex: "degreeSerialNumber", key: "gpaType4" },
    { title: "Trạng thái đóng dấu", dataIndex: "sealStatus", key: "gpaType4" },
    { title: "Người ký", dataIndex: "signedBy", key: "gpaType4" },
    { title: "Trạng thái bằng)", dataIndex: "degreeStatus", key: "gpaType4" },
]
