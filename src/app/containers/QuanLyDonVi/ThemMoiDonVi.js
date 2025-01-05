import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./ThemMoiDonVi.scss";
import { Button, Form, Input, Modal, Select } from "antd";
import { connect } from "react-redux";
import Loading from "@components/Loading";
import { toast, validateSpaceNull } from "@app/common/functionCommons";
import { CONSTANTS, CREATE_ORG_ROLE_SYSTEM, RULES, SEARCH_ROLE_SYSTEM, TOAST_MESSAGE } from "@constants";
import { createOrg, editOrg } from "@app/services/DonVi";
ThemMoiDonVi.propTypes = {};

function ThemMoiDonVi({ visible, onCancel, reloadAPI, data, isLoading }) {
  const [form] = Form.useForm();
  const cancelForm = () => {
    form.resetFields();
    onCancel();
  }
  const submitForm = async (e) => {
    if (!e.id) {
      delete e.id;
      const response = await createOrg(e);
      if (response) {
        toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.ORG.CREATE_NEW);
        cancelForm();
        form.resetFields();
        reloadAPI();
      }
    } else {
      const response = await editOrg(e);
      if (response) {
        toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.ORG.EDIT);
        cancelForm();
        form.resetFields();
        reloadAPI();
      }
    }
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data, id: data._id });
    }
  }, [data]);
  return (
    <div>
      <Modal
        visible={visible}
        className="ThemMoiDonVi-container"
        onCancel={cancelForm}
        footer={null}
        title={data ? "Chỉnh sửa đơn vị" : "Thêm mới đơn vị"}
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
              label="Tên đơn vị"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Tên đơn vị không thể để trống",
                },
                { validator: validateSpaceNull },
              ]}
            >
              <Input placeholder="Vui lòng nhập tên đơn vị" />
            </Form.Item>
            <Form.Item
              label="Nhập địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Địa chỉ không thể để trống",
                },
                { validator: validateSpaceNull },
              ]}
            >
              <Input placeholder="Vui lòng nhập địa chỉ" />
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
              name="type"
              rules={[
                {
                  required: true,
                  message: "Vai trò bắt buộc phải chọn",
                },
              ]}
            >
              <Select placeholder="Vui lòng chọn vai trò">
                {CREATE_ORG_ROLE_SYSTEM.map((res, index) => {
                  return (
                    <Select.Option value={res.value} key={index}>
                      {res.name}
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
export default connect(mapStatetoProps)(ThemMoiDonVi);








