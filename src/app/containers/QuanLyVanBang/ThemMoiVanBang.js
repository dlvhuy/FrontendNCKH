import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ThemMoiVanBang.scss";
import { Button, Form, Input, Modal, Select } from "antd";
import { connect } from "react-redux";
import Loading from "@components/Loading";
import { isUsernameValid, toast, validateSpaceNull } from "@app/common/functionCommons";
import { CONSTANTS, CREATE_ORG_ROLE_SYSTEM, Education_SYSTEM, GRADUATION_CLASSIFICATION, ROLE_SYSTEM, RULES, TOAST_MESSAGE, UNIVERSITY_MAJOR_SYSTEM } from "@constants";
import { createUser, getAllUser, updateUser } from "@app/services/NguoiDung";
import { getAllDonVi } from "@app/services/DonVi";
ThemMoiVanBang.propTypes = {};

function ThemMoiVanBang({ visible, onCancel, reloadAPI, data, isLoading }) {
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
        className="ThemMoiVanBang-container"
        onCancel={cancelForm}
        footer={null}
        title={data ? "Chỉnh sửa sửa văn bằng" : "Thêm mới văn bằng"}
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
              name="studentName"
              rules={[
                {
                  required: true,
                  message: "Tên sinh viên không thể để trống",
                },
                { validator: isUsernameValid },
              ]}
            >
              <Input placeholder="Vui lòng nhập Tên sinh viên" />
            </Form.Item>
            <Form.Item
              label="Ngành học"
              name="Major"
              rules={[
                {
                  required: true,
                  message: "Ngành học bắt buộc phải chọn",
                },
              ]}
            >
              <Select placeholder="Vui lòng chọn Vai trò">
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
              label="Hệ đào tạo"
              name="educationSystem"
              rules={[
                {
                  required: true,
                  message: "Hệ đào tạo bắt buộc phải chọn",
                },
              ]}
            >
              <Select placeholder="Vui lòng chọn Hệ đào tạo">
                {Education_SYSTEM.map((res, index) => {
                  return (
                    <Select.Option key={res?.value} value={res?.value}>
                      {res?.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Xếp loại tốt nghiệp"
              name="graduationClassification"
              rules={[
                {
                  required: true,
                  message: "Xếp loại tốt nghiệp bắt buộc phải chọn",
                },
              ]}
            >
              <Select placeholder="Vui lòng chọn Xếp loại tốt nghiệp">
                {GRADUATION_CLASSIFICATION.map((res, index) => {
                  return (
                    <Select.Option key={res?.value} value={res?.value}>
                      {res?.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="GPA 4"
              name="gpaScale4"
              rules={[
                {
                  required: true,
                  message: "điểm không thể để trống",
                },
                RULES.GPA_4_SCALE,
              ]}>

              <Input placeholder="Vui lòng nhập điểm" />
            </Form.Item>
            <Form.Item
              label="Tổng tín chỉ"
              name="totalCredit"
              rules={[
                {
                  required: true,
                  message: "Tổng tín chỉ không được để trống",
                },
                RULES.TOTAL_CREDITS_RULE,
              ]}>
              <Input placeholder="Vui lòng nhập tổng số tín chỉ" />
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
export default connect(mapStatetoProps)(ThemMoiVanBang);

