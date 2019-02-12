import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import "./MiradorViewer.css";

export default class MiradorViewer extends Component {

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    Mirador({
      id: "mirador",
      layout: "1x1",
      buildPath: "mirador/",
      data: [
        { manifestUri: "https://digi.vatlib.it/iiif/MSS_Vat.sir.157/manifest.json", "location": "Biblioteca Apostolica Vaticana"},
        { manifestUri: "https://digi.vatlib.it/iiif/MSS_Vat.sir.161/manifest.json", "location": "Biblioteca Apostolica Vaticana"},
        { manifestUri: "https://purl.stanford.edu/zv668dm4974/iiif/manifest", "location": "Stanford University"},
        { manifestUri: "https://iiif.harvardartmuseums.org/manifests/object/320567", "location": "Harvard University"},
        { manifestUri: "https://media.nga.gov/public/manifests/nga_highlights.json", "location": "National Gallery of Art"},
        { manifestUri: "https://media.nga.gov/public/manifests/multispectral_demo.json", "location": "National Gallery of Art"},
      ],
      windowObjects: [{
        loadedManifest: "https://digi.vatlib.it/iiif/MSS_Vat.sir.161/manifest.json",
        viewType: "ImageView"
        //slotAddress: "row1.column1"
      }/*,{
        loadedManifest: "https://media.nga.gov/public/manifests/nga_highlights.json",
        slotAddress: "row1.column2",
        viewType: "ImageView"
      }*/],
      annotationEndpoint: {
        name: "Local Storage",
        module: "LocalStorageEndpoint"
      },
      windowSettings: {
        canvasControls: {
          imageManipulation : {
            manipulationLayer : true,
            controls : {
              mirror : true
            }
          }
        }
      }
    });
  }

  render() {
    return (
      <div id="mirador"></div>
    );
  }
}

// MiradorViewer.propTypes = {
// };

// MiradorViewer.defaultProps = {
// }
