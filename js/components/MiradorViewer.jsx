import React, { Component } from "react";

/* MiradorViewer - embedded version of the Mirador IIIF viewer application,
 * which is a Javascript app loaded as an NPM module.
 */

import "./MiradorViewer.css";

export default class MiradorViewer extends Component {
  componentDidMount() {
    Mirador({
      id: "mirador",
      mainMenuSettings: { show: false },
      layout: this.props.miradorLayout,
      buildPath: "mirador/",
      data: this.props.manifestURIs,
      windowObjects: this.props.windowObjects,
      openManifestPage: false,
    });
  }

  render() {
    return <div id="mirador" />;
  }
}
