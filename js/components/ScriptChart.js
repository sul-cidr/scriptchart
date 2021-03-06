import React from "react";

/* ScriptChart - This is the central script chart/table rendering
 * component, situated between its parent DashTabs component, which
 * stores most of the state of the scriptchart contents, and the
 * DragTable component, which implements lower-level functions of
 * the scriptchart.
 * It instantiates the rows and columns via props passed down from
 * submission of the selection/configuration form (columnManuscripts,
 * rowLetters), and populates them -- filling in the rows --
 * with data queried from the API.
 * It also passes up requests to move and hide rows and columns
 * and to display manuscripts in the viewer, and is re-rendered
 * when these changes are processed.
 */

import DragTable from "./DragTable";
import LetterImage from "./LetterImage";
import ColumnControls from "./ColumnControls";
import SyriacLetter from "./SyriacLetter";

const LETTER_WIDTH = 80;
const X_WIDTH = 45;
const CELL_WIDTH = 200;

class ScriptChart extends React.Component {
  constructor(props) {
    super(props);

    this.getRows = this.getRows.bind(this);
    this.getColumns = this.getColumns.bind(this);
    this.onRow = this.onRow.bind(this);
    this.onHideColumn = this.onHideColumn.bind(this);
    this.onHideRow = this.onHideRow.bind(this);
    this.viewManifest = this.viewManifest.bind(this);
  }

  /* Table data is stored as a two-dimensional array.
   * First key: letter ID (row)
   * Second key: manuscript ID (column)
   * Value: an Object containing the data necessary to render
   * 1-5 image letter excerpts (binarized or not). This includes
   * the link to the page URL and the coordinates of each letter.
   */

  viewManifest(manifestURL) {
    this.props.onManifestSelected(manifestURL);
  }

  onHideColumn(manuscriptID, columnHider) {
    columnHider(manuscriptID);
  }

  getRows() {
    let rows = [];

    /* Load the letters data into the rows array */
    for (let i = 0, len = this.props.rowLetters.length; i < len; i++) {
      let ltID = this.props.rowLetters[i].id;
      let row = {
        id: i + 2,
        ltid: ltID,
        letter: <SyriacLetter key={ltID} id={ltID} isButton={false} />,
        visible: !this.props.hiddenLetters.includes(ltID)
      };

      /* This is where the actual letter instances from the manuscript
       * pages are added */
      for (let j = 0, len = this.props.columnManuscripts.length; j < len; j++) {
        let msID = this.props.columnManuscripts[j].id;

        if (
          !(msID in this.props.tableData) ||
          !(ltID in this.props.tableData[msID])
        ) {
          row["manuscript" + (j + 1)] = <div msid={msID} />;
        } else {
          let cellContents = this.props.tableData[msID][ltID]
            .slice(0, this.props.formData.letterExamples)
            .map(coords => {
              return (
                <LetterImage
                  key={coords.id}
                  letter={this.props.rowLetters[i].letter}
                  coords={coords}
                  msSlug={this.props.columnManuscripts[j].slug}
                  imageSize={this.props.formData.imageSize}
                  showBinarized={this.props.formData.showBinarized}
                  showCropped={this.props.formData.showCropped}
                  contextMode={this.props.formData.contextMode}
                  contextSize={this.props.formData.contextSize}
                />
              );
            });
          row["manuscript" + (j + 1)] = <div msid={msID}>{cellContents}</div>;
        }
      }

      rows.push(row);
    }
    return rows;
  }

  getColumns() {
    /* First two columns are the images of the letters and the "X" to hide
     * each row.
     */
    let cols = [
      {
        property: "letter",
        props: {
          style: { minWidth: LETTER_WIDTH, overflow: "hidden" }
        }
      }
    ];
    let rowRemoverColumn = {
      property: "row_remover",
      props: {
        style: { minWidth: X_WIDTH, overflow: "hidden" }
      },
      cell: {
        formatters: [
          (value, { rowData }) =>
            rowData.id > 0 ? (
              <span
                title="Hide this row"
                className="remove"
                onClick={() => this.onHideRow(rowData.ltid)}
                style={{ cursor: "pointer" }}
              >
                <b>&#10007;</b>
              </span>
            ) : (
              <span />
            )
        ]
      },
      visible: true
    };
    cols.push(rowRemoverColumn);
    /* Iteratively populate the columns */
    for (let i = 0, len = this.props.columnManuscripts.length; i < len; i++) {
      // XXX Consider just not generating values for hidden columns...
      let column = {
        property: "manuscript" + (i + 1),
        header: {
          label: this.props.columnManuscripts[i].shelfmark,
          props: {
            label: this.props.columnManuscripts[i].shelfmark,
            onMove: o => this.props.onColumnMove(o)
          },
          formatters: [
            name => (
              <ColumnControls
                msid={this.props.columnManuscripts[i].id}
                shelfmark={this.props.columnManuscripts[i].shelfmark}
                date={this.props.columnManuscripts[i].date}
                manifestURL={this.props.columnManuscripts[i].manifest}
                displayManifest={this.viewManifest}
                onHideColumn={this.onHideColumn}
                onHiddenChange={this.props.onHiddenChange}
              />
            )
          ]
        },
        visible: !this.props.hiddenManuscripts.includes(
          this.props.columnManuscripts[i].id
        ),
        props: {
          msid: this.props.columnManuscripts[i].id,
          style: { minWidth: CELL_WIDTH, maxWidth: CELL_WIDTH }
        }
      };
      cols.push(column);
    }
    return cols;
  }

  onRow(row) {
    return {
      rowId: row.ltid,
      onMove: this.props.onRowMove
    };
  }

  onHideRow(letterID) {
    this.props.onHiddenChange("hide", "row", letterID);
  }

  render() {
    console.log("Rendering ScriptChart");

    let rows = this.getRows();
    let columns = this.getColumns();

    return (
      <DragTable
        rows={rows}
        columns={columns}
        hiddenLetters={this.props.hiddenLetters}
        hiddenManuscripts={this.props.hiddenManuscripts}
        onRow={this.onRow}
      />
    );
  }
}

export default ScriptChart;
