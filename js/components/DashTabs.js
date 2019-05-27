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
import MiradorViewer from "./MiradorViewer";
import ChartAccordion from "./ChartAccordion";
import BookmarkModal from "./BookmarkModal";
import SyriacSpinner from "./SyriacSpinner";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class DashTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hiddenManuscripts: [],
      hiddenLetters: [],
      manifestURIs: [],
      windowObjects: [],
      miradorLayout: "1x1",
      tabIndex: 0,
      rowLetters: [],
      columnManuscripts: [],
      bookmarkIsOpen: false
    };

    this.onManifestSelected = this.onManifestSelected.bind(this);
    this.onHiddenChange = this.onHiddenChange.bind(this);
    this.onColumnMove = this.onColumnMove.bind(this);
    this.onRowMove = this.onRowMove.bind(this);
    this.getMiradorParameters = this.getMiradorParameters.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onColumnMove(labels) {
    let sourceShelfmark = labels.sourceLabel;
    let targetShelfmark = labels.targetLabel;

    let columnManuscripts = [];

    if (this.state.columnManuscripts.length == 0) {
      columnManuscripts = [...this.props.submittedFormState.selectedManuscripts];
    } else {
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

    let rowLetters = [];
    if (this.state.rowLetters.length == 0) {
      rowLetters = [...this.props.submittedFormState.letters];
    } else {
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

  /* Note that this helper function can be called before the component
   * state has been updated with manifest and window object data, so it
   * always builds these lists from scratch based on the contents
   * of the "manuscripts" prop.
   */
  getMiradorParameters() {
    let manifestURIs = [];
    let windowObjects = [];
    let miradorLayout = "1x1";

    for (let ms of this.props.submittedFormState.selectedManuscripts) {
      if (ms.manifest === null) {
        continue;
      }
      manifestURIs.push({ manifestUri: ms.manifest });
      if (manifestURIs.length <= 4) {
        let targetSlot = "row1.column1";
        if (manifestURIs.length == 2) {
          miradorLayout = "1x2";
          targetSlot = "row1.column2";
        } else if (manifestURIs.length == 3) {
          miradorLayout = "2x2";
          targetSlot = "row2.column1";
        } else if (manifestURIs.length == 4) {
          miradorLayout = "2x2";
          targetSlot = "row2.column2";
        }
        // XXX Theoretically, could use the canvasID attrib to display a
        // specific canvas within the manifest, instead of just the
        // first page (which is usually a bland cover image). But we'd
        // need to parse the manifest and then apply some selection,
        // heuristic, like "show canvas N/2 of N".
        let windowObject = {
          loadedManifest: ms.manifest,
          targetSlot: targetSlot,
          viewType: "ImageView",
          sidePanel: false,
          displayLayout: false,
          bottomPanel: false,
          canvasControls: {
            annotations: {
              annotationLayer: false,
              annotationCreation: false
            }
          }
        };
        windowObjects.push(windowObject);
      }
    }
    return [manifestURIs, windowObjects, miradorLayout];
  }

  onManifestSelected(selectedManifestURI) {
    let manifestURIs = [...this.state.manifestURIs];
    let windowObjects = [...this.state.windowObjects];
    let miradorLayout = this.state.miradorLayout;

    if (manifestURIs.length == 0 && this.props.submittedFormState.selectedManuscripts) {
      [
        manifestURIs,
        windowObjects,
        miradorLayout
      ] = this.getMiradorParameters();
    }

    /* This code moves the selected manuscript to the front of the list, or
     * adds it there (removing the last manuscript) if it's not already in the
     * list. The idea is that the newly selected manuscript should always be
     * at the top left corner of the viewer's windows, but in practice Mirador
     * ignores the windows' "targetSlot" settings and just displays the manifests
     * in the order in which they're loaded -- so the layout ends up being
     * fairly arbitrary.
     */
    let windowManifests = windowObjects.map(wo => wo.loadedManifest);
    let windowIndex = windowManifests.findIndex(
      wm => wm == selectedManifestURI
    );
    if (windowManifests.length == 4 && windowIndex < 0) {
      windowManifests.pop();
    } else {
      windowManifests.splice(windowIndex, 1);
    }
    windowManifests.unshift(selectedManifestURI);

    windowObjects = [];

    for (let m = 0, len = windowManifests.length; m < len; m++) {
      let targetSlot = "row1.column1";
      if (m == 1) {
        targetSlot = "row1.column2";
      } else if (m == 2) {
        targetSlot = "row2.column1";
      } else if (m == 3) {
        targetSlot = "row2.column2";
      }

      let windowObject = {
        loadedManifest: windowManifests[m],
        targetSlot: targetSlot,
        viewType: "ImageView",
        sidePanel: false,
        displayLayout: false,
        bottomPanel: false,
        canvasControls: {
          annotations: {
            annotationLayer: false,
            annotationCreation: false
          }
        }
      };

      windowObjects.push(windowObject);

      let miradorLayout = "1x1";
      if (windowObjects.length == 2) {
        miradorLayout = "1x2";
      } else if (windowObjects.length >= 3) {
        miradorLayout = "2x2";
      }
    }

    this.setState({ manifestURIs, windowObjects, miradorLayout, tabIndex: 1 });
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

  render() {
    if (this.props.loading) {
      return (<SyriacSpinner></SyriacSpinner>);
    }

    if (!Object.keys(this.props.tableData).length) {
      return (
        <div className="help-text">
          <h5 className="subtitle is-5">
            Please select one or more manuscripts and letters from the
            options menu, then click the "Submit" button.
          </h5>
          <hr />
          <p className="content">
            Here's a quick guide to using the scriptchart and options
            form. For full help documentation, see our{" "}
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
    }

    let columnManuscripts = [];
    let rowLetters = [];

    if (this.state.rowLetters.length == 0) {
      for (
        let j = 0, llen = this.props.submittedFormState.letters.length;
        j < llen;
        j++
      ) {
        rowLetters.push(this.props.submittedFormState.letters[j]);
      }
    } else {
      rowLetters = this.state.rowLetters;
    }

    if (this.state.columnManuscripts.length == 0) {
      for (let i = 0, len = this.props.submittedFormState.selectedManuscripts.length; i < len; i++) {
        columnManuscripts.push(this.props.submittedFormState.selectedManuscripts[i]);
      }
    } else {
      columnManuscripts = this.state.columnManuscripts;
    }

    let manifestURIs = [...this.state.manifestURIs];
    let windowObjects = [...this.state.windowObjects];
    let miradorLayout = this.state.miradorLayout;

    if (manifestURIs.length == 0 && this.props.submittedFormState.selectedManuscripts) {
      [
        manifestURIs,
        windowObjects,
        miradorLayout
      ] = this.getMiradorParameters();
    }

    return (
      <Tabs
        defaultFocus={true}
        selectedIndex={this.state.tabIndex}
        onSelect={tabIndex => this.setState({ tabIndex })}
      >
        <BookmarkModal
          isOpen={this.state.bookmarkIsOpen}
          closeModal={this.closeModal}
          submittedFormState={this.props.submittedFormState}
        />
        <TabList>
          <Tab>
            <FontAwesomeIcon className={"tab-icon"} icon="table" /> Scriptchart
          </Tab>
          <Tab>
            <FontAwesomeIcon className={"tab-icon"} icon="image" /> Manuscripts
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
            <button
              className={"button is-info is-outlined"}
              style={{ verticalAlign: "bottom" }}
              onClick={() =>
                this.setState({
                  bookmarkIsOpen: true
                })
              }
            >
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
            formData={this.props.submittedFormState}
            tableData={this.props.tableData}
            columnManuscripts={columnManuscripts}
            rowLetters={rowLetters}
            onRowMove={this.onRowMove}
            onColumnMove={this.onColumnMove}
          />
        </TabPanel>
        <TabPanel>
          <MiradorViewer
            manifestURIs={manifestURIs}
            miradorLayout={miradorLayout}
            windowObjects={windowObjects}
          />
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
