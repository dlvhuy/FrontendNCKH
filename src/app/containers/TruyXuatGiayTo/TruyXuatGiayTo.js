import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./TruyXuatGiayTo.scss";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import BaseContent from "@components/BaseContent";
import NOT_FOUND_PRODUCT from "@assets/icons/not-found-product.svg";
import Loading from "@components/Loading";
import { getLand } from "@app/services/TruyXuat";
import { Button, Row, Col, Form, Input, Divider, Tooltip } from "antd";
import { URL } from "@url";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { formatDate } from "@app/common/functionCommons";
import RefreshIcon from "@components/Icons/RefreshIcon";
import ModalShowVerifyBlockchain from "@components/ModalShowVerifyBlockchain/ModalShowVerifyBlockchain";
TruyXuatGiayTo.propTypes = {};

function TruyXuatGiayTo({ isLoading }) {
  const history = useHistory();
  const [data, setData] = useState(undefined);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [linkToBlock, setLinkToBlock] = useState("");
  const handleClickBlock = (link) => {
    setShowModal(true);
    setLinkToBlock(URL.TRANSACTION_ID.format(link));
  };
  const [isSubmit, setIsSubmit] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getAPI();
      form.setFieldsValue({ makhudat: id });
    } else setData(null);
  }, [id]);
  const cancelModal = () => {
    setShowModal(false);
    setLinkToBlock("");
  };
  const getAPI = async () => {
    setIsSubmit(true);
    getLand(id)
      .then((res) => {
        console.log(res);
        if (res) setData(res);
        else setData(null);
      })
      .catch((e) => {
        setData(null);
      });
  };
  const formSubmit = (e) => {
    history.push(URL.TRUY_XUAT_GIAY_TO_ID.format(e.makhudat));
  };
  const resetForm = () => {
    form.resetFields();
    setIsSubmit(false);
    setData(undefined);
  };
  return (
    <Loading active={isLoading}>
      <BaseContent>
        <Form onFinish={formSubmit} className="info_product" form={form}>
          <Col xxl={13} xl={15} lg={19} md={21} sm={21} xs={21}>
            <Form.Item
              name="makhudat"
              className="info_product__code"
              rules={[{ required: true, message: "Vui lòng nhập thông tin mã khu đất" }]}
            >
              <Input
                placeholder="Nhập thông tin mã khu đất"
                prefix={
                  isSubmit ? (
                    <Button
                      onClick={resetForm}
                      className="info_product__iconReset"
                      icon={<CloseOutlined className="info_product__iconClose" />}
                      type="primary"
                    />
                  ) : (
                    <span />
                  )
                }
              ></Input>
            </Form.Item>
          </Col>
          <Col span={2} style={{ display: "flex", alignItems: "center" }}>
            <Button type="primary" className="btn_sp" htmlType="submit">
              <SearchOutlined className="btn_sp__icon-search" />
            </Button>
          </Col>
        </Form>
        {isSubmit === true && data === null && (
          <div className="show_info_product_notfound">
            <div className="show_info_product__notFound">
              <img src={NOT_FOUND_PRODUCT} alt="Not Found" />
              <span>Không tìm thấy khu đất bạn cần tìm</span>
            </div>
          </div>
        )}
        {isSubmit == true && data != null && (
          <div className="seekPage">
            <h2>THÔNG TIN GIẤY TỜ MÃ: {data?.magiayto}</h2>
            <Divider></Divider>

            {/* Thông tin người sử dụng đất */}
            <p className="titleInfo">
              <i class="bx bx-user-circle"></i> Thông tin người sử dụng đất
            </p>
            <Row gutter={[10, 10]}>
              <Col xs={24} sm={12} md={12}>
                <b>Tên người sử dụng đất: </b> {data?.tennguoisudung}
              </Col>
              <Col xs={24} sm={12} md={12}>
                <b>Số căn cước công dân: </b> {data?.cccd}
              </Col>
              <Col xs={24} sm={12} md={12}>
                <b>Ngày cấp căn cước công dân: </b>
                {data?.ngaycapcccd}
              </Col>
              <Col xs={24} sm={12} md={12}>
                <b>Nghề nghiệp: </b> {data?.nghenghiep}
              </Col>
            </Row>

            <Divider></Divider>
            {/* Thông tin giấy tờ đất */}
            <p className="titleInfoSecond">
              <i class="bx bx-receipt"></i> Thông tin khu đất
            </p>
            <Row gutter={[10, 10]}>
              <Col xs={24} sm={12} md={12}>
                <b>Mã giấy tờ: </b> {data?.magiayto}
              </Col>
              <Col xs={24} sm={12} md={12}>
                <b>Số thửa đất: </b> {data?.sothuadat}
              </Col>
              <Col xs={24} sm={12} md={12}>
                <b>Tờ bản đồ số: </b> {data?.tobandoso}
              </Col>
              <Col xs={24} sm={12} md={12}>
                <b>Thửa đất đăng ký: </b> {data?.thuadatdangky}
              </Col>
              <Col xs={24} sm={12} md={12}>
                <b>Thời hạn sử dụng: </b> {data?.thoihansudung}
              </Col>
              <Col xs={24} sm={12} md={12}>
                <b>Diện tích (m2): </b>Sử dụng chung {data?.sudungchung} | sử dụng riêng {data.sudungrieng}
              </Col>
              <Col xs={24} sm={12} md={12}>
                <b>Nguồn gốc: </b> {data?.thoihansudung}
              </Col>
              <Col xs={24} sm={12} md={12}>
                <b>Mục đích sử dụng: </b> {data?.mucdichsd}
              </Col>
              <Col xs={24} sm={12} md={12}>
                <b>Nơi cấp </b> {data?.noicap}
              </Col>
            </Row>

            <Divider></Divider>
            {/* Thông tin thêm */}
            <p className="titleInfoSecond">
              <i class="bx bx-info-circle"></i> Thông tin thêm
            </p>
            <Row gutter={[10, 10]}>
              <Col xs={24} sm={12} md={12}>
                <b>Ngày tạo: </b> {formatDate(data?.createdAt)}
              </Col>
              <Col xs={24} sm={12} md={12}>
                <b>Ngày cập nhật : </b> {formatDate(data?.updatedAt)}
              </Col>
            </Row>
            <br></br>
            {data?.txtId && (
              <div className="verify_checked" onClick={() => handleClickBlock(data?.txtId)}>
                <Tooltip placement="top" title={"Xác thực lại"}>
                  <a>Thông tin đã được xác thực trên hệ thống Blockchain</a>
                  <RefreshIcon />
                </Tooltip>
              </div>
            )}
          </div>
        )}
      </BaseContent>
      <ModalShowVerifyBlockchain
        isVisible={showModal}
        handleCancel={cancelModal}
        linkToUrl={linkToBlock}
      ></ModalShowVerifyBlockchain>
    </Loading>
  );
}
function mapStateToProps(store) {
  const { isLoading } = store.app;
  return { isLoading };
}
export default connect(mapStateToProps)(TruyXuatGiayTo);
