

function ModalSign({ visible, onCancel, onOK }) {
    return (
      <div className="delete-confim-container">
        <Modal visible={visible} onCancel={onCancel} footer={null}>
          <div className="delete-confim-children">
            <div className="delete-confim-icon">
              <img src={DeleteIcon} />
            </div>
            <div className="delete-confim-title">
              <span>Xác nhận xoá</span>
              <input placeholder="Nhập khóa"/>
            </div>
            <div className="delete-confim-body">
              <span>{CONSTANT_MESSAGE.REMOVE}</span>
            </div>
            <div className="delete-confim-btn">
              <Button className="delete-confim-btnConfim" onClick={onOK}>
                Sign
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  
  export default ModalSign;