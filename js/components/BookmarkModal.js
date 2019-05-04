import React from 'react';
import Modal from 'react-modal';

import "./modal.css";

// (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#app')

class BookmarkModal extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log("Rendering bookmark modal, open set to " + this.props.modalIsOpen);

    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        shouldCloseOnOverlayClick={true}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Example Modal"
      >
        <div>{this.props.bookmarkURL}</div>
        <button onClick={this.props.closeModal}>close</button>
      </Modal>
    );
  }
}

export default BookmarkModal;