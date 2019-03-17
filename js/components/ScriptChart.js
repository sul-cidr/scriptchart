import React from "react";

// Only needed if we have child header cells
//import { cloneDeep } from "lodash";

// Remove this soon -- this data will come from DashTabs
// (the parent component) instead
import { manuscripts } from "./ManuscriptsLoader";

import * as dnd from "reactabular-dnd";

import DragTable from "./DragTable";

import SyriacLetter, { letters } from "./SyriacLetter";

import LetterImage from "./LetterImage";

import ColumnControls from "./ColumnControls";

import "./ScriptChart.css";

class ScriptChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      srows: []
      //tableData: {}
    };

    this.getRows = this.getRows.bind(this);
    this.getColumns = this.getColumns.bind(this);
    this.onRow = this.onRow.bind(this);
    this.onMoveRow = this.onMoveRow.bind(this);
    this.onMoveColumn = this.onMoveColumn.bind(this);
    //this.onMoveChildColumn = this.onMoveChildColumn.bind(this);
    this.onHideColumn = this.onHideColumn.bind(this);
    this.onHideRow = this.onHideRow.bind(this);
    this.viewManifest = this.viewManifest.bind(this);
  }

  /* Table data should be stored as a two-dimensional array.
   * First key: letter ID (row)
   * Second key: manuscript ID (column)
   * Value: an Object containing the data necessary to render
   * 1-3 image letter excerpts (binarized or not). This includes
   * the link to the page URL and the coordinates of each letter.
   */

  viewManifest(manifestURL, manifestActivator) {
    console.log("viewManifest called with URL " + manifestURL);
    manifestActivator(manifestURL);
  }

  onHideColumn( manuscriptID, columnHider ) {
    columnHider(manuscriptID);
  }

  /*
  processLetters(coordsData, pageData) {
    let msID = pageData['manuscript'];
    let pageID = pageData['id'];
    let pageURL = pageData['url'];
    if (coordsData.length == 0)
      return;

    console.log("Processing page " + pageID + " from manuscript " + msID + " which has " + coordsData.length + " letter coords");

    let changesMade = false;
    let tableDataCopy = JSON.parse(JSON.stringify(this.state.tableData));
    for (let coords of coordsData) {
      let ltID = coords['letter'];

      if (!(msID in tableDataCopy)) {
        tableDataCopy[msID] = {};
      }
      if (!(ltID in tableDataCopy[msID])) {
        tableDataCopy[msID][ltID] = [];
      }

      if (tableDataCopy[msID][ltID].length >= this.props.formData.letterExamples) {
        console.log("Already have " + tableData[msID][ltID].length + " instances of letter " + letters.find(l => l["id"] == ltID)["display"] + " " + ltID + " on ms " + msID + ", skipping");
        continue;
      }

      if (coords["binary_url"] !== null) {
        let letterInstance = {'page': pageID, 'pageurl': pageURL, 'letter': ltID, 'binaryurl': coords["binary_url"], 'id': coords["id"], 'top': coords["top"], 'left': coords["left"], 'width': coords["width"], 'height': coords["height"] };
        console.log("ADDING NEW LETTER INSTANCE OF id " + ltID + " IN MS " + msID + ": " + letters.find(l => l["id"] == ltID)["display"]);
        tableDataCopy[msID][ltID].push(letterInstance);
      }
      changesMade = true;
    }
    if (true) { //changesMade
      this.setState({ tableData: tableDataCopy });
      console.log("running getRows and getColumns to update state");
      let newRows = this.getRows();
      let newCols = this.getColumns();
      if (newRows.length > 0) {
        console.log("UPDATING ROWS STATE");
        this.setState ({ rows: newRows });
      }
      if (newCols.length > 0) {
        console.log("UPDATING COLS STATE");
        this.setState ({ columns: newCols });
      }

      //console.log("Just updated tableData state");
    }
    //this.setState({ manuscripts: manuscripts });
  }

  queryLetters(pages) {
    for (let page of pages) {
      for (let letter of letters) {
        if (letter.id > 9 || letter.id == 5)
          continue;
        let coordsQuery = "http://localhost:8000/api/coordinates?page_id=" + page['id'] + "&letter_id=" + letter['id'];
        //console.log("queryLetters querying " + coordsQuery);
        if (coordsQuery in this.queryCache) {
          console.log("Getting letters data from cache " + coordsQuery);
          this.processLetters(this.queryCache[coordsQuery], page);
        } else {
          fetch(coordsQuery)
          .then(response => {
            return response.json();
          })
          .catch(function(error) {
            console.log("URL fetch failed for " + coordsQuery);
            return [];
          })
          .then(coordsData => {
            this.queryCache[coordsQuery] = coordsData;
            this.processLetters(coordsData, page);
          });
        }
      }
    }
  }

}

            //console.log("queryLetters querying " + coordsQuery);
            if (coordsQuery in this.queryCache) {
              console.log("Getting letters data from cache " + coordsQuery);
              this.processLetters(this.queryCache[coordsQuery], page);
            } else {
              fetch(coordsQuery)
              .then(response => {
                return response.json();
              })
              .catch(function(error) {
                console.log("URL fetch failed for " + coordsQuery);
                return [];
              })
              .then(coordsData => {
                this.queryCache[coordsQuery] = coordsData;
                this.processLetters(coordsData, page);
              });
            }
          }


        }
      }
    })
    /*
      if (msQuery in this.queryCache) {
        console.log("Getting ms data from cache " + msQuery);
        this.queryLetters(this.queryCache[msQuery]);
      } else {
        fetch(msQuery)
        .then(response => {
          return response.json();
        })
        .catch(function(error) {
          console.log("URL fetch failed for " + msQuery);
          return [];
        })
        .then(data => {
          this.queryCache[msQuery] = data;
          //console.log("Running queryLetters with data " + data);
          this.queryLetters(data);
        });
      }*/

  getRows() {

    console.log("Running getRows");
    /*
    if (this.state && (this.state.rows.length > 0)) {
      // Need to update cells with new letter instances that have come in from the API
      // queries (which happen asynchronously)

      console.log("Scanning existing rows for needed updates");
      let rowsCopy = [...this.state.rows];

      let changesMade = false;

      for (let msID of Object.keys(this.state.tableData)) {
        for (let ltID of Object.keys(this.state.tableData[msID])) {
          if (this.state.tableData[msID][ltID].length > 0) {
            console.log("Finding current state of msID " + msID + ", ltID " + ltID + " which has data length " + this.state.tableData[msID][ltID].length);
            // Find the row in this.state.rows
            let rowIndex = rowsCopy.findIndex(rw => rw["ltid"] == ltID);
            console.log("Letter " + ltID + " is at row index " + rowIndex);
            let row = rowsCopy[rowIndex];
            for (let c=0, len=manuscripts.length; c<2; c++) {
              let cellIndex = "manuscript" + (c + 1);
              let cell = row[cellIndex];
              console.log("checking cell for " + cellIndex + ", child kehys: " + Object.keys(cell.props.children) + " msid is " + cell.props['msid'])  ;
              if (cell.props['msid'] == msID) {
                console.log("Manuscript " + msID + " (" + manuscripts.find(m => m['id'] == msID)['shelfmark']  + ") is at col index " + cellIndex + " which has children length " + cell.props["children"].length);
                console.log("Children of cell: " + cell.props["children"].length + ", instances in tableData: " + this.state.tableData[msID][ltID].length);
                if (cell.props["children"].length < this.state.tableData[msID][ltID].length) {
                  console.log("Updating contents of cell");
                  let cellContents = this.state.tableData[msID][ltID].map(coords => {return <LetterImage key={coords.id} coords={coords}/>});
                  console.log("adding " + this.state.tableData[msID][ltID].length + " new letter instances at msID " + msID + ", ltID " + ltID);
                  this.state.tableData[msID][ltID].map(coords => { console.log("letter " + coords['letter'] + " binary URL is " + coords["binaryurl"]); });
                  rowsCopy[rowIndex][cellIndex] = <div msid={msID}>{cellContents}</div>;
                  changesMade = true;
                }
              }
            }
          }
        }
      }
      if (changesMade) {
        console.log("RETURNING CHANGED ROWS");
        return rowsCopy;
      } else {
        console.log("NOT UPDATING ROWS");
        return [];
      }      
    }
    */   
    console.log("REBUILDING ROWS FROM SCRATCH");

    let rows = [];
  
    let colControls = { id: 0, letter: "", visible: true };

    /* Add dates row */
    let datesRow = { id: 1, letter: "Date", ltid: "Date", visible: (!this.props.hiddenLetters.includes("Date")) };

    for (let i=0, len=manuscripts.length; i<len; i++) {
      colControls["manuscript" + (i + 1)] = <ColumnControls
                                                msid={manuscripts[i]['id']}
                                                manifestURL={manuscripts[i]['manifest']}
                                                displayManifest={this.viewManifest}
                                                onHideColumn={this.onHideColumn}
                                                onHiddenChange={this.props.onHiddenChange}
                                                onManifestSelected={this.props.onManifestSelected}
                                            />;
      datesRow["manuscript" + (i + 1)] = manuscripts[i]['date'];
    }
    rows.push(colControls);
    rows.push(datesRow);
  
    /* Load the letters data into the rows array */
    //for (let i = 0; i < letters.length; i++) {
    for (let i = 0; i < 3; i++) {
      let ltID = letters[i]['id'];
      let row = { id: i + 2, ltid: ltID,
                  letter: <SyriacLetter id={ltID} />,
                  visible: (!this.props.hiddenLetters.includes(ltID)) };
      //console.log(row['visible']);
  
      /* This is where the actual letter instances from the manuscript
       * pages are added */
      for (let j=0, len=manuscripts.length; j < len; j++) {
        let msID = manuscripts[j]['id'];

        if ((!(msID in this.props.tableData)) || (!(ltID in this.props.tableData[msID]))) {
          console.log("adding blank cell at msID " + msID + ", ltID " + ltID);
          row["manuscript" + (j + 1)] = <div msid={msID} />;
        } else {
          let cellContents = this.props.tableData[msID][ltID].slice(0,this.props.formData.letterExamples).map(coords => {return <LetterImage key={coords.id} coords={coords}/>});
          console.log("adding " + this.props.tableData[msID][ltID].length + " new letter instances at msID " + msID + ", ltID " + ltID);
          //this.prop.tableData[msID][ltID].map(coords => { console.log("letter " + coords['letter'] + " binary URL is " + coords["binaryurl"]); });
          row["manuscript" + (j + 1)] = <div msid={msID}>{cellContents}</div>;
        }
        //row["manuscript" + (j + 1)] = <div msid={msID} />

        /*
        sampleLetterCount++;
        let sampleLetterIndex = sampleLetterCount % sampleLetters.length;
        row["manuscript" + (j + 1)] = (
          <img
            src={sampleLetters[sampleLetterIndex]}
            alt={"letter " + sampleLetterIndex}
          />
        );
        */
      }
  
      rows.push(row);
    }
    console.log("RETURNING FROM GETROWS");
    return rows;
  }

  getColumns() {

    console.log("Running getColumns");
    /*
    if (this.state && (this.state.columns.length > 0)) {
      console.log("NOT UPDATING COLUMNS");
      // Only rows need to be updated in place as new letter
      // instances are added (I think)
      return [];
    }
    */

    console.log("REBUILDING COLUMNS FROM SCRATCH");

    let cols = [
      {
        property: "letter",
        header: {
          label: "Date",
          props: {
            label: "Date"
          }
        },
        visible: true,
        props: {
          style: { width: 80 }
        }
      }
    ];
    let rowRemoverColumn = {
      property: "row_remover",
      header: {
        label: "X",
        props: {
          label: "X"
        }
      },
      props: {
        style: { width: 45 },
      },
      cell: {
        formatters: [
          (value, { rowData }) => (rowData.id > 0) ?
            <span
              className="remove"
              onClick={() => this.onHideRow(rowData.ltid)} style={{ cursor: 'pointer' }}
            >
              &#10007;
            </span>
          : <span></span>
        ]
      },
      visible: true
    }
    cols.push(rowRemoverColumn);
    /* Iteratively populate the columns */
    for (let i=0, len=manuscripts.length; i < len; i++) {
      let column = {
        property: "manuscript" + (i + 1),
        header: {
          label: manuscripts[i]['shelfmark'],
          props: {
            label: manuscripts[i]['shelfmark'],
            onMove: o => this.onMoveColumn(o)
          }
        },
        visible: (!this.props.hiddenManuscripts.includes(manuscripts[i]['id'])),
        props: {
          msid: manuscripts[i]['id'],
          style: {width: 200}
        }
      };
      cols.push(column);
    }
    return cols;
  }

  /* Ideas for replacement row and column move code:
   *
   * onMove for columns inclues the following info:
   * (source and target labels aka shelfmarks)
   * sourceLabel: "Vat. Syr. 092"
   * targetLabel: "Vat. Syr. 112"
   * 
   * onMove for rows gives the source and dest row IDs
   * when output from moveRows, rowIDs always start
   * with 0 for the column hider rows, and 1 for the date
   * The rest are the letters in order.
   * So a replacement onMoveRow could just ignore moves
   * involving targets or sources in rows 0 and 1.
   * 
   * The basic idea is that DashTabs would keep track of
   * the row and column orders. Any dnd of a row or col
   * would be handled in DashTabs and trigger a render
   * of the scriptchart, which would be passed the 
   * manuscript and letter orders as props.
   */

  onRow(row) {
    return {
      rowId: row.id,
      onMove: this.onMoveRow
    };
  }

  onMoveRow({ sourceRowId, targetRowId }) {
    console.log("Row move source " + sourceRowId + " target " + targetRowId);
    const rows = dnd.moveRows({
      sourceRowId,
      targetRowId
    })(this.state.rows);
    //console.log("after move, rows is " + rows);

    if (rows) {
      console.log("updating rows: " + Object.keys(rows));
      this.setState({ rows });
    }
  }

  onMoveColumn(labels) {

    console.log("Column move labels");
    console.log(labels);
    const movedColumns = dnd.moveLabels(this.state.columns, labels);

    if (movedColumns) {
      // Retain widths to avoid flashing while drag and dropping.
      const source = movedColumns.source;
      const target = movedColumns.target;
      const sourceWidth = source.props.style && source.props.style.width;
      const targetWidth = target.props.style && target.props.style.width;

      source.props.style = {
        ...source.props.style,
        width: targetWidth
      };
      target.props.style = {
        ...target.props.style,
        width: sourceWidth
      };

      this.setState({
        columns: movedColumns.columns
      });
    }
  }

  /*
  onMoveChildColumn(labels) {
    const movedChildren = dnd.moveChildrenLabels(this.state.columns, labels);

    console.log("Column child move detected");

    if (movedChildren) {
      const columns = cloneDeep(this.state.columns);

      columns[movedChildren.target].children = movedChildren.columns;

      // Here we assume children have the same width.
      this.setState({ columns });
    }
  }*/

  onHideRow(letterID) {
    this.props.onHiddenChange("hide", "row", letterID);
  }

  componentDidMount() {
    //this.queryManuscripts();
    this.setState({ columns: this.getColumns(),
      rows: this.getRows() });
  }

  componentDidUpdate() {
    //this.queryManuscripts();
    /*this.setState({ columns: this.getColumns(),
                    rows: this.getRows() });*/
  }

  render() {

    console.log("Rendering ScriptChart");

    let rows = this.getRows();
    let columns = this.getColumns();

    return (
      <DragTable rows={rows}
                 columns={columns}
                 hiddenLetters={this.props.hiddenLetters}
                 hiddenManuscripts={this.props.hiddenManuscripts}
                 onRow={this.onRow}
                 //getRows={this.getRows}
                 //getColumns={this.getColumns}
      />
    );
  }
}

export default ScriptChart;
