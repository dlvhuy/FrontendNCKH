import { toast, validateSpaceNull } from "@app/common/functionCommons";

import { CONSTANTS, TOAST_MESSAGE } from "@constants";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import "./CreateKey.scss";
import Alert from "@assets/icons/alert.svg";
import { ArrowDownOutlined } from "@ant-design/icons";
import CopyIcon from "@app/components/Icons/CopyIcon";
import copy from "clipboard-copy";
import { saveAs } from "file-saver";
import { connect } from "react-redux";
import Loading from "@app/components/Loading";
import { createKeyBase, deleteKeyBase, updateTitleKey } from "@app/services/Key";

function CreateKey({ update, isLoading }) {
  const [FormEnterPassword] = Form.useForm();
  const [FormEnterTitle] = Form.useForm();
  const [openSetPass, setOpenSetPass] = useState(false);
  const [openSetTitle, setOpenSetTitle] = useState(false);
  const [openShowKey, setOpenShowKey] = useState(false);
  const [data, setData] = useState(null);
  const [titleChuKy, settitleChuKy] = useState(null);
  const [confim, setConfim] = useState(false);
  const handleOpenSetPass = () => {
    setOpenSetPass(!openSetPass);
    FormEnterPassword.resetFields();
  };
  const handleOpenSetTitle = async () => {
    const response = await deleteKeyBase();
    setOpenSetTitle(!openSetTitle);
  };
  const handleOpenShowKey = async () => {
    setOpenShowKey(!openShowKey);
    const response = await deleteKeyBase();
    update(new Date());
  };
  const handleEnterPassword = async (e) => {
    const response = await createKeyBase(e);
    if (response) {
      FormEnterTitle.setFieldsValue(response);
      setData(response);
      setOpenSetPass(false);
      setOpenSetTitle(true);
    }
  };
  const handleSaveTitle = (e) => {
    settitleChuKy(e.title);
    const response = updateTitleKey({ title: e.title });
    response.then(() => {
      setOpenSetTitle(false);
      setOpenShowKey(true);
    });
  };
  const goBack = () => {
    setOpenSetTitle(true);
    setOpenShowKey(false);
  };
  const handleDelete = async (e) => {
    const response = await deleteKeyBase(e);
    if (response) {
      toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.SUCCESS.DEFAULT);
    }
    FormEnterTitle.resetFields();
    setOpenSetTitle(false);
  };
  const savePEMFile = () => {
    const blob = new Blob([data.privateKey], { type: "application/x-pem-file" });
    saveAs(blob, titleChuKy + ".pem");
  };
  const createKeyFinish = () => {
    setOpenShowKey(false);
    FormEnterPassword.resetFields();
    FormEnterTitle.resetFields();
    update(new Date());
  };
  const copyData = () => {
    copy(data.privateKey);
    toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.SUCCESS.DEFAULT);
  };
  const changeChecked = (e) => {
    setConfim(e.target.checked);
  };
  return (
    <>
      <div className="CreateKey">
        <span className="CreateKey__title">Cài đặt chữ ký số</span>
        <div className="CreateKey__BtnCreate">
          <Button type="primary" onClick={handleOpenSetPass}>
            Tạo chữ ký số
          </Button>
        </div>

        <div className="modal_enterPassword">
          <Modal footer={null} visible={openSetPass} onCancel={handleOpenSetPass} width={700}>
            <Loading active={isLoading}>
              <div className="modal_enterPassword__Content">
                <div className="modal_enterPassword__title">Nhập mật khẩu</div>
                <span className="modal_enterPassword__Confim">
                  Vui lòng nhập mật khẩu đăng nhập xác nhận tạo chữ ký số
                </span>

                <Form
                  form={FormEnterPassword}
                  name="FormEnterPassword"
                  className="form_enterPassword"
                  wrapperCol={{ span: 24 }}
                  onFinish={handleEnterPassword}
                  initialValues={{ remember: true }}
                >
                  <div className="modal_enterPassword__ContentForm">
                    <Form.Item name="Password" rules={[{ required: true, message: "Mật khẩu không thể bỏ trống" }]}>
                      <Input.Password placeholder="Mật khẩu" style={{ width: "100%" }} />
                    </Form.Item>
                    <div className="button_enterPassword">
                      <Button type="default" className="button_enterPassword__huy" onClick={handleOpenSetPass}>
                        Huỷ thao tác
                      </Button>
                      <Button type="primary" htmlType="submit">
                        Tiếp theo
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </Loading>
          </Modal>
        </div>
        <div className="modal_enterTitle">
          <Modal
            footer={null}
            visible={openSetTitle}
            onCancel={handleOpenSetTitle}
            width={800}
            title="Thêm mới mã chữ ký số"
          >
            <Loading active={isLoading}>
              <Form
                name="FormEnterTitle"
                className="form_enterTitle"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                form={FormEnterTitle}
                onFinish={handleSaveTitle}
                initialValues={{ remember: true }}
              >
                <div className="modal_enterTitle__Content">
                  <>
                    <Form.Item
                      label="Tiêu đề chữ ký"
                      name="title"
                      rules={[
                        { required: true, message: "Tiêu đề chữ ký không thể để trống" },
                        { validator: validateSpaceNull },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </>
                  <>
                    <Form.Item label="Mã công khai" name="publicKey">
                      <Input disabled />
                    </Form.Item>
                  </>
                  <>
                    <Form.Item label="Mã bí mật" name="privateKey">
                      <Input disabled />
                    </Form.Item>
                  </>
                </div>

                <div className="button_enterPassword">
                  <Button type="default" className="button_enterPassword__huy" onClick={handleDelete}>
                    Huỷ thao tác
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Tiếp theo
                  </Button>
                </div>
              </Form>
            </Loading>
          </Modal>
        </div>
        <div className="modal_showKey">
          <Modal
            footer={null}
            visible={openShowKey}
            onCancel={handleOpenShowKey}
            width={864}
            title="Thêm mới mã chữ ký số"
          >
            <Loading active={isLoading}>
              <div className="modal_showKey__CT">
                <div className="modal_showKey__title">
                  <img src={Alert} />
                  <span>
                    <b>Lưu ý: </b>
                    Mã chữ ký cá nhân chỉ tạo một lần duy nhất. Bạn chỉ có thể thao tác sao chép hoặc tải xuống ở bước
                    này!
                  </span>
                </div>

                <div className="modal_showKey__content">
                  <span>Khoá bí mật:</span>

                  <Input disabled value={data?.privateKey} />

                  <Button icon={<CopyIcon />} className="btn_copy" onClick={copyData}>
                    Sao chép
                  </Button>
                  <Button icon={<ArrowDownOutlined />} className="btn_download" onClick={savePEMFile}>
                    Tải xuống
                  </Button>
                </div>
              </div>
              <div className="button_enterPasswordWidthCheckbox">
                <Checkbox style={{ color: "#5673d6" }} onChange={changeChecked} className="title_checkbox_confim">
                  Tôi xác nhận đã tải xuống hoặc sao chép khoá bí mật!
                </Checkbox>
                <div className="alert_taixuongkhoa">
                  <Button type="default" className="button_enterPassword__huy" onClick={goBack}>
                    Quay về trước
                  </Button>
                  <Button type="primary" onClick={createKeyFinish} disabled={!confim}>
                    Hoàn tất
                  </Button>
                </div>
              </div>
            </Loading>
          </Modal>
        </div>
      </div>
    </>
  );
}
function mapStateToProps(store) {
  const { isLoading } = store.app;
  return { isLoading };
}
export default connect(mapStateToProps)(CreateKey);

