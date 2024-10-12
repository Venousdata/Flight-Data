import express from "express";
import cors from "cors";
import path from "path";
import Database from "better-sqlite3";
/*
There are 4 main sections of this script, given more time I'd split them all out in to separate files/folders.
e.g.:
initialiseExpress()
initialiseDb()
initialiseRoutes()
exposeServer()
*/

// initialise express
const app = express();
app.use(cors());
app.use(express.json());

// initialise database
const dbPath = path.resolve(__dirname, "..", "data", "planes.sqlite");
const db = new Database(dbPath, { verbose: console.log });

// set up routes
app.post("/planes", (request, response) => {
  try {
    const { columns, endRow } = request.body;
    /*
    given more time, I'd make this query ternary a lot more configurable.
    perhaps make it a function that takes paramaters like:
      action (SELECT, INSERT etc.)
      columns (array of column names)
      table (name of table)
      extras (e.g. LIMIT/RANGE etc.)
    */
    const selectQuery = endRow
      ? `SELECT ${columns.join(", ")} FROM planes LIMIT 30 OFFSET ${endRow}`
      : `SELECT ${columns.join(", ")} FROM planes LIMIT 30`;
    const countQuery = "SELECT COUNT (*) as totalRows FROM planes";
    const rows = db.prepare(selectQuery).all();
    const [{ totalRows }] = db.prepare(countQuery).all() as any;
    response.send({ rows, totalRows });
  } catch (err) {
    console.error("Error retrieving data", err);
    response
      .status(500)
      .send({ error: "Failed to retrieve data from database" });
  }
});

// expose server
app.listen(3000, () => {
  console.log("Server Listening on PORT:", 3000);
});
