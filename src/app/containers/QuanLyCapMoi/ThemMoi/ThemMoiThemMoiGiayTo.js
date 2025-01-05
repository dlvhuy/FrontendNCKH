import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./ThemMoiThemMoiGiayTo.scss";
import BaseContent from "@components/BaseContent";
import { DeleteOutlined, EditOutlined, InfoCircleFilled, InfoCircleOutlined, LeftOutlined } from "@ant-design/icons";
import { URL } from "@url";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Tooltip } from "antd";
import { formatDate, formatDateForm, formatDateTime, toast, validateSpaceNull } from "@app/common/functionCommons";
import { CONSTANTS, RULES, TOAST_MESSAGE, TYPE_IMAGE_CAP_MOI } from "@constants";
import { connect } from "react-redux";
import UploadImage from "@components/UploadImage/UploadImage";
import CustomInfo from "@components/CustomInfo/CustomInfo";
import {
  createNewCapMoi,
  editGiayToCapMoi,
  getCapMoi,
  removeGiayToCapMoi,
  sendNewCertificateToOrg,
} from "@app/services/CapMoiGiayTo";
import Loading from "@components/Loading";
import DialogDeleteConfim from "@components/DialogDeleteConfim/DialogDeleteConfim";
import ArrowRightThick from "@components/Icons/ArrowRightThick";
import VerifyDigitalSignature from "@components/VerifyDigitalSignature/VerifyDigitalSignature";
ThemMoiThemMoiGiayTo.propTypes = {};

function ThemMoiThemMoiGiayTo({ isLoading, myInfo }) {
  const [form] = Form.useForm();
  const history = useHistory();
  const formRef = useRef(null);
  const [anhKhuDat, setAnhKhuDat] = useState([]);
  const [removeAnhKhuDat, setRemoveAnhKhuDat] = useState([]);
  const [cacLoaiGiayTo, setCacLoaiGiayTo] = useState([]);
  const [removeCacLoaiGiayTo, setRemoveCacLoaiGiayTo] = useState([]);
  const [hopDong, setHopDong] = useState([]);
  const [removeHopDong, setRemoveHopDong] = useState([]);
  const [nghiaVuTaiChinh, setNghiaVuTaiChinh] = useState([]);
  const [removeNghiaVuTaiChinh, setRemoveNghiaVuTaiChinh] = useState([]);
  const [messageCheckBox, setMessageCheckBox] = useState(null);
  const [messageKhuDat, setMessageKhuDat] = useState(null);
  const [disabled, onChangeDisabled] = useState(false);
  const [visibleXoa, setVisibleXoa] = useState(false);
  const [magiayto, setMagiayto] = useState(null);
  const [data, setData] = useState(null);
  const [showPK, setShowPK] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      onChangeDisabled(true);
      getAPI();
    }
  }, [id]);
  const getAPI = async () => {
    const response = await getCapMoi(id);
    form.setFieldsValue({
      ...response,
      tuthoidiem: formatDateForm(response?.tuthoidiem),
      thoihandenghi: formatDateForm(response?.thoihandenghi),
      thoihansohuu: formatDateForm(response?.thoihansohuu),
      ngaycapcccd: formatDateForm(response?.ngaycapcccd),
    });
    setData(response);
    setMagiayto(response.magiayto);
    setHopDong(response.hopdong);
    setAnhKhuDat(response.anhkhudat);
    setNghiaVuTaiChinh(response.taichinh);
    setCacLoaiGiayTo(response.other);
  };
  const changeDisabled = () => {
    onChangeDisabled(!disabled);
  };
  const notEdit = () => {
    onChangeDisabled(true);
    getAPI();
  };
  const setChangeVisibleXoa = () => {
    setVisibleXoa(!visibleXoa);
  };
  const onSubmit = async (e) => {
    let error = false;
    if (anhKhuDat.length == 0) {
      setMessageKhuDat("Cần có ít nhất 1 ảnh");
      error = true;
    }
    if (!e.dangkyquyensdd && !e.capgcndoivoidat && !e.dangkyquyenqldat && !e.capgcnvoitaisan) {
      setMessageCheckBox("Vui lòng chọn 1 đề nghị");
      error = true;
    }
    if (error) return;
    if (!disabled && id) {
      const response = await editGiayToCapMoi(
        id,
        e,
        anhKhuDat,
        cacLoaiGiayTo,
        hopDong,
        nghiaVuTaiChinh,
        removeAnhKhuDat,
        removeHopDong,
        removeCacLoaiGiayTo,
        removeNghiaVuTaiChinh
      );
      if (response) {
        toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.CAP_MOI.EDIT);
        getAPI();
        onChangeDisabled(true);
      }
    } else {
      const response = await createNewCapMoi(e, anhKhuDat, cacLoaiGiayTo, hopDong, nghiaVuTaiChinh);
      if (response) {
        history.push(URL.THEM_MOI_GIAY_TO_ID.format(response._id));
        toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.CAP_MOI.THEM_MOI);
      }
    }
  };
  const deleteGiayTo = async () => {
    const response = await removeGiayToCapMoi(id);
    if (response) {
      toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.CAP_MOI.DELETE);
      setVisibleXoa(false);
      history.push(URL.MENU.QUAN_LY_THEM_MOI);
    }
  };
  const sendToOrg = async (e) => {
    const response = await sendNewCertificateToOrg(id, e, myInfo.org._id);
    if (response) {
      toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.CAP_LAI.SEND_KIEM_DINH);
      getAPI();
    }
  };
  const showVisibleKey = () => {
    setShowPK(!showPK);
  };
  return (
    <div>
      {id && (data?.status == "pending" || data?.status == "sending") && data?.orgResponse == myInfo.org._id && (
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
      <Loading active={isLoading}>
        <BaseContent>
          <div className="ThemMoiGiayToTM-container">
            <div className="header">
              <div className="header-left">
                <div className="info-left-header">
                  <Link to={URL.MENU.QUAN_LY_THEM_MOI}>
                    <LeftOutlined className="left-out"></LeftOutlined>
                  </Link>
                  <span>Thông tin giấy tờ / thêm mới</span>
                </div>
                {id && data?.status == "pending" && (
                  <div className="btn-edit-remove">
                    {disabled && (
                      <Button className="button-edit" icon={<EditOutlined />} onClick={changeDisabled}>
                        Chỉnh sửa
                      </Button>
                    )}
                    {!disabled && (
                      <Button className="button-edit" icon={<EditOutlined />} onClick={notEdit}>
                        Huỷ chỉnh sửa
                      </Button>
                    )}
                    <Button className="button-remove" icon={<DeleteOutlined />} onClick={setChangeVisibleXoa}>
                      Xoá
                    </Button>
                  </div>
                )}
              </div>
              <div className="header-right"></div>
            </div>
            <div className="div_hr"></div>

            <div className="content">
              <Form
                layout={"vertical"}
                form={form}
                labelCol={4}
                wrapperCol={14}
                ref={formRef}
                onFinish={onSubmit}
                disabled={disabled}
              >
                {magiayto && <span style={{ marginTop: 30 }}>Mã khu đất: {magiayto}</span>}
                <div className="content-title">
                  Phần kê khai của người đăng ký
                  <div className="content-title-icon">
                    <Tooltip
                      placement="top"
                      title={"Là phần kê khai của người đăng ký về việc cấp mới quyền sử dụng đất"}
                    >
                      <InfoCircleOutlined />
                    </Tooltip>
                  </div>
                </div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={12}>
                    <Form.Item
                      label="Tên người sử dụng"
                      name="tennguoisudung"
                      rules={[
                        { required: true, message: "Tên người sử dụng không thể bỏ trống!" },
                        { validator: validateSpaceNull },
                      ]}
                    >
                      <Input placeholder="Nhập tên người sử dụng"></Input>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={12}>
                    <Form.Item
                      label="Địa chỉ thường trú"
                      name="diachithuongtru"
                      rules={[
                        { required: true, message: "Địa chỉ thường trú không thể bỏ trống!" },
                        { validator: validateSpaceNull },
                      ]}
                    >
                      <Input placeholder="Nhập địa chỉ thường trú"></Input>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={12}>
                    <Form.Item
                      label="Số CCCD / CMND"
                      name="cccd"
                      rules={[{ required: true, message: "Số CCCD không thể bỏ trống!" }, RULES.CMND]}
                    >
                      <Input placeholder="Nhập số CCCD"></Input>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={12}>
                    <Form.Item
                      label="Nơi cấp CMND/CCCD"
                      name="noicap"
                      rules={[{ required: true, message: "Nơi cấp CMND/CCCD không thể bỏ trống!" }]}
                    >
                      <Input placeholder="Nhập nơi cấp CMND/CCCD"></Input>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={12}>
                    <Form.Item
                      label="Ngày cấp CMND/CCCD"
                      name="ngaycapcccd"
                      rules={[
                        { required: true, message: "Ngày cấp CMND/CCCD không thể bỏ trống!" },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const fromDate = new Date();
                            if (value < fromDate) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error("Ngày cấp ko thể lớn hơn ngày hôm nay"));
                          },
                        }),
                      ]}
                    >
                      <DatePicker
                        picker="day"
                        placeholder="Vui lòng chọn thời điểm"
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={12}>
                    <Form.Item
                      label="Nghề nghiệp"
                      name="nghenghiep"
                      rules={[{ required: true, message: "Nghề nghiệp không thể bỏ trống!" }]}
                    >
                      <Input placeholder="Nhập nghề nghiệp"></Input>
                    </Form.Item>
                  </Col>
                </Row>
                <div className="content-title">
                  Đề nghị
                  <div className="content-title-icon">
                    <Tooltip placement="top" title={"Là phần đề nghị các quyền cấp mới quyền sử dụng đất"}>
                      <InfoCircleOutlined />
                    </Tooltip>
                  </div>
                </div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12}>
                    <Form.Item name="dangkyquyensdd" valuePropName="checked">
                      <Checkbox disabled={disabled}> Đăng ký quyền sử dụng đất</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12}>
                    <Form.Item name="capgcndoivoidat" valuePropName="checked">
                      <Checkbox disabled={disabled}>Cấp giấy chứng nhận đối với đất</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12}>
                    <Form.Item name="dangkyquyenqldat" valuePropName="checked">
                      <Checkbox disabled={disabled}>Đăng ký quyền quản lý đất</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12}>
                    <Form.Item name="capgcnvoitaisan" valuePropName="checked">
                      <Checkbox disabled={disabled}>Cấp GCN với tài sản có trên đất</Checkbox>
                    </Form.Item>
                  </Col>
                  {messageCheckBox && <span className="require">{messageCheckBox}</span>}
                </Row>
                <div className="content-title">
                  Thửa đất
                  <div className="content-title-icon">
                    <Tooltip placement="top" title={"Thông tin thửa đất cần đăng ký"}>
                      <InfoCircleOutlined />
                    </Tooltip>
                  </div>
                </div>
                <Row gutter={{ xs: 8, sm: 12, md: 20, lg: 20 }}>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Form.Item
                      label="Thửa đất đăng ký"
                      name="thuadatdangky"
                      rules={[{ required: true, message: "Thửa đất đăng ký không thể bỏ trống!" }]}
                    >
                      <Input placeholder="Nhập thửa đất đăng ký"></Input>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Form.Item
                      label="Số thửa đất"
                      name="sothuadat"
                      rules={[{ required: true, message: "Số thửa đất không thể bỏ trống!" }]}
                    >
                      <Input placeholder="Nhập số thửa đất"></Input>
                    </Form.Item>
                  </Col>
                  <Col
                    className="gutter-row"
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}
                    xl={8}
                    rules={[{ required: true, message: "Tờ bản đồ số không thể bỏ trống!" }]}
                  >
                    <Form.Item
                      label="Tờ bản đồ số"
                      name="tobandoso"
                      rules={[{ required: true, message: "Tờ bản đồ số không thể bỏ trống!" }]}
                    >
                      <Input placeholder="Tờ bản đồ số"></Input>
                    </Form.Item>
                  </Col>

                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Form.Item
                      label={
                        <span>
                          Diện tích (m<sup>2</sup>)
                        </span>
                      }
                      name="dientich"
                      rules={[{ required: true, message: "Diện tích không thể bỏ trống!" }, RULES.NUMBER_FLOAT]}
                    >
                      <Input placeholder="Nhập diện tích đăng ký"></Input>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Form.Item
                      label={
                        <span>
                          Sử dụng chung (m<sup>2</sup>)
                        </span>
                      }
                      name="sudungchung"
                      rules={[
                        { required: true, message: "Diện tích sử dụng chung không thể bỏ trống!" },
                        RULES.NUMBER_FLOAT,
                      ]}
                    >
                      <Input placeholder="Nhập diện tích sử dụng chung"></Input>
                    </Form.Item>
                  </Col>
                  <Col
                    className="gutter-row"
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}
                    xl={8}
                    rules={[{ required: true, message: "Tờ bản đồ số không thể bỏ trống!" }]}
                  >
                    <Form.Item
                      label={
                        <span>
                          Sử dụng riêng (m<sup>2</sup>)
                        </span>
                      }
                      name="sudungrieng"
                      rules={[
                        { required: true, message: "Diện tích sử dụng riêng không thể bỏ trống!" },
                        RULES.NUMBER_FLOAT,
                      ]}
                    >
                      <Input placeholder="Nhập diện tích sử dụng riêng"></Input>
                    </Form.Item>
                  </Col>

                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item
                      label="Sử dụng vào mục đích"
                      name="mucdichsd"
                      rules={[{ required: true, message: "Diện tích không thể bỏ trống!" }]}
                    >
                      <Input placeholder="Nhập mục đích sử dụng"></Input>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item
                      label="Từ thời điểm"
                      name="tuthoidiem"
                      rules={[{ required: true, message: "Diện tích sử dụng chung không thể bỏ trống!" }]}
                    >
                      <DatePicker
                        picker="day"
                        placeholder="Vui lòng chọn thời điểm"
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                  </Col>

                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item
                      label="Thời hạn đề nghị được sử dụng đất"
                      name="thoihandenghi"
                      rules={[{ required: true, message: "Thời hạn sử dụng đất không thể bỏ trống!" }]}
                    >
                      <DatePicker
                        picker="day"
                        placeholder="Vui lòng chọn thời hạn"
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item
                      label="Nguồn gốc sử dụng"
                      name="nguongoc"
                      rules={[{ required: true, message: "Diện tích không thể bỏ trống!" }]}
                    >
                      <Input placeholder="Nhập nguồn gốc sử dụng"></Input>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={24}>
                    <Form.Item
                      label="Địa chỉ thửa đất"
                      name="diachithuadat"
                      rules={[
                        { required: true, message: "Địa chỉ thửa đất không thể bỏ trống!" },
                        { validator: validateSpaceNull },
                      ]}
                    >
                      <Input placeholder="Nhập địa chỉ thửa đất"></Input>
                    </Form.Item>
                  </Col>
                </Row>
                <div className="content-title">
                  Tài sản
                  <div className="content-title-icon">
                    <Tooltip placement="top" title={"Tài sản liên quan đến thửa đất"}>
                      <InfoCircleOutlined />
                    </Tooltip>
                  </div>
                </div>
                <Row gutter={{ xs: 8, sm: 12, md: 20, lg: 20 }}>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Form.Item label="Loại nhà ở, công trình" name="loainhao">
                      <Input placeholder="Nhập loại nhà ở"></Input>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Form.Item
                      label={
                        <span>
                          Diện tích xây dựng (m<sup>2</sup>)
                        </span>
                      }
                      name="dientichxaydung"
                      rules={[RULES.NUMBER_FLOAT]}
                    >
                      <Input placeholder="Nhập diện tích xây dựng"></Input>
                    </Form.Item>
                  </Col>
                  <Col
                    className="gutter-row"
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}
                    xl={8}
                    rules={[{ required: true, message: "Tờ bản đồ số không thể bỏ trống!" }, RULES.NUMBER_FLOAT]}
                  >
                    <Form.Item label="Diện tích sàn" name="dientichsan">
                      <Input placeholder="Nhập diện tích sàn"></Input>
                    </Form.Item>
                  </Col>

                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Form.Item
                      label={
                        <span>
                          Sở hữu chung (m<sup>2</sup>)
                        </span>
                      }
                      name="sohuuchung"
                      rules={[RULES.NUMBER_FLOAT]}
                    >
                      <Input placeholder="Nhập số mét sở hữu chung"></Input>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Form.Item
                      label={
                        <span>
                          Sở hữu riêng (m<sup>2</sup>)
                        </span>
                      }
                      name="sohuurieng"
                      rules={[RULES.NUMBER_FLOAT]}
                    >
                      <Input placeholder="Nhập diện tích sở hữu riêng"></Input>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} xl={8}>
                    <Form.Item label="Kết cấu" name="ketcau">
                      <Input placeholder="Nhập kết cấu"></Input>
                    </Form.Item>
                  </Col>

                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Số tầng" name="sotang">
                      <Input placeholder="Nhập số tầng" type="number"></Input>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Thời hạn sở hữu" name="thoihansohuu">
                      <DatePicker
                        placeholder="Nhập thời hạn sở hữu"
                        picker="day"
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY"
                      ></DatePicker>
                    </Form.Item>
                  </Col>
                </Row>

                <div className="image-kd">
                  <CustomInfo
                    text={
                      <span>
                        Ảnh khu đất <span className="require">(*)</span>
                      </span>
                    }
                    info={"Là ảnh chụp thật của khu đất"}
                  />
                  <UploadImage
                    data={anhKhuDat}
                    onChange={setAnhKhuDat}
                    disabled={disabled}
                    remove={removeAnhKhuDat}
                    onRemove={setRemoveAnhKhuDat}
                    type={TYPE_IMAGE_CAP_MOI.ANH_KHU_DAT}
                  />
                  {messageKhuDat && <span className="require">{messageKhuDat}</span>}
                </div>

                <div className="image-kd">
                  <CustomInfo
                    text={"Chứng từ nghĩa vụ tài chính (nếu có) (bản sao)"}
                    info={"Là ảnh scan của chứng tử nghĩa vụ tài chính"}
                  />
                  <UploadImage
                    data={nghiaVuTaiChinh}
                    onChange={setNghiaVuTaiChinh}
                    disabled={disabled}
                    remove={removeNghiaVuTaiChinh}
                    onRemove={setRemoveNghiaVuTaiChinh}
                    type={TYPE_IMAGE_CAP_MOI.CHUNG_TU_NGHIA_VU_TAI_CHINH}
                  />
                </div>

                <div className="image-kd">
                  <CustomInfo
                    text={"Các loại giấy tờ về quyền sử dụng đất"}
                    info={"Là ảnh scan của các loại giấy tờ sử dụng đất (nếu có)"}
                  />
                  <UploadImage
                    data={cacLoaiGiayTo}
                    onChange={setCacLoaiGiayTo}
                    disabled={disabled}
                    remove={removeCacLoaiGiayTo}
                    onRemove={setRemoveCacLoaiGiayTo}
                    type={TYPE_IMAGE_CAP_MOI.OTHER}
                  />
                </div>

                <div className="image-kd">
                  <CustomInfo
                    text={"Hợp đồng, văn bản(Trường hợp có đăng ký quyền sử dụng đất hạn chế đối với thửa đất liền kề)"}
                    info={
                      "Nếu người yêu cầu muốn đăng ký quyền sử dụng đất đối với thửa đất liền kề hãy upload ảnh scan tài liệu minh chứng"
                    }
                  />
                  <UploadImage
                    data={hopDong}
                    onChange={setHopDong}
                    disabled={disabled}
                    remove={removeHopDong}
                    onRemove={setRemoveHopDong}
                    type={TYPE_IMAGE_CAP_MOI.HOP_DONG}
                  />
                </div>
              </Form>
            </div>
          </div>
        </BaseContent>
        {!disabled && (
          <div className="btn-submit-tmgt">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => formRef.current.submit()}
              loading={isLoading}
              disabled={isLoading}
            >
              {id ? "Cập nhật thông tin" : "Thêm mới"}
            </Button>
          </div>
        )}
      </Loading>
      <DialogDeleteConfim visible={visibleXoa} onCancel={setChangeVisibleXoa} onOK={deleteGiayTo} />
      <VerifyDigitalSignature visible={showPK} handleVisible={showVisibleKey} onSubmit={sendToOrg} />
    </div>
  );
}
function mapStateToProps(store) {
  const { isLoading } = store.app;
  const { myInfo } = store.user;
  return { isLoading, myInfo };
}
export default connect(mapStateToProps)(ThemMoiThemMoiGiayTo);

