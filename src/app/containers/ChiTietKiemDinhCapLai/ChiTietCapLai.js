import { LeftOutlined } from "@ant-design/icons";
import { toast, validateSpaceNull } from "@app/common/functionCommons";
import { getReCertificateById, sendReCertificateToOrg, sendResultReCertificateToOrg } from "@app/services/CapLaiGiayTo";
import BaseContent from "@components/BaseContent";
import ArrowRightThick from "@components/Icons/ArrowRightThick";
import Loading from "@components/Loading";
import SendResultToUser from "@components/SendResultToUser/SendResultToUser";
import VerifyDigitalSignature from "@components/VerifyDigitalSignature/VerifyDigitalSignature";
import { CONSTANTS, STATUS_TD, TOAST_MESSAGE, VI_STATUS_THAM_DINH_DEPARTMENT } from "@constants";
import { URL } from "@url";
import { Button, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./ChiTietCapLai.scss";
ChiTietCapLai.propTypes = {};

function ChiTietCapLai({ isLoading }) {
  const history = useHistory();
  const { id } = useParams();
  const [form2] = Form.useForm();
  const [showPK, setShowPK] = useState(false);
  const [magiaytoForm, setMagiaytoForm] = useState(null);
  const disabled = true;
  const [data, setData] = useState(null);
  const [formResult, setFormResult] = useState(null);
  const [showModalResult, setShowModalResult] = useState(false);
  useEffect(() => {
    if (id) {
      getAPI();
    }
  }, [id]);
  const getAPI = async () => {
    const response = await getReCertificateById(id);
    setData(response);
    if (response) {
      form2.setFieldsValue(response);
      setMagiaytoForm(response.magiayto);
    }
  };
  const sendToOrg = async (e) => {
    const response = await sendResultReCertificateToOrg(magiaytoForm, {
      ...formResult,
      private_key: e,
      idForm: id,
    });
    if (response) {
      toast(CONSTANTS.SUCCESS, TOAST_MESSAGE.CAP_LAI.RESPONSE_KIEM_DINH);
      getAPI();
    }
  };
  const showVisibleKey = (e) => {
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
    <>
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
          <div className="ThemMoiCapLaiTD-Container">
            <div className="title">
              <div className="title-left">
                <Link to={URL.MENU.KIEM_DINH_CAP_LAI}>
                  <LeftOutlined style={{ marginRight: "10px" }}></LeftOutlined>
                </Link>
                <span>Thông tin cấp lại</span>
                <div className={`action-dv color-status-${data?.status}`}>
                  <span>{VI_STATUS_THAM_DINH_DEPARTMENT[data?.status]}</span>
                </div>
              </div>
            </div>
            <div className="div_hr"></div>
            <div className="ThemMoiCapLai-content">
              {magiaytoForm && (
                <Link to={URL.TRUY_XUAT_KHU_DAT_ID.format(magiaytoForm)}>
                  <span className="show-more-land-cap-lai">
                    Xem thông tin chi tiết khu đất bạn đang thực hiện tại đây
                  </span>
                </Link>
              )}

              <Form layout={"vertical"} form={form2} labelCol={4} wrapperCol={14} disabled={disabled}>
                <Form.Item label="Tên người sử dụng khu đất" name="tennguoisudung">
                  <Input disabled={true} />
                </Form.Item>
                <Form.Item
                  label="Lý do cấp lại"
                  name="lydocaplai"
                  rules={[
                    { required: true, message: "Lý do cấp lại không thể bỏ trống" },
                    { validator: validateSpaceNull },
                  ]}
                >
                  <TextArea rows={5} />
                </Form.Item>
              </Form>
            </div>
          </div>
        </BaseContent>
        <SendResultToUser visible={showModalResult} onCancel={showModalKetQua} onFinish={finishFormKQ} />
        <VerifyDigitalSignature visible={showPK} handleVisible={showVisibleKey} onSubmit={sendToOrg} />
      </Loading>
    </>
  );
}
function mapStateToProps(store) {
  const { isLoading } = store.app;
  return { isLoading };
}
export default connect(mapStateToProps)(ChiTietCapLai);



