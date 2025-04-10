
import React, { useEffect, useState } from "react";
import "./SearchDegree.scss"
import AuthBase from "@containers/Authenticator/AuthBase";
import { Button, Form, Input } from "antd";
import { getDegree, getDegreeXacnhan } from "@app/services/VanBang";
import { connect } from "react-redux";
import { valueToMajor, valueToNameClassification } from "@app/common/dataConverter";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { URL } from "@url";



function SearchDegree({ isLoading }) {
    const [form] = Form.useForm();
    const [data, setData] = useState(null);

    async function handleGetDegree() {
        try {
            const values = form.getFieldsValue(); // Lấy dữ liệu từ form
            console.log("hehe ", values)
            const response = await getDegree(values);
            setData(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    }

    async function handleGetDegreeXacMinh(id) {
        try { // Lấy dữ liệu từ form
            const response = await getDegreeXacnhan(id);
            console.log(response)
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    }

    useEffect(() => {
    }, [data]);

    return (
        <AuthBase>
            
            <div className="login-container">
                <div className="login-right">
                    <span className="text-welcome">TRA CỨU VĂN BẰNG CHỨNG CHỈ</span>
                    <Form layout={"vertical"} className="form-center" size="large" form={form} onFinish={handleGetDegree}>
                        <Form.Item name="username" rules={[{ required: true, message: "Tên sinh viên không được để trống" }]}>
                            <Input placeholder="Vui lòng nhập tên sinh viên" className="txt_input" />
                        </Form.Item>
                        <Form.Item name="birthDate" rules={[{ required: true, message: "Ngày sinh không được để trống" }]}>
                            <Input placeholder="Vui lòng nhập ngày sinh dạng DD/MM/YYYY" className="txt_input" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" className="btn_signin">
                            Tra cứu
                        </Button>
                    </Form>
                    <Link to={URL.LOGIN} className="link">Đăng nhập</Link>
                    
                </div>
            </div>
            {data &&
                <div className="login-container2">
                    <div className="login-right">
                        <span className="text-welcome">VĂN BẰNG </span>
                    </div>
                    <div className="info-container">
                        <div className="container">
                       
                            <div className="text-info">
                                <span className="text-label">Tên sinh viên: </span>
                                <span className="text-data">{data.student.name}</span>
                            </div>
                            <div className="text-info">
                                <span className="text-label">Điểm gpa: </span>
                                <span className="text-data">{data.student.gpaType4}</span>
                            </div>
                            <div className="text-info">
                                <span className="text-label">Chuyên ngành: </span>
                                <span className="text-data">{valueToMajor(data.student.major).name}</span>
                            </div>
                            <div className="text-info">
                                <span className="text-label">Xếp loại: </span>
                                <span className="text-data">{valueToNameClassification(data.student.degreeClassification).name}</span>
                            </div>
                        </div>
                        <div className="container">
                            <div className="text-info">
                                <span className="text-label">Trạng thái văn bằng: </span>
                                <span className="text-data">{data.degree.approvalStatus}</span>
                            </div>
                        </div>
                        <Button onClick={() => handleGetDegreeXacMinh(data.degree._id)}></Button>
                    </div>
                </div>
            }
        </AuthBase >

    )
}

function mapStateToProps(store) {
    const { isLoading } = store.app;
    return { isLoading };
}

export default connect(mapStateToProps)(SearchDegree);
