import React from "react";

/* DragTable - The lowest level of the scriptchart
 * component hierarchy; contains mostly boilerplate
 * implementation of the reactabular
 * "draggable rows/columns" features (custom behavior
 * is handled by its parent ScriptChart).
 */

import * as Table from "reactabular-table";
import * as dnd from "reactabular-dnd";

class DragTable extends React.Component {

  render() {
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

    return (
      <div className="scriptchart-table-wrapper" >
        <Table.Provider columns={columns} renderers={renderers}>
          <Table.Header />

          <Table.Body
            rows={this.props.rows.filter(
              row => !this.props.hiddenLetters.includes(row.ltid)
            )}
            rowKey="id"
            onRow={this.props.onRow}
          />
        </Table.Provider>
      </div>
    );
  }
}

export default DragTable;
