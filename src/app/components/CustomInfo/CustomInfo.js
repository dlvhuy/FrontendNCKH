import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import "./CustomInfo.scss";
import {  InfoCircleOutlined } from "@ant-design/icons";
CustomInfo.propTypes = {};

function CustomInfo({ text, info }) {
  return (
    <div className="custom-info-container">
      <span>{text}</span>
      <Tooltip placement="top" title={info} className="tooltip-info">
        <InfoCircleOutlined />
      </Tooltip>
    </div>
  );
}

export default CustomInfo;

