const titleElement = document.querySelector("#site-title");
const introductionElement = document.querySelector("#site-introduction");
const tableHead = document.querySelector("#table-head");
const tableBody = document.querySelector("#table-body");
const searchInput = document.querySelector("#search-input");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");

titleElement.textContent = siteContent.title;
document.title = siteContent.title;
introductionElement.textContent = siteContent.introduction;

siteContent.columns.forEach((column) => {
  const th = document.createElement("th");
  th.scope = "col";
  th.textContent = column;
  tableHead.appendChild(th);
});

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
  const filteredRows = siteContent.rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLocaleLowerCase().includes(normalizedQuery)
    )
  );

  tableBody.replaceChildren();
  filteredRows.forEach((row) => {
    const tr = document.createElement("tr");
    [row.date, row.name, row.reference, row.explanation].forEach((value) => {
      const td = document.createElement("td");
      td.appendChild(displayValue(value));
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });

  const total = siteContent.rows.length;
  resultCount.textContent = normalizedQuery
    ? `${filteredRows.length} of ${total} entries`
    : `${total} ${total === 1 ? "entry" : "entries"}`;
  emptyState.hidden = filteredRows.length !== 0;
  document.querySelector(".table-scroll").hidden = filteredRows.length === 0;
}

searchInput.addEventListener("input", (event) => renderRows(event.target.value));
renderRows();
