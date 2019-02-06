import React, { Component } from "react";
import PropTypes from "prop-types";

export default class MiradorViewer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    Mirador({
      id: "mirador",
      layout: "1x2",
      buildPath: "/mirador/",
      data: [
        {
          manifestUri:
            "http://iiif.harvardartmuseums.org/manifests/object/299843",
          location: "Harvard University"
        },
        {
          manifestUri:
            "http://iiif.harvardartmuseums.org/manifests/object/304136",
          location: "Harvard University"
        },
        {
          manifestUri:
            "http://iiif.harvardartmuseums.org/manifests/object/198021",
          location: "Harvard University"
        },
        {
          manifestUri:
            "http://iiif.harvardartmuseums.org/manifests/object/320567",
          location: "Harvard University"
        },
        {
          manifestUri:
            "http://media.nga.gov/public/manifests/nga_highlights.json",
          location: "National Gallery of Art"
        },
        {
          manifestUri:
            "https://media.nga.gov/public/manifests/multispectral_demo.json",
          location: "National Gallery of Art"
        }
      ],
      windowObjects: [
        {
          loadedManifest:
            "http://iiif.harvardartmuseums.org/manifests/object/299843",
          viewType: "ImageView",
          slotAddress: "row1.column1"
        },
        {
          loadedManifest:
            "http://media.nga.gov/public/manifests/nga_highlights.json",
          slotAddress: "row1.column2",
          viewType: "ImageView"
        }
      ],
      annotationEndpoint: {
        name: "Local Storage",
        module: "LocalStorageEndpoint"
      },
      windowSettings: {
        canvasControls: {
          imageManipulation: {
            manipulationLayer: true,
            controls: {
              mirror: true
            }
          }
        }
      }
    });
  }

  render() {
    return <div id="mirador" />;
  }
}

// MiradorViewer.propTypes = {
// };

// MiradorViewer.defaultProps = {
// }
