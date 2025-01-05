import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Steps } from "antd";
import IconVerifyAndLoading from "@components/Icons/IconVerifyAndLoading";
import "./ModalShowVerifyBlockchain.scss";
ModalShowVerifyBlockchain.propTypes = {};

function ModalShowVerifyBlockchain({ isVisible, handleCancel, linkToUrl }) {
  const [stepCurrent, setStepCurrent] = useState(0);
  const [content, setContent] = useState([
    {
      title: "Xác minh nguồn gốc",
      description: "Đảm bảo dữ liệu được ghi nhận bởi địa chỉ Blockchain hợp lệ",
    },
  ]);
  useEffect(() => {
    if (isVisible) {
      let textContent = content;
      const firstTimeout = setTimeout(() => {
        setStepCurrent(1);
        textContent = [
          ...textContent,
          {
            title: "So sánh mã băm",
            description: "Đảm bảo dữ liệu toàn vẹn, không bị chỉnh sửa",
          },
        ];
        setContent(textContent);
      }, 1500);
      const secondTimeout = setTimeout(() => {
        setStepCurrent(2);
        textContent = [
          ...textContent,
          {
            title: "Kiểm tra trạng thái",
            description: "Đảm bảo dữ liệu là bản cập nhật mới nhất và còn hạn sử dụng",
          },
        ];
        setContent(textContent);
      }, 3000);
      const thirdTimeout = setTimeout(() => {
        setStepCurrent(3);
        textContent = [
          ...textContent,
          {
            title: "Xác thực thành công",
            description: "Đây là thông tin hợp lệ và được xác thực trên nền tảng Blockchain của Nhóm 1",
            link: linkToUrl,
          },
        ];
        setContent(textContent);
      }, 4500);
      return () => {
        clearTimeout(firstTimeout);
        clearTimeout(secondTimeout);
        clearTimeout(thirdTimeout);
      };
    } else {
      setContent([
        {
          title: "Xác minh nguồn gốc",
          description: "Đảm bảo dữ liệu được ghi nhận bởi địa chỉ Blockchain hợp lệ",
        },
      ]);
      setStepCurrent(0);
    }
  }, [isVisible]);
  return (
    <div>
      <Modal
        visible={isVisible}
        onCancel={handleCancel}
        footer={null}
        title={`Xác thực thông tin`}
        className="modal-show-blockchain"
      >
        <div>
          <Steps direction="vertical" current={stepCurrent}>
            {content.map((res, index) => {
              return (
                <Steps.Step
                  title={res.title}
                  description={
                    <div className="description">
                      <span>{res.description}</span>
                      {res.link && (
                        <a href={res.link} target="_blank" className="aBlod">
                          Xem chi tiết
                        </a>
                      )}
                    </div>
                  }
                  key={index}
                  icon={<IconVerifyAndLoading />}
                ></Steps.Step>
              );
            })}
          </Steps>
        </div>
      </Modal>
    </div>
  );
}

export default ModalShowVerifyBlockchain;

