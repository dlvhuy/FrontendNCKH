import { InfoCircleOutlined, LeftOutlined } from "@ant-design/icons";
import { formatDateForm, toast, validateSpaceNull } from "@app/common/functionCommons";
import { getCapMoi, sendResultNewCertificateToOrg } from "@app/services/CapMoiGiayTo";
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
  TYPE_IMAGE_CAP_MOI,
  VI_STATUS_THAM_DINH_DEPARTMENT,
} from "@constants";
import { URL } from "@url";
import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./ChiTietCapMoi.scss";
ChiTietCapMoi.propTypes = {};

function ChiTietCapMoi({ isLoading }) {
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
  const [showModalResult, setShowModalResult] = useState(false);
  const [disabled, onChangeDisabled] = useState(true);
  const [magiayto, setMagiayto] = useState(null);
  const [data, setData] = useState(null);
  const [showPK, setShowPK] = useState(false);
  const [formResult, setFormResult] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
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
  const sendToOrg = async (e) => {
    const response = await sendResultNewCertificateToOrg(id, {
      ...formResult,
      private_key: e,
    });
    if (response) {
      toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.CAP_MOI.RESPONSE_KIEM_DINH);
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
    <div>
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
      <Loading active={isLoading}>
        <BaseContent>
          <div className="ThemMoiGiayToTM-container">
            <div className="header">
              <div className="header-left">
                <div className="info-left-header">
                  <Link to={URL.MENU.KIEM_DINH_CAP_MOI}>
                    <LeftOutlined className="left-out"></LeftOutlined>
                  </Link>
                  <span>Thông tin giấy tờ / thêm mới</span>

                  <div className={`action-dv color-status-${data?.status}`}>
                    <span>{VI_STATUS_THAM_DINH_DEPARTMENT[data?.status]}</span>
                  </div>
                </div>
              </div>
              <div className="header-right"></div>
            </div>
            <div className="div_hr"></div>

            <div className="content">
              <Form layout={"vertical"} form={form} labelCol={4} wrapperCol={14} ref={formRef} disabled={true}>
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
      </Loading>
      <VerifyDigitalSignature visible={showPK} handleVisible={showVisibleKey} onSubmit={sendToOrg} />
      <SendResultToUser visible={showModalResult} onCancel={showModalKetQua} onFinish={finishFormKQ} />
    </div>
  );
}
function mapStateToProps(store) {
  const { isLoading } = store.app;
  return { isLoading };
}
export default connect(mapStateToProps)(ChiTietCapMoi);

