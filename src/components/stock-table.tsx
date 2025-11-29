import type { StockItem } from '~/lib/parseStock';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

interface StockTableProps {
  data: StockItem[];
}

export function StockTable({ data }: StockTableProps) {
  return (
    <div className='overflow-hidden rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sl No</TableHead>
            <TableHead>Scheme</TableHead>
            <TableHead>Commodity</TableHead>
            <TableHead className='text-right'>CB Qty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell className='font-medium'>{row.SlNo}</TableCell>
              <TableCell>{row.Scheme}</TableCell>
              <TableCell>{row.Commodity}</TableCell>
              <TableCell className='text-right'>{row.CBQty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
