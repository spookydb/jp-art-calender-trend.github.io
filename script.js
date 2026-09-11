const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQrwr-pLPvTsqIXfqh-k8dXXTwm_r7KNX3VcLlsG9BnS5WCaJJb6LIg9yhaBFoNbk4ohZMtcOqLoCBP/pub?output=csv";

const tableHead = document.querySelector("#table-head");
const tableBody = document.querySelector("#table-body");
const searchInput = document.querySelector("#search-input");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const statusState = document.querySelector("#status-state");
const tableScroll = document.querySelector(".table-scroll");

let columns = [];
let rows = [];

function parseCsv(csvText) {
  const parsedRows = [];
  let currentRow = [];
  let currentCell = "";
  let insideQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];
    const nextCharacter = csvText[index + 1];

    if (character === '"' && insideQuotes && nextCharacter === '"') {
      currentCell += '"';
      index += 1;
    } else if (character === '"') {
      insideQuotes = !insideQuotes;
    } else if (character === "," && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = "";
    } else if ((character === "\n" || character === "\r") && !insideQuotes) {
      if (character === "\r" && nextCharacter === "\n") index += 1;
      currentRow.push(currentCell.trim());
      if (currentRow.some((cell) => cell !== "")) parsedRows.push(currentRow);
      currentRow = [];
      currentCell = "";
    } else {
      currentCell += character;
    }
  }

  currentRow.push(currentCell.trim());
  if (currentRow.some((cell) => cell !== "")) parsedRows.push(currentRow);
  return parsedRows;
}

function renderHeadings() {
  tableHead.replaceChildren();
  columns.forEach((column) => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = column;
    tableHead.appendChild(th);
  });
}

function displayValue(value) {
  const text = String(value ?? "");
  if (/^https?:\/\//i.test(text)) {
    const link = document.createElement("a");
    link.href = text;
    link.textContent = "Open link";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  }
  return document.createTextNode(text);
}

function renderRows(query = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredRows = rows.filter((row) =>
    row.some((value) =>
      String(value).toLocaleLowerCase().includes(normalizedQuery)
    )
  );

  tableBody.replaceChildren();
  filteredRows.forEach((row) => {
    const tr = document.createElement("tr");
    columns.forEach((_, columnIndex) => {
      const td = document.createElement("td");
      td.appendChild(displayValue(row[columnIndex] ?? ""));
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });

  const total = rows.length;
  resultCount.textContent = normalizedQuery
    ? `${filteredRows.length} of ${total} entries`
    : `${total} ${total === 1 ? "entry" : "entries"}`;
  emptyState.hidden = filteredRows.length !== 0;
  tableScroll.hidden = filteredRows.length === 0;
}

searchInput.addEventListener("input", (event) => renderRows(event.target.value));

async function loadSheet() {
  try {
    const response = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`Sheet returned ${response.status}`);

    const parsedRows = parseCsv(await response.text());
    if (parsedRows.length === 0) throw new Error("The sheet is empty");

    columns = parsedRows[0].map((column, index) => column || `Column ${index + 1}`);
    rows = parsedRows
      .slice(1)
      .filter((row) => row.some((cell) => cell.trim() !== ""));

    renderHeadings();
    statusState.hidden = true;
    searchInput.disabled = false;
    renderRows();
  } catch (error) {
    tableScroll.hidden = true;
    statusState.innerHTML =
      "<strong>Entries could not be loaded</strong><span>Please refresh the page in a moment.</span>";
    console.error(error);
  }
}

loadSheet();
