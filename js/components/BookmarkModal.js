import React from 'react';
import Modal from 'react-modal';

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
        //onAfterOpen={this.afterOpenModal}
        onRequestClose={this.props.closeModal}
        //style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
          <button onClick={this.props.closeModal}>close</button>
          <div>I am a modal</div>
      </Modal>
    );
  }
}

export default BookmarkModal;