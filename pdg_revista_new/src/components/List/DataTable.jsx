import React from "react";
import { convertToTimeZone } from "../../utils/timeUtils";
import config from "../../../config";
import "../../assets/css/components/List/datatable.css"

function DataTable({ data, columns, actions }) {
    return (
        <div className="table-container">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} scope="col">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`${col.key === "actions" ? "btn-group w-100" : ""}`}
                                    >
                                        {col.key === "actions"
                                            ? actions.map((action, actionIndex) => (
                                                  <button
                                                      type="button"
                                                      key={actionIndex}
                                                      className={action.className}
                                                      onClick={() => action.onClick(item)}
                                                  >
                                                      {action.text}
                                                  </button>
                                              ))
                                            : item[col.key]}
                                    </td> // Aquí se muestra el valor de cada columna
                                ))}
                                {/* {actions && (
                                    <td className="btn-group" role="group">
                                        {actions.map((action, actionIndex) => (
                                            <button
                                                type="button"
                                                key={actionIndex}
                                                className={action.className}
                                                onClick={() => action.onClick(item)}
                                            >
                                                {action.text}
                                            </button>
                                        ))}
                                    </td>
                                )} */}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
