import { HIDDEN_ROW_ITEMS } from '~/lib/parse-stock/constants';

export interface StockItem {
  slNo: string;
  scheme: string;
  commodity: string;
  units: string;
  allotedRegular: string;
  allotedExtra: string;
  obQuantity: string;
  receivedRegular: string;
  receivedExtra: string;
  receivedMoved: string;
  issuedQuantity: string;
  cbQuantity: string;
}

export function parseStock({ htmlText }: { htmlText: string }): StockItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');

  const rows = Array.from(doc.querySelectorAll('#Report tr'));
  const data: StockItem[] = [];

  const keys: (keyof StockItem)[] = [
    'slNo',
    'scheme',
    'commodity',
    'units',
    'allotedRegular',
    'allotedExtra',
    'obQuantity',
    'receivedRegular',
    'receivedExtra',
    'receivedMoved',
    'issuedQuantity',
    'cbQuantity',
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

    if (
      HIDDEN_ROW_ITEMS.some(
        (hiddenItem) =>
          hiddenItem.scheme === item.scheme && hiddenItem.commodity === item.commodity,
      )
    ) {
      continue;
    }

    if (Object.keys(item).length > 0) {
      data.push(item as StockItem);
    }
  }

  return data;
}
