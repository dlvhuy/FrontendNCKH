import React from "react";
import { connect } from "react-redux";
import { Typography, Row, Col, Image, Divider } from "antd";
import "./TrangChu.scss";
import myImage_1 from "@assets/images/illustrates/i_1.jpg";
import myImage_2 from "@assets/images/illustrates/i_2.jpg";
import myImage_3 from "@assets/images/illustrates/i_4.jpg";
import myImage_4 from "@assets/images/illustrates/i_5.png";

import BaseContent from "@components/BaseContent";
import { Button } from "antd";
import Loading from "@components/Loading";

function TrangChu({ isLoading, ...props }) {
  return (
    <BaseContent>
      <Loading active={isLoading}>
        <div className="all">
          <div className="top_intro">
            <Row gutter={16}>
              <Col xs={24} sm={5}>
                <Image className="ilus_img_1" src={myImage_1} alt="Hình ảnh" />
              </Col>
              <Col xs={24} sm={19}>
                <div className="top_intro_content">
                  <Typography.Title level={2}>QUẢN LÝ VĂN BẰNG CHỨNG CHỈ BẰNG BLOCKCHAIN</Typography.Title>
                  <Typography.Paragraph>
                  Chào mừng bạn đến với hệ thống quản lý văn bằng chứng chỉ của Trường Đại học Hồng Đức. Đây là nền tảng hiện đại áp dụng công nghệ Blockchain - Hyperledger Fabric để đảm bảo tính minh bạch, bảo mật và khả năng xác thực thông tin chính xác..{" "}
                  </Typography.Paragraph>
                  <Button type="primary">
                    <a href="https://aws.amazon.com/vi/what-is/blockchain/?aws-products-all.sort-by=item.additionalFields.productNameLowercase&aws-products-all.sort-order=asc">
                      Đọc thêm
                    </a>
                  </Button>
                </div>
              </Col>
            </Row>
          </div>

          <div className="grid_intro">
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <div className="grid_item">
                  <Image className="ilus_img_2" src={myImage_2} alt="Hình ảnh" />
                  <Typography.Title level={3}>TRA CỨU NHANH CHÓNG, CHÍNH XÁC</Typography.Title>
                  <Typography.Paragraph>
                  Sinh viên, nhà tuyển dụng và các tổ chức có thể dễ dàng truy xuất thông tin văn bằng, chứng chỉ một cách nhanh chóng và chính xác. Hệ thống đảm bảo dữ liệu không thể bị giả mạo, nâng cao uy tín của Trường Đại học Hồng Đức.
                  </Typography.Paragraph>
                  <Button type="primary">Đọc thêm</Button>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className="grid_item">
                  <Image className="ilus_img_2" src={myImage_3} alt="Hình ảnh" />
                  <Typography.Title level={3}>NỀN TẢNG CUNG CẤP CHO BẠN NHỮNG TÍNH NĂNG GÌ ?</Typography.Title>
                  <Typography.Paragraph>
                  - Cấp phát văn bằng chứng chỉ điện tử với xác thực Blockchain.
                  - Kiểm tra và xác thực tính hợp lệ của chứng chỉ dễ dàng.
                  </Typography.Paragraph>
                  <Button type="primary">Đọc thêm</Button>
                </div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24}>
                <div className="grid_item">
                  <Row gutter={16}>
                    <Col xs={24} sm={5}>
                      <Image className="ilus_img_1" src={myImage_4} alt="Hình ảnh" />
                    </Col>
                    <Col xs={24} sm={19}>
                      <div className="top_intro_content">
                        <Typography.Title level={2}>Liên Hệ Với Chúng Tôi</Typography.Title>
                        <Typography.Paragraph>
                        Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi tại{" "}
                          <a href="Tel:0971467770">xxx</a> hoặc qua{" "}
                          <a href="mailto: vanhuy098420@gmail.com">vanhuy098420@gmail.com</a>. Chúng tôi luôn sẵn sàng để
                          hỗ trợ bạn.{" "}
                        </Typography.Paragraph>
                        <Button type="primary">
                          <a href="mailto: vanhuy098420@gmail.com">Liên hệ mail</a>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Loading>
    </BaseContent>
  );
}

function mapStateToProps(store) {
  const { isLoading } = store.app;
  return { isLoading };
}

export default connect(mapStateToProps)(TrangChu);

