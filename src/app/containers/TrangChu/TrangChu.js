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
        {/* <div className="all">
          <div className="top_intro">
            <Row gutter={16}>
              <Col xs={24} sm={5}>
                <Image className="ilus_img_1" src={myImage_1} alt="Hình ảnh" />
              </Col>
              <Col xs={24} sm={19}>
                <div className="top_intro_content">
                  <Typography.Title level={2}>CÔNG NGHỆ BLOCK CHAIN</Typography.Title>
                  <Typography.Paragraph>
                    Chào mừng bạn đến với land use paper management - Nền tảng Truy Xuất, Cấp Mới, và Chuyển Nhượng Đất
                    hiện đại và độc đáo. Chúng tôi tự hào giới thiệu một cách tiếp cận sáng tạo và đột phá trong việc
                    quản lý, cấp mới và chuyển nhượng đất thông qua sự kết hợp của React JS và công nghệ Blockchain.{" "}
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
                  <Typography.Title level={3}>DỄ DÀNG, NHANH CHÓNG, TRUY XUẤT THÔNG TIN</Typography.Title>
                  <Typography.Paragraph>
                    Giao diện người dùng thân thiện của chúng tôi giúp bạn dễ dàng thực hiện các giao dịch liên quan đến
                    đất đai chỉ trong vài bước đơn giản, truy cập thông tin và thực hiện giao dịch từ bất kỳ đâu, bất kỳ
                    lúc nào.
                  </Typography.Paragraph>
                  <Button type="primary">Đọc thêm</Button>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className="grid_item">
                  <Image className="ilus_img_2" src={myImage_3} alt="Hình ảnh" />
                  <Typography.Title level={3}>NỀN TẢNG CUNG CẤP CHO BẠN NHỮNG TÍNH NĂNG GÌ ?</Typography.Title>
                  <Typography.Paragraph>
                    Cho phép bạn truy cập thông tin và thực hiện giao dịch từ bất kỳ đâu, bất kỳ lúc nào, Thực hiện các
                    giao dịch cấp mới và chuyển nhượng đất đai một cách dễ dàng, Xem lịch sử giao dịch và cấp mới để đảm
                    bảo tính minh bạch và tuân thủ quy định pháp luật.{" "}
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
                          Hãy đồng hành cùng chúng tôi trong hành trình hiện đại hóa quản lý tài sản đất đai. Nếu bạn có
                          bất kỳ câu hỏi hoặc cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi tại{" "}
                          <a href="Tel:0859734136">xxx</a> hoặc qua{" "}
                          <a href="mailto: trinhsytuan@gmail.com">trinhsytuan@gmail.com</a>. Chúng tôi luôn sẵn sàng để
                          hỗ trợ bạn.{" "}
                        </Typography.Paragraph>
                        <Button type="primary">
                          <a href="mailto: trinhsytuan@gmail.com">Liên hệ mail</a>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div> */}
      </Loading>
    </BaseContent>
  );
}

function mapStateToProps(store) {
  const { isLoading } = store.app;
  return { isLoading };
}

export default connect(mapStateToProps)(TrangChu);

