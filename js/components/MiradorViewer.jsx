import React, { Component } from "react";

import "./MiradorViewer.css";

export default class MiradorViewer extends Component {
  componentDidMount() {
    Mirador({
      id: "mirador",
      layout: "1x1",
      buildPath: "mirador/",
      data: [
        {
          manifestUri: this.props.manifestURL,
          location: "Stanford University"
        },
        {
          manifestUri: "https://iiif.lib.harvard.edu/manifests/drs:42715137",
          location: "Harvard Library"
        },
        {
          manifestUri:
            "https://digi.vatlib.it/iiif/MSS_Vat.sir.157/manifest.json",
          location: "Biblioteca Apostolica Vaticana"
        },
        {
          manifestUri:
            "https://digi.vatlib.it/iiif/MSS_Vat.sir.161/manifest.json",
          location: "Biblioteca Apostolica Vaticana"
        },
        {
          manifestUri:
            "https://gallica.bnf.fr/iiif/ark:/12148/btv1b531151912/manifest.json",
          location: "Bibliotheque Nationale"
        },
        {
          manifestUri:
            "https://gallica.bnf.fr/iiif/ark:/12148/btv1b10528606c/manifest.json",
          location: "Bibliotheque Nationale"
        }
      ],
      windowObjects: [
        {
          loadedManifest: this.props.manifestURL,
          viewType: "ImageView"
        }
      ],
      annotationEndpoint: {
        name: "Local Storage",
        module: "LocalStorageEndpoint"
      },
      openManifestPage: false,
      sidePanel: false
      /*windowSettings: {
        canvasControls: {
          imageManipulation: {
            manipulationLayer: true,
            controls: {
              mirror: true
            }
          }
        }
      }*/
    });
  }

  render() {
    return <div id="mirador" />;
  }
}
