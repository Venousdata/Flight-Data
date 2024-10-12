import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
const displayColumns = [
  "ICAO24",
  "Callsign",
  "Origin Country",
  "Velocity",
  "Latitude",
  "Longitude",
];

function App() {
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [lastRowIdx, setLastRowIdx] = useState(0);
  const [page, setPage] = useState(1);
  const totalPages = useMemo(() => Math.floor(totalRows / 30), [totalRows]); // hack to calculate total pages

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/planes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          columns: [
            "icao24",
            "callsign",
            "originCountry",
            "velocity",
            "latitude",
            "longitude",
          ],
          endRow: lastRowIdx,
        }),
      });
      const { rows, totalRows } = await response.json();

      setRows(rows);
      setTotalRows(totalRows);
    };

    fetchData();
  }, [lastRowIdx]);

  const handlePrevClick = useCallback(() => {
    if (lastRowIdx - 30 < 0) setLastRowIdx(0);
    else setLastRowIdx(lastRowIdx - 30);
    setPage(page - 1);
  }, [lastRowIdx, setLastRowIdx, setPage]);

  const handleNextClick = useCallback(() => {
    // i.e. if 67 total rows and we're showing 30-60, then only fetch 61-67 instead of 61-91
    if (lastRowIdx + 30 > totalRows) setLastRowIdx(totalRows);
    setLastRowIdx(lastRowIdx + 30);
    setPage(page + 1);
  }, [lastRowIdx, setLastRowIdx, setPage]);

  return (
    <div data-testid="planes">
      <button disabled={!lastRowIdx} onClick={handlePrevClick}>
        prev
      </button>
      <button disabled={lastRowIdx + 30 > totalRows} onClick={handleNextClick}>
        next
      </button>
      <p data-testid="current-page">
        Page: {page}/{totalPages}
      </p>
      <p data-testid="total-rows">Total rows: {totalRows}</p>
      <tr>
        {displayColumns.map((column) => (
          <th key={column}>{column}</th>
        ))}
      </tr>
      {rows.map((row, rowIdx) => (
        <tr key={rowIdx}>
          {Object.keys(row).map((filteredCol, colIdx) => (
            <td key={`${row[filteredCol]}${rowIdx}${colIdx}`}>
              {row[filteredCol]}
            </td>
          ))}
        </tr>
      ))}
    </div>
  );
}

export default App;
