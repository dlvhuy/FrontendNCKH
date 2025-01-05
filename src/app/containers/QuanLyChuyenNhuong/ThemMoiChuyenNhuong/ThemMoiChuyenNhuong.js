import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BaseContent from "@components/BaseContent";
import Loading from "@components/Loading";
import { CloseOutlined, DeleteOutlined, EditOutlined, LeftOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import "./ThemMoiChuyenNhuong.scss";
import { formatDateForm, toast, validateSpaceNull } from "@app/common/functionCommons";
import { CONSTANTS, RULES, TOAST_MESSAGE, TYPE_IMAGE_CAP_LAI } from "@constants";
import TextArea from "antd/lib/input/TextArea";
import CustomInfo from "@components/CustomInfo/CustomInfo";
import UploadImage from "@components/UploadImage/UploadImage";
import { getByMaGiayTo } from "@app/services/CapMoiGiayTo";
import CloseIcon from "@components/CustomModal/CloseIcon";
import {
  createChuyenNhuong,
  deleteChuyenNhuongByID,
  editChuyenNhuong,
  getChuyenNhuongByID,
  sendTransferToOrg,
} from "@app/services/ChuyenNhuong";
import { URL } from "@url";
import DialogDeleteConfim from "@components/DialogDeleteConfim/DialogDeleteConfim";
import ArrowRightThick from "@components/Icons/ArrowRightThick";
import VerifyDigitalSignature from "@components/VerifyDigitalSignature/VerifyDigitalSignature";
import { getLand } from "@app/services/TruyXuat";
ThemMoiChuyenNhuong.propTypes = {};

function ThemMoiChuyenNhuong({ isLoading, myInfo }) {
  const { id } = useParams();
  const history = useHistory();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const formRef = useRef(null);
  const [makhudatapi, setmakhudatapi] = useState(null);
  const [magiaytoForm, setMagiaytoForm] = useState(null);
  const [disabledForm1, setDisabledForm1] = useState(null);
  const [enableFormXoa, setEnableFormXoa] = useState(false);
  const getInfomationKhuDat = async (e) => {
    if (disabledForm1) {
      setDisabledForm1(false);
      form2.resetFields();
      setMagiaytoForm(null);
    } else {
      const response = await getLand(e.code);
      if (response) {
        form2.setFieldsValue({
          ...response,
          ngaycapcccd: formatDateForm(response.ngaycapcccd),
        });
        setDisabledForm1(true);
        setMagiaytoForm(e.code);
      } else {
        toast(CONSTANTS.ERROR, TOAST_MESSAGE.CAP_MOI.NOT_FOUND);
      }
    }
  };
  const [disabled, setDisabled] = useState(false);
  const [dataGCN, setdataGCN] = useState([]);
  const [showPK, setShowPK] = useState(false);
  const [removeGCN, setRemoveGCN] = useState([]);
  const [data, setData] = useState(null);
  const onSubmit = async (e) => {
    if (id) {
      const response = await editChuyenNhuong(e, dataGCN, removeGCN, id);
      if (response) {
        toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.CHUYEN_NHUONG.EDIT);
        setDisabled(true);
      }
    } else {
      const response = await createChuyenNhuong(
        {
          ...e,
          magiayto: magiaytoForm,
        },
        dataGCN
      );
      if (response) {
        toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.CAP_MOI.THEM_MOI);
        history.push(URL.THEM_MOI_CHUYEN_NHUONG_ID.format(response._id));
      }
    }
  };
  const getAPI = async () => {
    const response = await getChuyenNhuongByID(id);
    setdataGCN(response.anhkhudat);
    setData(response);
    form2.setFieldsValue({
      ...response,
      ngaycapcccd: formatDateForm(response.ngaycapcccd),
      ngaycapcccdnhan: formatDateForm(response.ngaycapcccdnhan),
    });
    setmakhudatapi(response.magiayto);
  };
  useEffect(() => {
    if (id) {
      setDisabled(true);
      getAPI();
    }
  }, [id]);
  const enableEdit = () => {
    setDisabled(false);
  };
  const cancelEdit = () => {
    setDisabled(true);
    getAPI();
  };
  const visibleFormXoa = () => {
    setEnableFormXoa(!enableFormXoa);
  };
  const handleRemove = async () => {
    const response = await deleteChuyenNhuongByID(id);
    if (response) {
      toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.CHUYEN_NHUONG.DELETE);
      history.push(URL.MENU.QUAN_LY_CHUYEN_NHUONG);
    }
  };
  const sendToOrg = async (e) => {
    const response = await sendTransferToOrg(id, e, myInfo.org._id);
    if (response) {
      toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.CHUYEN_NHUONG.SEND_KIEM_DINH);
      getAPI();
    }
  };
  const showVisibleKey = () => {
    setShowPK(!showPK);
  };
  return (
    <div className="ThemMoiChuyenNhuong-container">
      {id && (data?.status == "pending" || data?.status == "sending")  && (
        <div className="action-gui-duyet">
          <Button
            type="primary"
            className="button_reverse"
            icon={<ArrowRightThick />}
            style={{ backgroundColor: "#1890FF" }}
            onClick={showVisibleKey}
          >
            Gửi thẩm định
          </Button>
        </div>
      )}
      <BaseContent>
        {!id && (
          <div className="ThemMoiChuyenNhuong-parent">
            <Form
              form={form1}
              labelCol={{
                xs: 16,
                sm: 11,
                md: 12,
                lg: 8,
              }}
              wrapperCol={{
                xs: { span: 6 }, // Kích thước cho xs (màn hình cực nhỏ)
                sm: { span: 10 }, // Kích thước cho sm (màn hình nhỏ)
                md: { span: 10 }, // Kích thước cho md (màn hình trung bình)
                lg: { span: 14 }, // Kích thước cho lg (màn hình lớn)
              }}
              autoComplete="off"
              className="form-code"
              onFinish={getInfomationKhuDat}
            >
              <div className="input-code">
                <Form.Item
                  label="Mã khu đất cần chuyển nhượng"
                  name="code"
                  className="code-title"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã khu đất",
                    },
                    {
                      validator: validateSpaceNull,
                    },
                  ]}
                >
                  <Input disabled={disabledForm1} />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={disabledForm1 ? <CloseOutlined /> : <SearchOutlined />}
                ></Button>
              </div>
            </Form>
          </div>
        )}
        <Loading active={isLoading}>
          <div className="title-name">
            <div className="title-left">
              <Link to={URL.MENU.QUAN_LY_CHUYEN_NHUONG}>
                <LeftOutlined className="icon-left" />
              </Link>
              <span>Thông tin giấy tờ / chuyển nhượng</span>
            </div>
            <div className="title-right">
              {id && data?.status == "pending" && (
                <div className="btn-edit-remove">
                  {disabled && (
                    <Button className="button-edit" icon={<EditOutlined />} onClick={enableEdit}>
                      Chỉnh sửa
                    </Button>
                  )}
                  {!disabled && (
                    <Button className="button-edit" icon={<EditOutlined />} onClick={cancelEdit}>
                      Huỷ chỉnh sửa
                    </Button>
                  )}
                  <Button className="button-remove" icon={<DeleteOutlined />} onClick={visibleFormXoa}>
                    Xoá
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="div_hr"></div>
          <div className="content-body-container">
            {makhudatapi && <span>Mã khu đất: {makhudatapi}</span>}
            <div className="header">
              <span>Hợp đồng chuyển nhượng quyền sử dụng đất</span>
            </div>
            <Form
              layout={"vertical"}
              form={form2}
              labelCol={4}
              wrapperCol={14}
              onFinish={onSubmit}
              disabled={disabled}
              ref={formRef}
            >
              <Row span={24} gutter={20}>
                <Col xs={24} sm={24} md={12} className="col-border">
                  <span className="title">Bên chuyển nhượng quyền sử dụng đất</span>
                  <Form.Item
                    label="Ông (Bà)"
                    name="tennguoisudung"
                    rules={[{ required: true, message: "Không thể để trống" }, { validator: validateSpaceNull }]}
                  >
                    <Input placeholder="Vui lòng nhập tên người sử dụng" disabled></Input>
                  </Form.Item>
                  <Form.Item
                    label="Số CMND / CCCD"
                    name="cccd"
                    rules={[{ required: true, message: "Không thể để trống" }, RULES.CMND]}
                  >
                    <Input placeholder="Vui lòng nhập số CCCD" disabled></Input>
                  </Form.Item>

                  <Form.Item
                    label="Nơi cấp CMND / CCCD"
                    name="noicap"
                    rules={[{ required: true, message: "Không thể để trống" }]}
                  >
                    <Input placeholder="Nhập nơi cấp CMND" disabled style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    label="Ngày cấp CMND / CCCD"
                    name="ngaycapcccd"
                    rules={[{ required: true, message: "Không thể để trống" }]}
                  >
                    <DatePicker
                      picker="day"
                      placeholder="Vui lòng nhập ngày cấp"
                      style={{ width: "100%" }}
                      disabled
                      format="DD/MM/YYYY"
                    ></DatePicker>
                  </Form.Item>
                  <Form.Item
                    label="Nghề nghiệp"
                    name="nghenghiep"
                    rules={[{ required: true, message: "Không thể để trống" }]}
                  >
                    <Input placeholder="Nhập nghề nghiệp" style={{ width: "100%" }} disabled />
                  </Form.Item>
                  <Form.Item
                    label="Địa chỉ thường trú"
                    name="diachithuongtru"
                    rules={[{ required: true, message: "Không thể để trống" }]}
                  >
                    <Input placeholder="Nhập địa chỉ thường trú" style={{ width: "100%" }} disabled />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <span className="title">Bên nhận chuyển nhượng quyền sử dụng đất</span>

                  <Form.Item
                    label="Ông (Bà)"
                    name="tennguoisudungnhan"
                    rules={[{ required: true, message: "Không thể để trống" }, { validator: validateSpaceNull }]}
                  >
                    <Input placeholder="Vui lòng nhập tên người sử dụng"></Input>
                  </Form.Item>
                  <Form.Item
                    label="Số CMND / CCCD"
                    name="cccdnhan"
                    rules={[{ required: true, message: "Không thể để trống" }, RULES.CMND]}
                  >
                    <Input placeholder="Vui lòng nhập số CCCD"></Input>
                  </Form.Item>

                  <Form.Item
                    label="Nơi cấp CMND / CCCD"
                    name="noicapnhan"
                    rules={[{ required: true, message: "Không thể để trống" }]}
                  >
                    <Input placeholder="Nhập nơi cấp CMND" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    label="Ngày cấp CMND / CCCD"
                    name="ngaycapcccdnhan"
                    rules={[{ required: true, message: "Không thể để trống" }]}
                  >
                    <DatePicker
                      picker="day"
                      placeholder="Vui lòng nhập ngày cấp"
                      style={{ width: "100%" }}
                      format="DD/MM/YYYY"
                    ></DatePicker>
                  </Form.Item>
                  <Form.Item
                    label="Nghề nghiệp"
                    name="nghenghiepnhan"
                    rules={[{ required: true, message: "Không thể để trống" }]}
                  >
                    <Input placeholder="Nhập nghề nghiệp" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    label="Địa chỉ thường trú"
                    name="diachithuongtrunhan"
                    rules={[{ required: true, message: "Không thể để trống" }]}
                  >
                    <Input placeholder="Nhập địa chỉ thường trú" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Nội dung biến động"
                name="noidungbiendong"
                rules={[{ required: true, message: "Không thể để trống" }]}
              >
                <TextArea placeholder="Nhập nội dung biến động" style={{ width: "100%" }} rows={3} />
              </Form.Item>
              <Row span={24} gutter={20}>
                <Col xs={24} sm={24} md={12} className="col-border">
                  <Form.Item
                    label="Nội dung trên GCN trước biến động"
                    name="noidungtruocbiendong"
                    rules={[{ required: true, message: "Không thể để trống" }]}
                  >
                    <TextArea placeholder="Nhập nội dung biến động" style={{ width: "100%" }} rows={5} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Nội dung trên GCN sau biến động"
                    name="noidungsaubiendong"
                    rules={[{ required: true, message: "Không thể để trống" }]}
                  >
                    <TextArea placeholder="Nhập nội dung biến động" style={{ width: "100%" }} rows={5} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Lý do biến động"
                name="lydobiendong"
                rules={[{ required: true, message: "Không thể để trống" }]}
              >
                <TextArea placeholder="Nhập lý do biến động" style={{ width: "100%" }} rows={3} />
              </Form.Item>
              <Form.Item
                label="Tình hình thực hiện nghĩa vụ tài chính"
                name="nghiavutaichinh"
                rules={[{ required: true, message: "Không thể để trống" }]}
              >
                <TextArea
                  placeholder="Nhập tình hình thực hiện nghĩa vụ tài chính"
                  style={{ width: "100%" }}
                  rows={3}
                />
              </Form.Item>
              <Form.Item
                label="Giấy tờ liên quan đến nội dung thay đổi nộp kèm theo đơn này gồm có:"
                name="giaytolienquan"
              >
                <TextArea placeholder="Nhập giấy tờ liên quan" style={{ width: "100%" }} rows={3} />
              </Form.Item>
            </Form>
          </div>
          <div className="cacgiaytolienquan-container">
            <CustomInfo text={"Ảnh các giấy tờ liên quan"} info={"Là các giấy tờ liên quan đến khu đất"}></CustomInfo>
          </div>
          <span>Ảnh khu đất (nếu có)</span>
          <UploadImage
            data={dataGCN}
            onChange={setdataGCN}
            remove={removeGCN}
            disabled={disabled}
            onRemove={setRemoveGCN}
            type={TYPE_IMAGE_CAP_LAI.ANH_KHU_DAT}
          ></UploadImage>
          {!disabled && (
            <div className="btn-submit">
              <Button type="primary" htmlType="submit" disabled={disabled} onClick={() => formRef.current.submit()}>
                {id ? "Cập nhật thông tin" : "Tạo mới yêu cầu"}
              </Button>
            </div>
          )}
          <DialogDeleteConfim visible={enableFormXoa} onCancel={visibleFormXoa} onOK={handleRemove} />
        </Loading>
      </BaseContent>
      <VerifyDigitalSignature visible={showPK} handleVisible={showVisibleKey} onSubmit={sendToOrg} />
    </div>
  );
}
function mapStateToProps(store) {
  const { isLoading } = store.app;
  const { myInfo } = store.user;
  return { isLoading, myInfo };
}

export default connect(mapStateToProps)(ThemMoiChuyenNhuong);

