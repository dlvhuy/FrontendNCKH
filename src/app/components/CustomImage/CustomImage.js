import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CustomImage.scss";
import { Dropdown, Image, Menu, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";
CustomImage.propTypes = {};

function CustomImage({ data, onRemove, disabled, idIndex }) {
  const typeUrl = (image) => {
    if (image instanceof Blob || image instanceof File) {
      return URL.createObjectURL(image);
    } else if (typeof image === "string") {
      return image;
    }
  };
  const [visible, setVisible] = useState(false);
  const handlePreview = () => {
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };
  return (
    <div className="custom-image-container">
      <div className="header-action">
        <div className="header-file-name">
          <span>{data.fileName}</span>
        </div>
        {!disabled && (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={1} className="hoverable" onClick={() => onRemove(idIndex)}>
                  Xoá
                </Menu.Item>
              </Menu>
            }
          >
            <MoreOutlined />
          </Dropdown>
        )}
      </div>
      <div className="border-out">
        <div className="image-in">
          <Image src={typeUrl(data.url)} width={152} height={140} preview={false} onClick={handlePreview} />
          <Modal visible={visible} onCancel={handleClose} footer={null} title={data.fileName} width={800}>
            <img src={typeUrl(data.url)} alt="Preview" style={{ width: "100%", height: "100%" }} />
          </Modal>
        </div>
        
      </div>
    </div>
  );
}

export default CustomImage;


