function parseCSVLine(line: string): string[] {
  const cols: string[] = [];
  let cur = "";
  let inQ = false;
  for (const c of line) {
    if (c === '"') inQ = !inQ;
    else if (c === "," && !inQ) {
      cols.push(cur.trim());
      cur = "";
    } else cur += c;
  }
  cols.push(cur.trim());
  return cols;
}

export async function GET() {
  const SHEET_URL = `https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_SHEET_ID}/gviz/tq?tqx=out:csv`;

  const res = await fetch(SHEET_URL);
  const csv = await res.text();

  const lines = csv.trim().split("\n");
  const headers = parseCSVLine(lines[0]).map((h) => h.replace(/"/g, ""));
  const rows = lines.slice(1).map((line) => {
    const cols = parseCSVLine(line).map((c) => c.replace(/"/g, ""));
    const obj: any = {};
    headers.forEach((h, i) => (obj[h] = cols[i] || ""));
    return obj;
  });

  return Response.json(rows);
}
