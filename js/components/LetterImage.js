import React from "react";

class LetterImage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const ctx = this.refs.canvas.getContext('2d');
    const img = this.refs.image;

    //var img = new Image();
    //img.src = this.props.coords.url;
    img.onload = () => {
      ctx.drawImage(img,-this.props.coords["left"],-this.props.coords["top"]);
    }

  }

  render() {
    return (
      <span style={{display: "inline-block"}}>
        <canvas ref="canvas" width={this.props.coords["width"]} height={this.props.coords["height"]} />
        <img ref="image" src={this.props.coords.url} className="hidden" />
      </span>
    );
  }
}

export default LetterImage;
