import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Input, Modal } from "antd";
import "./EditTitleKey.scss";

import Loading from "@components/Loading";
import { connect } from "react-redux";
import { toast, validateSpaceNull } from "@app/common/functionCommons";
import { CONSTANTS, TOAST_MESSAGE } from "@constants";
import { updateTitleKey } from "@app/services/Key";
EditTitleKey.propTypes = {};

function EditTitleKey({ visibleEdit, setVisibleEdit, isLoading }) {
  const [form] = Form.useForm();
  const onFinish = async (e) => {
    const response = await updateTitleKey(e);
    if (response) {
      toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.KEY.TITLE);
    }
    form.resetFields();
    setVisibleEdit();
  };
  const onCancel = () => {
    form.resetFields();
    setVisibleEdit();
  };
  return (
    <div>
      <Modal visible={visibleEdit} title="Chỉnh sửa tiêu đề chữ ký" onCancel={onCancel} footer={null}>
        <Loading active={isLoading}>
          <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 20 }} onFinish={onFinish}>
            <div className="form--editKey--container">
              <Form.Item
                label="Tiêu đề"
                name="title"
                rules={[{ required: true, message: "Tiêu đề không thể để trống" }, { validator: validateSpaceNull }]}
              >
                <Input placeholder="Vui lòng nhập tiêu đề chữ ký" />
              </Form.Item>
              <div className="btn_submit_edittitleKey">
                <Button type="primary" htmlType="submit">
                  Cập nhật thông tin
                </Button>
              </div>
            </div>
          </Form>
        </Loading>
      </Modal>
    </div>
  );
}
function mapStateToProps(store) {
  const { isLoading } = store.app;
  return { isLoading };
}
export default connect(mapStateToProps)(EditTitleKey);

