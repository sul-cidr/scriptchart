import React, { Component } from "react";
import mirador from "mirador";

import "./MiradorViewer.css";

class Mirador extends Component {
  componentDidMount() {
    const { config, plugins } = this.props;
    mirador.viewer(config, plugins);
  }

  componentWillUnmount() {
    console.log("Mirador received unmount hook");
  }

  render() {
    const { config } = this.props;
    return <div {...config} />;
  }
}

export default Mirador;