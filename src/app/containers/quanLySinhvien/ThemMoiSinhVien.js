import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ThemMoiSinhVien.scss";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { connect } from "react-redux";
import Loading from "@components/Loading";
import { isUsernameValid, toast, validateSpaceNull } from "@app/common/functionCommons";
import { CONSTANTS, CREATE_ORG_ROLE_SYSTEM, GRADUATION_CLASSIFICATION, ROLE_SYSTEM, RULES, TOAST_MESSAGE, UNIVERSITY_MAJOR_SYSTEM } from "@constants";
import { createUser, getAllUser, updateUser } from "@app/services/NguoiDung";
import { getAllDonVi } from "@app/services/DonVi";
import { createStudent, updateStudent } from "@app/services/SinhVien";

ThemMoiSinhVien.propTypes = {};

function ThemMoiSinhVien({ visible, onCancel, reloadAPI, data, isLoading }) {
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
      const response = await createStudent(e);
      if (response) {
        toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.USER.CREATE_NEW);
        toast(CONSTANTS.INFO, TOAST_MESSAGE.USER.EMAIL_PASSWORD);
        cancelForm();
        form.resetFields();
        reloadAPI();
      }
    } else {
      const response = await updateStudent(e);
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
        title={data ? "Chỉnh sửa sinh viên" : "Thêm mới sinh viên"}
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
              label="Tên sinh viên"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Tên sinh viên không thể để trống",
                },
                { validator: isUsernameValid },
              ]}
            >
              <Input placeholder="Vui lòng nhập tên sinh viên" />
            </Form.Item>
            <Form.Item
              label="Chuyên ngành"
              name="major"
              rules={[
                {
                  required: true,
                  message: "chuyên ngành không thể để trống",
                },
                { validator: validateSpaceNull },
              ]}
            >
              <Select placeholder="Vui lòng chọn chuyên ngành">
                {UNIVERSITY_MAJOR_SYSTEM.map((res, index) => {
                  return (
                    <Select.Option key={res?.value} value={res?.value}>
                      {res?.name}
                    </Select.Option>
                  );
                })}
              </Select>

            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="birthDate"
              rules={[
                {
                  required: true,
                  message: "Ngày sinh không được để trống",
                },
              ]}
            >
              <DatePicker placeholder="Vui lòng chọn ngày sinh" />
            </Form.Item>
            <Form.Item
              label="điểm gpa 4"
              name="gpaType4"
              rules={[
                {
                  required: true,
                  message: "Vai trò bắt buộc phải chọn",
                },
                {
                  pattern: /^[0-4](\.\d{1,2})?$/,  // Chỉ cho phép giá trị từ 0.0 đến 4.0, với tối đa 2 chữ số sau dấu chấm
                  message: "Vui lòng nhập GPA hợp lệ (từ 0.0 đến 4.0, có thể có tối đa 2 chữ số thập phân)",
                },
              ]}

            >
              <Input
                placeholder="Vui lòng nhập điểm cho sinh viên"
              />
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
export default connect(mapStatetoProps)(ThemMoiSinhVien);

