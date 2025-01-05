import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SendResultToUser.scss";
import Modal from "antd/lib/modal/Modal";
import { Button, Form, Select } from "antd";
import { STATUS_TD } from "@constants";
import TextArea from "antd/lib/input/TextArea";
SendResultToUser.propTypes = {};

function SendResultToUser({ visible, onCancel, onFinish }) {
  const [showReject, setShowReject] = useState(false);
  const [form] = Form.useForm();
  const onSelectChange = (e) => {
    if (e == STATUS_TD.reject) setShowReject(true);
    else setShowReject(false);
  };
  const onSubmit = (e) => {
    onFinish(e);
    form.resetFields();
  };
  const handleCancel = () => {
    form.resetFields();
    onCancel()
  }
  return (
    <div>
      <Modal
        visible={visible}
        title={"Gửi kết quả"}
        footer={null}
        width={700}
        className="modal-gui-kq"
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
        >
          <Form.Item
            name="status"
            label="Kết quả thẩm định"
            rules={[
              {
                required: true,
                message: "Bạn phải chọn kết quả",
              },
            ]}
          >
            <Select placeholder="Vui lòng chọn kết quả" onChange={onSelectChange} allowClear>
              <Option value={STATUS_TD.accepted}>Chấp thuận hồ sơ</Option>
              <Option value={STATUS_TD.reject}>Từ chối hồ sơ</Option>
            </Select>
          </Form.Item>
          {showReject && (
            <Form.Item
              name="description"
              label="Lý do từ chối"
              rules={[
                {
                  required: true,
                  message: "Bạn phải nhập lý do",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          )}
          <div className="footer-form">
            <Button className="btn-cancel-custom btn-cl" onClick={handleCancel}>
              Huỷ
            </Button>
            <Button type="primary" htmlType="submit" className="btn-send-result">
              Gửi kết quả
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default SendResultToUser;



