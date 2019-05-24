import React from "react";

/* DragTable - The lowest level of the scriptchart
 * component hierarchy; contains mostly boilerplate
 * implementation of the reactabular "sticky headers"
 * and "draggable rows/columns" features (custom behavior
 * is handled by its parent ScriptChart).
 *
 * XXX Currently has some issues with formatting: column
 * headers don't always match the witdh of their content
 * cells below, and the chart size/scrollbar capabilities
 * could use refinement.
 */

import * as Table from "reactabular-table";
import * as dnd from "reactabular-dnd";
import * as Sticky from "reactabular-sticky";

class DragTable extends React.Component {
  constructor(props) {
    super(props);

    this.onScrollFromNative = this.onScrollFromNative.bind(this);
  }

  onScrollFromNative(e) {
    this.tableHeader.scrollLeft = e.target.scrollLeft;
  }

  render() {
    console.log("Rendering DragTable");

    const renderers = {
      header: {
        cell: dnd.Header
      },
      body: {
        row: dnd.Row
      }
    };

    let columns = this.props.columns.filter(
      column => !this.props.hiddenManuscripts.includes(column.props.msid)
    );

    const tableStyle = {
      clear: "none"
    };
    const tableHeaderStyle = {
      overflow: "hidden"
    };
    const tableBodyStyle = {
      overflow: "auto"
    };

    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        style={{ overflowX: "auto" }}
        renderers={renderers}
        columns={columns}
        style={tableStyle}
      >
        <Sticky.Header
          style={tableHeaderStyle}
          ref={tableHeader => {
            this.tableHeader = tableHeader && tableHeader.getRef();
          }}
          tableBody={this.tableBody}
        />
        <Sticky.Body
          rows={this.props.rows.filter(
            row => !this.props.hiddenLetters.includes(row.ltid)
          )}
          rowKey="id"
          onRow={this.props.onRow}
          style={tableBodyStyle}
          ref={tableBody => {
            this.tableBody = tableBody && tableBody.getRef();
          }}
          tableHeader={this.tableHeader}
          onScroll={this.onScrollFromNative}
        />
      </Table.Provider>
    );
  }
}

export default DragTable;
