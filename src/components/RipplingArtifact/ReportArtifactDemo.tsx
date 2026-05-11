import "./ReportArtifactDemo.css";

const COLUMNS = ["Order ID", "Customer", "Order date", "Revenue"] as const;

const ROWS: [string, string, string, string][] = [
  ["1234", "June Lee", "Jan 23, 2024", "$1,234.00"],
  ["1233", "Mandy Moore", "Jan 23, 2024", "$1,234.00"],
  ["1222", "Customer", "Jan 23, 2024", "$1,234.00"],
  ["1222", "Customer", "Jan 23, 2024", "$1,234.00"],
];

export function ReportArtifactDemo() {
  return (
    <div className="report-artifact-demo">
      <div className="report-artifact-table-wrap">
        <table className="report-artifact-table">
          <thead>
            <tr>
              {COLUMNS.map((label) => (
                <th
                  key={label}
                  scope="col"
                  className={
                    label === "Revenue"
                      ? "report-artifact-th report-artifact-th--numeric"
                      : "report-artifact-th"
                  }
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={
                      colIndex === 3
                        ? "report-artifact-td report-artifact-td--numeric"
                        : "report-artifact-td"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
