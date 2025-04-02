import { CONSTANT_MESSAGE } from "@constants";
import { Button, Modal } from "antd";
import './ModalSign.scss';
import React, { useEffect } from 'react';
import DeleteIcon from "@components/Icons/DeleteIcon";

function ModalSign({ visible, onCancel, onOK, isApprove, data,onReject }) {
  if (!data) {
    return null; // Không hiển thị modal nếu data null
  }
  return (
    <div className="delete-confim-container">
      <Modal visible={visible} onCancel={onCancel} footer={null}>
        <div className="delete-confim-children">
          <div className="delete-confim-icon">
            <img src={DeleteIcon} />
          </div>
          <div className="delete-confim-title">
            <span>{isApprove ? "Xác nhận xét duyệt" : "Xác nhận ký"} </span>
          </div>
          <div className="delete-confim-body">
            <div className="property">
              <div className="property-body">
                <span>Tên: </span>
                <p>
                  {data.studentId.name}
                </p>
              </div>
              <div className="property-body"> <span>Chuyên ngành: </span>
                <p>
                  {data.studentId.major}
                </p></div>
              <div className="property-body"> 
                <span>Điểm gpa: </span>
                <p>
                  {data.studentId.gpaType4}
                </p></div>
              <div className="property-body"> <span>Xếp loại: </span>
                <p>
                  {data.studentId.degreeClassification}
                </p></div>
              <div className="property-body">
                <span>Trạng thái: </span>
                <p>
                  {data.studentId.status}
                </p>
              </div>
            </div>
          </div>
          <div className="delete-confim-btn">
            {isApprove ?

              (<div className="format-btn">
                <Button className="sign-confirm-btnConfirm" onClick={onOK}>
                  Xét duyệt
                </Button>
                <Button className="sign-confirm-btnConfirm">
                  Từ chối
                </Button>
              </div>) : (
                <Button className="sign-confirm-btnConfirm" onClick={onOK}>
                  Ký
                </Button>
              )
            }
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalSign;