import React from "react";

/* DashTabs - this is the figurative canvas on which the
 * scriptchart table and accompanying Mirador viewer
 * and ChartAccordion list of hidden manuscripts and letters
 * reside under their own tabs.
 *
 * It is responsible for keeping track of the contents and
 * orderings of the rows and columns in the table, as well
 * as those that have been hidden and are listed in the
 * ChartAccordion. As such, it handles dragging and dropping
 * of rows and columns, as well as hiding/redisplaying them.
 *
 * The component also keeps track of the IIIF manifests available
 * for display via the Mirador viewer component, as well as the
 * manifests that are currently "on display" in the viewer.
 *
 * Conditional rendering: this component displays a text prompt
 * until the configuration form is submitted, at which time it
 * populates the letter and manuscript lists with data that the
 * App has queried from the REST API.
 */

import ScriptChart from "./ScriptChart";
import ChartAccordion from "./ChartAccordion";
import BookmarkModal from "./BookmarkModal";

// There are two ways to embed Mirador 3, see
// https://github.com/ProjectMirador/mirador/issues/2627
import MiradorViewer from "./MiradorViewer";
import { Provider } from 'react-redux';
import createStore from 'mirador/dist/es/src/state/createStore';
import settings from 'mirador/dist/es/src/config/settings';
import * as actions from 'mirador/dist/es/src/state/actions';
//import Mirador from "./Mirador";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./index.css";

//export const VIEWER_ROOT = "https://sul-cidr.github.io/scriptchart/viewer/";
//export const VIEWER_ROOT = "http://localhost:4000/scriptchart/viewer/";
export const VIEWER_ROOT = process.env.VIEWER_ROOT;

const MAX_MIRADOR_WINDOWS = 4;

class DashTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hiddenManuscripts: [],
      hiddenLetters: [],
      tabIndex: 0,
      rowLetters: [],
      columnManuscripts: [],
<<<<<<< HEAD
      bookmarkURL: null,
      bookmarkIsOpen: false
=======
      bookmarkURL: VIEWER_ROOT,
      bookmarkIsOpen: false,
      miradorState: {},
      manifestMiddleCanvases: {},
      allowUpdates: false
>>>>>>> 6f44293... Tab switches, Mirador window swapping and middle canvas selection all work
    };

    this.onManifestSelected = this.onManifestSelected.bind(this);
    this.onHiddenChange = this.onHiddenChange.bind(this);
    this.onColumnMove = this.onColumnMove.bind(this);
    this.onRowMove = this.onRowMove.bind(this);
    this.getBookmark = this.getBookmark.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.findWindowByManifestID = this.findWindowByManifestID.bind(this);
    this.manifestListener = this.manifestListener.bind(this);
  }

  findWindowByManifestID(windows, msid) {
    for (let windowID of Object.keys(windows)) {
      if (windows[windowID].manifestId == msid) {
        return windowID;
      }
    }
    return null;
  }

  manifestListener() {
    
    function findMiddleCanvas(manifest) {
      if (('sequences' in manifest.json) && ('canvases' in manifest.json.sequences[0])) {
        return Math.floor(manifest.json.sequences[0].canvases.length / 2);
      }
      return 0;
    }

    let currentState = this.state.miradorState.getState();
    let manifestMiddleCanvases = this.state.manifestMiddleCanvases;

    for (let msID in currentState.manifests) {
      if ((msID in this.state.manifestMiddleCanvases) || (currentState.manifests[msID].isFetching == true)) {
        continue;
      }
      if ('json' in currentState.manifests[msID]) {
        let middleCanvas = findMiddleCanvas(currentState.manifests[msID]);
        let windowID = this.findWindowByManifestID(currentState.windows, msID);
        let windowProps = currentState.windows[windowID];
        if (windowProps != undefined) {
          windowProps.canvasIndex = middleCanvas; // this is so easy
        }
      }
    }

    if (this.state.allowUpdates && (manifestMiddleCanvases.length > this.state.manifestMiddleCanvases.length)) {
      this.setState({manifestMiddleCanvases});
    }
  }

  onColumnMove(labels) {
    let sourceShelfmark = labels.sourceLabel;
    let targetShelfmark = labels.targetLabel;

    let columnManuscripts = [...this.props.manuscripts];
    if (this.state.columnManuscripts.length > 0) {
      columnManuscripts = [...this.state.columnManuscripts];
    }

    let sourceIndex = columnManuscripts.findIndex(
      ms => ms.shelfmark == sourceShelfmark
    );
    let targetIndex = columnManuscripts.findIndex(
      ms => ms.shelfmark == targetShelfmark
    );

    /* Cancel the move if it involves the first two,
     * 'pre-manuscript' columns (which contain the row
     * letter labels and the Xs used to hide rows).
     */
    if (sourceIndex < 0 || targetIndex < 0) {
      return;
    }

    columnManuscripts[sourceIndex] = columnManuscripts.splice(
      targetIndex,
      1,
      columnManuscripts[sourceIndex]
    )[0];

    this.setState({ columnManuscripts });
  }

  onRowMove({ sourceRowId, targetRowId }) {
    if (
      sourceRowId == "Date" ||
      sourceRowId == "" ||
      targetRowId == "Date" ||
      targetRowId == ""
    ) {
      return;
    }

    let rowLetters = [...this.props.formData.letters];
    if (this.state.rowLetters.length > 0) {
      rowLetters = [...this.state.rowLetters];
    }

    let sourceIndex = rowLetters.findIndex(lt => lt.id == sourceRowId);
    let targetIndex = rowLetters.findIndex(lt => lt.id == targetRowId);

    rowLetters[sourceIndex] = rowLetters.splice(
      targetIndex,
      1,
      rowLetters[sourceIndex]
    )[0];

    this.setState({ rowLetters });
  }

  closeModal() {
    this.setState({ bookmarkIsOpen: false });
  }

  getBookmark() {
    let letterNames = this.props.formData.letters.map(obj => obj.letter);
    if (this.state.rowLetters.length > 0) {
      letterNames = this.state.rowLetters.map(obj => obj.letter);
    }

    let msNames = this.props.formData.selectedShelfmarks;
    if (this.state.columnManuscripts.length > 0) {
      msNames = this.state.columnManuscripts.map(obj => obj.shelfmark);
    }

    /* Chart display options are formatted <#examples><binarized, cropped, all><imagesize><hover, click><marginsize>
     * with each option represented by a single number or letter: [1-5] + [b|c|a] + [s|m|l] + [h|c] + [s|m|l]
     */
    let letterExamples = 3;
    if (
      this.props.formData.LetterExamples >= 1 &&
      this.props.formData.letterExamples <= 5
    ) {
      letterExamples = this.props.formData.letterExamples;
    }
    let binarizedAndOrCropped = "b";
    if (this.props.formData.showBinarized && this.props.formData.showCropped) {
      binarizedAndOrCropped = "a";
    } else if (this.props.formData.showCropped) {
      binarizedAndOrCropped = "c";
    }

    let imageSize = "m";
    if (this.props.formData.imageSize == "Large") {
      imageSize = "l";
    } else if (this.props.formData.imageSize == "Small") {
      imageSize = "s";
    }

    let hoverOrClick = "h";
    if (this.props.formData.contextMode == "click") {
      hoverOrClick = "c";
    }

    let contextSize = "l";
    if (this.props.formData.contextSize == "small") {
      contextSize = "s";
    } else if (this.props.formData.contextSize == "med") {
      contextSize = "m";
    }

    let optionsString =
      letterExamples +
      binarizedAndOrCropped +
      imageSize +
      hoverOrClick +
      contextSize;

    let formDataLink =
      "?mss=" +
      msNames.join("|") +
      "&letters=" +
      letterNames.join("|") +
      "&opts=" +
      optionsString;

    return [
      window.location.protocol,
      "//",
      window.location.host,
      window.location.pathname,
      formDataLink
    ].join("");
  }

  onManifestSelected(selectedManifestURI) {

    let miradorState = this.state.miradorState.getState();

    let matchingWindow = this.findWindowByManifestID(miradorState.windows, selectedManifestURI);

    if (matchingWindow === null) {
      let windowsCount = Object.keys(miradorState.windows).length;
      let windowLayoutOrder = windowsCount + 1;
      if (windowsCount >= MAX_MIRADOR_WINDOWS) {
        let windowToClose = Object.keys(miradorState.windows)[0];
        windowLayoutOrder = miradorState.windows[windowToClose].layoutOrder;
        this.state.miradorState.dispatch(actions.focusWindow(windowToClose));
        this.state.miradorState.dispatch(actions.removeWindow(windowToClose));
        this.state.miradorState.dispatch(actions.updateWorkspaceMosaicLayout());
      }
      let windowProps = {
        manifestId: selectedManifestURI,
        canvasIndex: 0,
        collectionIndex: 0,
        sideBarOpen: false,
        view: "single",
        thumbnailNavigationPosition: "far-bottom",
        draggingEnabled: true,
        layoutOrder: windowLayoutOrder
      }
      this.state.miradorState.dispatch(actions.addWindow(windowProps));

      this.setState({ tabIndex: 1 });
    }
  }

  onHiddenChange(showOrHide, rowOrColumn, itemID) {
    if (showOrHide == "show") {
      // Show (aka "unhide") requests only come from the accordion and are sent to the scriptchart
      if (rowOrColumn == "column") {
        let hiddenIndex = this.state.hiddenManuscripts.findIndex(
          i => i == itemID
        );
        if (hiddenIndex !== -1) {
          let hiddenCopy = [...this.state.hiddenManuscripts];
          hiddenCopy.splice(hiddenIndex, 1);
          this.setState({ hiddenManuscripts: hiddenCopy });
          if (hiddenCopy.length == 0 && this.state.hiddenLetters.length == 0) {
            this.setState({ tabIndex: 0 });
          }
        }
      } else if (rowOrColumn == "row") {
        let hiddenIndex = this.state.hiddenLetters.findIndex(i => i == itemID);
        if (hiddenIndex !== -1) {
          let hiddenCopy = [...this.state.hiddenLetters];
          hiddenCopy.splice(hiddenIndex, 1);
          this.setState({ hiddenLetters: hiddenCopy });
          if (
            hiddenCopy.length == 0 &&
            this.state.hiddenManuscripts.length == 0
          ) {
            this.setState({ tabIndex: 0 });
          }
        }
      }
    } else if (showOrHide == "hide") {
      // Hide requests only come from the scriptchart and are sent to the accordion
      if (rowOrColumn == "column") {
        this.setState({
          hiddenManuscripts: [...this.state.hiddenManuscripts, itemID]
        });
      } else if (rowOrColumn == "row") {
        this.setState({
          hiddenLetters: [...this.state.hiddenLetters, itemID]
        });
      }
    }
  }

  componentDidMount() {
    this.setState({allowUpdates: true});
  }

  componentWillMount() {

    let manifestURIs = [];
    for (let ms of this.props.manuscripts) {
      if (ms.manifest === null) {
        continue;
      }
      manifestURIs.push(ms.manifest);
    }

    let miradorState = createStore();
    settings.id = 'mirador';
    settings.workspace.type = "mosaic";
    miradorState.dispatch(actions.setConfig(settings));
    miradorState.dispatch(actions.setWorkspaceAddVisibility(true));
    for (let manifestURL of manifestURIs) {
      miradorState.dispatch(actions.fetchManifest(manifestURL));
    }

    for (let m = 0; m < Math.min(MAX_MIRADOR_WINDOWS, manifestURIs.length); m++) {
      let windowProps = {
        manifestId: manifestURIs[m],
        canvasIndex: 0,
        collectionIndex: 0,
        sideBarOpen: false,
        view: "single",
        thumbnailNavigationPosition: "far-bottom",
        draggingEnabled: true,
        layoutOrder: m+1
      }
      miradorState.dispatch(actions.addWindow(windowProps));
    }

    miradorState.dispatch(actions.setWorkspaceAddVisibility(false));

    miradorState.subscribe(this.manifestListener);
    this.setState({miradorState});
  }

  render() {
    if (this.props.showTabs == false && this.props.loadingMessage == "") {
      return (
        <div className="help-text">
          <h5 className="subtitle is-5">
            Please select one or more manuscripts and letters from the options
            menu, then click the "Submit" button.
          </h5>
          <hr />
          <p className="content">
            Here's a quick guide to using the scriptchart and options form. For
            full help documentation, see our{" "}
            <a href={"../guide/"}>How-to Guide</a>.
          </p>
          <img
            src="../assets/img/help-images/dash-tabs.png"
            alt="Explanation of DASH Tabs"
          />
          <hr/>
          <img
            src="../assets/img/help-images/options-annotated.png"
            alt="Explanation of DASH Options Panel"
          />
        </div>
      );
    } else if (
      this.props.showTabs == false &&
      this.props.loadingMessage != ""
    ) {
      return (
        <div>
          <span>
            <strong>{this.props.loadingMessage}</strong>
          </span>
        </div>
      );
    }

    let columnManuscripts = [];
    let rowLetters = [];

    if (this.state.rowLetters.length == 0) {
      for (
        let j = 0, llen = this.props.formData.letters.length;
        j < llen;
        j++
      ) {
        rowLetters.push(this.props.formData.letters[j]);
      }
    } else {
      rowLetters = this.state.rowLetters;
    }

    if (this.state.columnManuscripts.length == 0) {
      for (let i = 0, len = this.props.manuscripts.length; i < len; i++) {
        columnManuscripts.push(this.props.manuscripts[i]);
      }
    } else {
      columnManuscripts = this.state.columnManuscripts;
    }

    return (
      <Tabs
        defaultFocus={true}
        selectedIndex={this.state.tabIndex}
        onSelect={tabIndex => this.setState({ tabIndex })}
      >
        <BookmarkModal
          isOpen={this.state.bookmarkIsOpen}
          bookmarkURL={this.state.bookmarkURL}
          closeModal={this.closeModal}
        />
            <TabList>
              <Tab>
                <FontAwesomeIcon className={"tab-icon"} icon="table" />{" "}
                Scriptchart
              </Tab>
              <Tab>
                <FontAwesomeIcon className={"tab-icon"} icon="image" />{" "}
                Manuscripts
              </Tab>
              <Tab
                disabled={
                  this.state.hiddenManuscripts.length == 0 &&
                  this.state.hiddenLetters.length == 0
                }
              >
                Hidden Items
              </Tab>
              <span>
                <button className={"button is-info is-outlined"}
                        style={{verticalAlign: "bottom"}}
                        onClick={this.getBookmark}>
                  Bookmark
                </button>
              </span>
            </TabList>
            <TabPanel>
              <ScriptChart
                onHiddenChange={this.onHiddenChange}
                hiddenManuscripts={this.state.hiddenManuscripts}
                hiddenLetters={this.state.hiddenLetters}
                onManifestSelected={this.onManifestSelected}
                formData={this.props.formData}
                tableData={this.props.tableData}
                columnManuscripts={columnManuscripts}
                rowLetters={rowLetters}
                onRowMove={this.onRowMove}
                onColumnMove={this.onColumnMove}
              />
            </TabPanel>
            <TabPanel>
              <Provider store={this.state.miradorState}>
                <MiradorViewer/>
              </Provider>
              {/*<Mirador config={{ id: "mirador",
                                 manifests: manifestURIs,
                                 windows=this.props.windowObjects
                                 }} />*/}
            </TabPanel>
            <TabPanel>
              <ChartAccordion
                onHiddenChange={this.onHiddenChange}
                columnManuscripts={columnManuscripts}
                hiddenManuscripts={this.state.hiddenManuscripts}
                hiddenLetters={this.state.hiddenLetters}
              />
            </TabPanel>
            
          </Tabs>
    );
  }
}

export default DashTabs;
