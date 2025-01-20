import React from "react";
import { Button, Form, Input, Row } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Login.scss";
import AuthBase from "@containers/Authenticator/AuthBase";

import { RULES } from "@constants";
import { URL } from "@url";
import Logo from "@assets/images/icon/logoLogin.svg";
import * as app from "@app/store/ducks/app.duck";

function Login({ history, isLoading, ...props }) {
  const [form] = Form.useForm();
  function handleLogin(value) {
    props.login(value, history);
  }

  return (
    <AuthBase>
      <div className="login-container">
        <div className="login-left">
          <span className="text-welcome">Chào mừng</span>
          <img src={Logo} className="img_logo" />
        </div>
        <div className="login-right">
          <span className="text-welcome">Đăng nhập</span>
          <span className="text-welcome2">Chào mừng bạn đến với hệ thống quản lý văn bằng chứng chỉ trường Đại học Hồng Đức, vui lòng đăng nhập để tiếp tục</span>
          <Form layout={"vertical"} className="form-center" size="large" form={form} onFinish={handleLogin}>
            <Form.Item name="username" rules={[{ required: true, message: "Tên đăng nhập không được để trống" }]}>
              <Input placeholder="Vui lòng nhập tên đăng nhập" className="txt_input" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Mật khẩu không được để trống" }]}>
              <Input.Password placeholder="Vui lòng nhập mật khẩu" className="txt_input" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="btn_signin">
              Đăng nhập
            </Button>
          </Form>
        </div>
      </div>
    </AuthBase>
  );
}

function mapStateToProps(store) {
  const { isLoading } = store.app;
  return { isLoading };
}

export default connect(mapStateToProps, app.actions)(Login);







