import React from "react";

import { cloneDeep } from "lodash";

import * as Table from "reactabular-table";
import * as dnd from "reactabular-dnd";

import eastern_alap from "./images/Syriac_Eastern_alap.png";
import eastern_bet from "./images/Syriac_Eastern_bet.png";
import eastern_gamal from "./images/Syriac_Eastern_gamal.png";
import eastern_dalat from "./images/Syriac_Eastern_dalat.png";
import eastern_he from "./images/Syriac_Eastern_he.png";
import eastern_waw from "./images/Syriac_Eastern_waw.png";
import estrangela_alap from "./images/Syriac_Estrangela_alap.png";
import estrangela_bet from "./images/Syriac_Estrangela_bet.png";
import estrangela_gamal from "./images/Syriac_Estrangela_gamal.png";
import estrangela_dalat from "./images/Syriac_Estrangela_dalat.png";
import estrangela_he from "./images/Syriac_Estrangela_he.png";
import estrangela_waw from "./images/Syriac_Estrangela_waw.png";
import serta_alap from "./images/Syriac_Serta_alap.png";
import serta_bet from "./images/Syriac_Serta_bet.png";
import serta_gamal from "./images/Syriac_Serta_gamal.png";
import serta_dalat from "./images/Syriac_Serta_dalat.png";
import serta_he from "./images/Syriac_Serta_he.png";
import serta_waw from "./images/Syriac_Serta_waw.png";

import "./DragAndDropTable.css";

const sampleLetters = [
  eastern_alap,
  eastern_bet,
  eastern_gamal,
  eastern_dalat,
  eastern_he,
  eastern_waw,
  estrangela_alap,
  estrangela_bet,
  estrangela_gamal,
  estrangela_dalat,
  estrangela_he,
  estrangela_waw,
  serta_alap,
  serta_bet,
  serta_gamal,
  serta_dalat,
  serta_he,
  serta_waw
];

const letters = ["ʾĀlep̄", "Bēṯ", "Gāmal", "Dālaṯ", "Hē", "Waw"];
const manuscripts = [
  "Vat. Syr. 157",
  "Vat. Syr. 161",
  "Vat. Syr. 283",
  "Vat. Syr. 586",
  "Vat. Syr. 252",
  "Bor. Syr. 13",
  "BL. Add. 12144",
  "BL. Add. 12139",
  "BL. Add. 12146"
];
const dates = ["NA", "NA", "NA", "NA", "NA", "NA", "1081", "999-1000", "1007"];
var rows = [];
let sampleLetterCount = 0;

/* PMB These should come in handy when the content is pulled in dynamically
const schema = {
  type: "object",
  properties: {
    id: {
      type: "integer"
    },
    letter: {
      type: "string"
    },
    required: ["id", "letter"]
  }
};
for (let i = 0; i < manuscripts.length; i++) {
  let colId = "manuscript" + (i + 1);
  schema["properties"][colId] = { type: "string" };
  schema["required"].push(colId);
}
*/

/* Add dates row */
let row = { id: 0, letter: "Date" };

for (let i = 0; i < dates.length; i++) {
  row["manuscript" + (i + 1)] = dates[i];
}
rows.push(row);

/* Load the sample letter images into the rows array */
for (let i = 0; i < letters.length; i++) {
  let row = { id: i + 2, letter: letters[i] };

  for (let j = 0; j < manuscripts.length; j++) {
    sampleLetterCount++;
    let sampleLetterIndex = sampleLetterCount % sampleLetters.length;
    row["manuscript" + (j + 1)] = (
      <img
        src={sampleLetters[sampleLetterIndex]}
        alt={"letter " + sampleLetterIndex}
      />
    );
  }

  rows.push(row);
}

class DragAndDropTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns(),
      rows,
      query: {} // search query, also used to hide/show columns
    };

    this.onRow = this.onRow.bind(this);
    this.onMoveRow = this.onMoveRow.bind(this);
    this.onMoveColumn = this.onMoveColumn.bind(this);
    this.onMoveChildColumn = this.onMoveChildColumn.bind(this);
  }

  getColumns() {
    let cols = [
      {
        property: "letter",
        props: {
          label: "Letter",
          style: {
            fontWeight: "bold"
          }
        },
        visible: true,
        header: {
          label: "Scriptchart",
          props: {
            onMove: o => this.onMoveColumn(o)
          }
        }
      }
    ];
    /* Iteratively populate the columns */
    for (let i = 0; i < manuscripts.length; i++) {
      let column = {
        property: "manuscript" + (i + 1),
        header: {
          label: manuscripts[i],
          props: {
            onMove: o => this.onMoveColumn(o)
          }
        },
        visible: true,
        props: {
          label: manuscripts[i]
        }
      };
      cols.push(column);
    }
    return cols;
  }

  render() {
    const renderers = {
      header: {
        cell: dnd.Header
      },
      body: {
        row: dnd.Row
      }
    };
    const { columns, rows } = this.state;

    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        style={{ overflowX: "auto" }}
        renderers={renderers}
        columns={columns}
      >
        <Table.Header />

        <Table.Body rows={rows} rowKey="id" onRow={this.onRow} />
      </Table.Provider>
    );
  }
  onRow(row) {
    return {
      rowId: row.id,
      onMove: this.onMoveRow
    };
  }
  onMoveRow({ sourceRowId, targetRowId }) {
    const rows = dnd.moveRows({
      sourceRowId,
      targetRowId
    })(this.state.rows);

    if (rows) {
      this.setState({ rows });
    }
  }
  onMoveColumn(labels) {
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
  onMoveChildColumn(labels) {
    const movedChildren = dnd.moveChildrenLabels(this.state.columns, labels);

    if (movedChildren) {
      const columns = cloneDeep(this.state.columns);

      columns[movedChildren.target].children = movedChildren.columns;

      // Here we assume children have the same width.
      this.setState({ columns });
    }
  }
}

export default DragAndDropTable;
