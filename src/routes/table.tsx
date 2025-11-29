import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { STOCK_LOOKUP_SCHEMA } from '~/constants';
import { format } from 'date-fns';
import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';
import { orpc } from '~/lib/orpc/client';
import { parseStock } from '~/lib/parseStock';
import { BackButton } from '~/components/back-button';
import { StockTable } from '~/components/stock-table';

export const Route = createFileRoute('/table')({
  component: TablePage,
  validateSearch: STOCK_LOOKUP_SCHEMA,
});

function TablePage() {
  const search = Route.useSearch();

  const resolvedYear = search.year === 'currentYear' ? format(new Date(), 'yyyy') : search.year;
  const resolvedMonth = search.month === 'currentMonth' ? format(new Date(), 'MM') : search.month;

  const { data, isLoading, isError } = useQuery(
    orpc.stocks.getStocks.queryOptions({
      input: {
        ...search,
        month: search.month === 'currentMonth' ? format(new Date(), 'MM') : search.month,
        year: search.year === 'currentYear' ? format(new Date(), 'yyyy') : search.year,
      },
      select: (data) => {
        const stockData = parseStock({ htmlText: data });
        return stockData;
      },
    }),
  );

  const displayDate = format(new Date(resolvedYear, resolvedMonth - 1, 1), 'MMM yyyy');

  if (isLoading) {
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        <Loader2Icon className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        <TriangleAlertIcon className='h-8 w-8 text-red-500' />
        <p className='text-red-500'>Error loading data</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto space-y-4 p-4'>
      <div className='flex items-center gap-3'>
        <BackButton route={{ to: '/' }} />
        <h1 className='text-lg font-bold'>Stock Register {displayDate}</h1>
      </div>

      <StockTable data={data} />
    </div>
  );
}
