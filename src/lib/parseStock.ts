export interface StockItem {
  SlNo: string;
  Scheme: string;
  Commodity: string;
  Units: string;
  AllotedRegular: string;
  AllotedExtra: string;
  OBQty: string;
  ReceivedRegular: string;
  ReceivedExtra: string;
  ReceivedMoved: string;
  IssuedQty: string;
  CBQty: string;
}

export function parseStock({ htmlText }: { htmlText: string }): StockItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');

  const rows = Array.from(doc.querySelectorAll('#Report tr'));
  const data: StockItem[] = [];

  const keys: (keyof StockItem)[] = [
    'SlNo',
    'Scheme',
    'Commodity',
    'Units',
    'AllotedRegular',
    'AllotedExtra',
    'OBQty',
    'ReceivedRegular',
    'ReceivedExtra',
    'ReceivedMoved',
    'IssuedQty',
    'CBQty',
  ];

  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll('td'));
    if (cells.length === 0) continue;

    const item: Partial<StockItem> = {};
    cells.forEach((cell, index) => {
      if (keys[index]) {
        item[keys[index]] = cell.textContent?.trim() || '';
      }
    });

    if (Object.keys(item).length > 0) {
      data.push(item as StockItem);
    }
  }

  return data;
}
