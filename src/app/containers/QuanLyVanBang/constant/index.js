export const Column4Staff = [
        {
            title: "STT",
            render: (v1, v2, value) => formatSTT(limit, page, value),
            key: "STT",
            align: "center",
            width: 60,
        },
        { title: "Họ và tên", dataIndex: "name", key: "name" },
        { title: "Mã sinh viên", dataIndex: "studentID", key: "studentID" },
        { title: "Ngành đào tạo", dataIndex: "major", key: "major" },
        { title: "Xếp loại tốt nghiệp", dataIndex: "degreeClassification", key: "degreeClassification" },
        { title: "GPA(hệ số 4)", dataIndex: "gpaType4", key: "gpaType4" },
        { title: "Tổng tín chỉ", dataIndex: "totalCredit", key: "totalCredit" },
]
export const Column4DeparmentStaff = [...Column4Staff,
    { title: "Trạng thái duyệt", dataIndex: "approvalStatus", key: "approvalStatus" },
    { title: "Ngày duyệt", dataIndex: "approvalDate", key: "approvalDate" },
    { title: "Người duyệt", dataIndex: "approvalBy", key: "approvalBy" },
    { title: "Lý do từ chối", dataIndex: "rejectionReason", key: "rejectionReason" },]
export const Column4Deparment = [...Column4DeparmentStaff,
    { title: "Số Hiệu Bằng", dataIndex: "degreeId", key: "degreeId" },
    { title: "Ngày Cấp Bằng", dataIndex: "degreeIssueDate", key: "degreeIssueDate" },
    { title: "Người ký", dataIndex: "signBy", key: "signBy" },
]

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