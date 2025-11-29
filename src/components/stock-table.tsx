import type { StockItem } from '~/lib/parse-stock';
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
              <TableCell className='font-medium'>{index + 1}</TableCell>
              <TableCell>{row.scheme}</TableCell>
              <TableCell>{row.commodity}</TableCell>
              <TableCell className='text-right'>{row.cbQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
