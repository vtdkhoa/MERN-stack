import React from 'react'
import './Modal.style.css'

const Modal = ({ handleClose, show, children }) => {
  const modalClassName = show ? 'modal display-block' : 'modal display-none'

  return (
    <div className={modalClassName}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={handleClose}>&times;</span>
          <h2><i className="fas fa-exclamation-triangle" /> Warning</h2>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="btn btn-light" onClick={handleClose}>Close</button>
          <button className="btn btn-danger">
            <i className="fas fa-fa-trash-alt" /> Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal