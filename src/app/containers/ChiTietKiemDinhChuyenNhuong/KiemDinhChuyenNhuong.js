import { LeftOutlined } from "@ant-design/icons";
import { formatDateForm, toast, validateSpaceNull } from "@app/common/functionCommons";
import { getChuyenNhuongByID, sendResultTransferToOrg } from "@app/services/ChuyenNhuong";
import BaseContent from "@components/BaseContent";
import CustomInfo from "@components/CustomInfo/CustomInfo";
import ArrowRightThick from "@components/Icons/ArrowRightThick";
import Loading from "@components/Loading";
import SendResultToUser from "@components/SendResultToUser/SendResultToUser";
import UploadImage from "@components/UploadImage/UploadImage";
import VerifyDigitalSignature from "@components/VerifyDigitalSignature/VerifyDigitalSignature";
import {
  CONSTANTS,
  RULES,
  STATUS_TD,
  TOAST_MESSAGE,
  TYPE_IMAGE_CAP_LAI,
  VI_STATUS_THAM_DINH_DEPARTMENT,
} from "@constants";
import { URL } from "@url";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./KiemDinhChuyenNhuong.scss";
KiemDinhChuyenNhuong.propTypes = {};

function KiemDinhChuyenNhuong({ isLoading, myInfo }) {
  const { id } = useParams();
  const history = useHistory();
  const [form2] = Form.useForm();
  const [makhudatapi, setmakhudatapi] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showModalResult, setShowModalResult] = useState(false);
  const [dataGCN, setdataGCN] = useState([]);
  const [showPK, setShowPK] = useState(false);
  const [removeGCN, setRemoveGCN] = useState([]);
  const [formResult, setFormResult] = useState(null);
  const [data, setData] = useState(null);
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
  const sendToOrg = async (e) => {
    const response = await sendResultTransferToOrg(id, {
      ...formResult,
      magiayto: makhudatapi,
      private_key: e,
      orgCurrent: myInfo.org._id,
    });
    if (response) {
      toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.CHUYEN_NHUONG.RESPONSE_KIEM_DINH);
      getAPI();
    }
  };
  const showVisibleKey = () => {
    setShowPK(!showPK);
  };
  const finishFormKQ = (kq) => {
    setFormResult(kq);
    showModalKetQua();
    showVisibleKey();
  };
  const showModalKetQua = () => {
    setShowModalResult(!showModalResult);
  };
  return (
    <div className="ThemMoiChuyenNhuong-container">
      {id && data?.status == STATUS_TD.pending && (
        <div className="action-gui-duyet">
          <Button
            type="primary"
            className="button_reverse"
            icon={<ArrowRightThick />}
            style={{ backgroundColor: "#6b87e6" }}
            onClick={showModalKetQua}
          >
            Gửi kết quả
          </Button>
        </div>
      )}
      <BaseContent>
        <Loading active={isLoading}>
          <div className="title-name">
            <div className="title-left">
              <Link to={URL.MENU.KIEM_DINH_CHUYEN_NHUONG}>
                <LeftOutlined className="icon-left" />
              </Link>
              <span>Thông tin giấy tờ / chuyển nhượng</span>
              <div className={`action-dv color-status-${data?.status}`}>
                <span>{VI_STATUS_THAM_DINH_DEPARTMENT[data?.status]}</span>
              </div>
            </div>
          </div>
          <div className="div_hr"></div>
          <div className="content-body-container">
            {makhudatapi && <span>Mã khu đất: {makhudatapi}</span>}
            <div className="header">
              <span>Hợp đồng chuyển nhượng quyền sử dụng đất</span>
            </div>
            <Form layout={"vertical"} form={form2} labelCol={4} wrapperCol={14} disabled={disabled}>
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
          <SendResultToUser visible={showModalResult} onCancel={showModalKetQua} onFinish={finishFormKQ} />
        </Loading>
      </BaseContent>
      <VerifyDigitalSignature visible={showPK} handleVisible={showVisibleKey} onSubmit={sendToOrg} />
    </div>
  );
}
function mapStateToProps(store) {
  const { isLoading } = store.app;
  const { myInfo } = store.user;
  return { isLoading };
}
export default connect(mapStateToProps)(KiemDinhChuyenNhuong);

