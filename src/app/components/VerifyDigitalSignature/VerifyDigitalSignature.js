import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal/Modal";
import { Button, Form, Input } from "antd";
import "./VerifyDigitalSignature.scss";
import { UploadOutlined } from "@ant-design/icons";
import UploadIcon from "@components/Icons/UploadIcon";
import { toast } from "@app/common/functionCommons";
import { CONSTANTS, TOAST_MESSAGE } from "@constants";
import Loading from "@components/Loading";
VerifyDigitalSignature.propTypes = {};

function VerifyDigitalSignature({ visible, handleVisible, onSubmit }) {
  const [form] = Form.useForm();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textKey, setTextKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleCloseFile = () => {
    fileInputRef.current.click();
  };
  const handleFileChoose = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = "." + file.name.split(".").pop().toLowerCase();
      const allowedExtensions = [".pem", ".cer", ".txt"];
      const isAllowed = allowedExtensions.includes(fileExtension);
      if (isAllowed) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFile({
            name: file.name,
            type: file.type,
            size: file.size,
            data: reader.result,
          });
          form.setFieldsValue({
            FileChuKy: file.name,
          });
        };
        reader.readAsText(file);
      } else {
        toast(CONSTANTS.ERROR, TOAST_MESSAGE.FILE.NOT_ACCEPT_EXTENSION);
      }
    }
    fileInputRef.current.value = "";
  };
  const formSubmit = async(target) => {
    if (target.txtChuKy) {
      setLoading(true);
      await onSubmit(target.txtChuKy);
      setLoading(false);
      formReset();
    } else if (selectedFile) {
      setLoading(true);
      await onSubmit(selectedFile.data);
      setLoading(false);
      formReset();
    } else {
      toast(CONSTANTS.ERROR, TOAST_MESSAGE.FILE.NOT_FOUND_KEY);
      form.resetFields();
      setSelectedFile(null);
      setTextKey(null);
    }
  };
  const formReset = () => {
    form.resetFields();
    setSelectedFile(null);
    setTextKey(null);
    handleVisible();
  };
  const onChangeText = (e) => {
    setTextKey(e.target.value);
  };
  return (
    <div>
      <Modal visible={visible} title="Xác minh chữ ký" footer={null} width={750} onCancel={formReset}>
        <Loading active={loading}>
          <div className="signature-verify-container">
            <Form form={form} size="normal" labelCol={{ span: 7 }} wrapperCol={{ span: 17 }} onFinish={formSubmit}>
              <Form.Item label="Nhập khoá bí mật của bạn" name="txtChuKy">
                <Input
                  placeholder="Nhập thông tin khoá bí mật"
                  className="inp_large"
                  disabled={Boolean(selectedFile)}
                  onChange={onChangeText}
                />
              </Form.Item>
              <div className="noti-or">
                <div className="div_hr"></div>
                <span className="or">Hoặc</span>
                <div className="div_hr"></div>
              </div>
              <Form.Item label="Chọn tệp khoá bí mật" name="FileChuKy">
                <Input
                  className="inp_large"
                  placeholder="Chọn tệp khoá bí mật"
                  suffix={<UploadIcon />}
                  readOnly
                  onClick={handleCloseFile}
                  disabled={Boolean(textKey)}
                />
              </Form.Item>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChoose}
                accept=".pem,.cer,.txt"
              />
              <div className="btn_actions">
                <Button className="btn_cancel" onClick={formReset}>
                  Huỷ thao tác
                </Button>

                <Button type="primary" htmlType="submit">
                  Xác minh
                </Button>
              </div>
            </Form>
          </div>
        </Loading>
      </Modal>
    </div>
  );
}

export default VerifyDigitalSignature;

