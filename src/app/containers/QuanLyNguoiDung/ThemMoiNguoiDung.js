import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ThemMoiNguoiDung.scss";
import { Button, Form, Input, Modal, Select } from "antd";
import { connect } from "react-redux";
import Loading from "@components/Loading";
import { isUsernameValid, toast, validateSpaceNull } from "@app/common/functionCommons";
import { CONSTANTS, CREATE_ORG_ROLE_SYSTEM, ROLE_SYSTEM, RULES, TOAST_MESSAGE } from "@constants";
import { createUser, getAllUser, updateUser } from "@app/services/NguoiDung";

ThemMoiNguoiDung.propTypes = {};

function ThemMoiNguoiDung({ visible, onCancel, reloadAPI, data, isLoading }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {

      form.setFieldsValue({ id: data?._id, ...data });
    }
  }, [visible])
  const cancelForm = () => {
    form.resetFields();
    onCancel();
  };
  const submitForm = async (e) => {


    if (!e.id) {
      const response = await createUser(e);
      if (response) {
        toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.USER.CREATE_NEW);
        toast(CONSTANTS.INFO, TOAST_MESSAGE.USER.EMAIL_PASSWORD);
        cancelForm();
        form.resetFields();
        reloadAPI();
      }
    } else {
      const response = await updateUser(e);
      if (response) {
        toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.USER.EDIT);

        cancelForm();
        form.resetFields();
        reloadAPI();
      }
    }
  };

  return (
    <div>
      <Modal
        visible={visible}
        className="ThemMoiNguoiDung-container"
        onCancel={cancelForm}
        footer={null}
        title={data ? "Chỉnh sửa người dùng" : "Thêm mới người dùng"}
        width={700}
      >
        <Loading active={isLoading}>
          <Form
            className="form-register"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={submitForm}
            form={form}
          >
            <Form.Item hidden={true} name="id"></Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Username không thể để trống",
                },
                { validator: isUsernameValid },
              ]}
            >
              <Input placeholder="Vui lòng nhập Username" />
            </Form.Item>
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Họ và tên không thể để trống",
                },
                { validator: validateSpaceNull },
              ]}
            >
              <Input placeholder="Vui lòng nhập Họ và tên" />
            </Form.Item>
            <Form.Item
              label="Nhập email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email không thể để trống",
                },
                RULES.EMAIL,
              ]}
            >
              <Input placeholder="Vui lòng nhập email" />
            </Form.Item>

            <Form.Item
              label="Nhập số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không thể để trống",
                },
                RULES.PHONE,
              ]}
            >
              <Input placeholder="Vui lòng nhập số điện thoại" />
            </Form.Item>
            <Form.Item
              label="Vai trò"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Vai trò bắt buộc phải chọn",
                },
              ]}
            >
              <Select placeholder="Vui lòng chọn Vai trò">
                {CREATE_ORG_ROLE_SYSTEM.map((res, index) => {
                  return (
                    <Select.Option key={res?.value} value={res?.value}>
                      {res?.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <div className="btn-handle">
              <Button className="btn-cancel-custom btn-cl" onClick={cancelForm}>
                Huỷ thao tác
              </Button>
              <Button type="primary" htmlType="submit">
                {data ? "Lưu thông tin" : "Thêm mới"}
              </Button>
            </div>
          </Form>
        </Loading>
      </Modal>
    </div>
  );
}
function mapStatetoProps(store) {
  const { isLoading } = store.app;
  return { isLoading };
}
export default connect(mapStatetoProps)(ThemMoiNguoiDung);

