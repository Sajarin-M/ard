import { useLocalStorage } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  DEFAULT_DISTRICT_CODE,
  DEFAULT_TSO_CODE,
  DISTRICTS,
  FPS_IDS,
  LOCAL_STORAGE_KEYS,
  MONTHS,
  STOCK_LOOKUP_SCHEMA,
  TSOS,
  YEARS,
} from '~/constants';
import { format } from 'date-fns';
import { orpc } from '~/lib/orpc/client';
import { revalidateLogic, useAppForm } from '~/hooks/form';
import { SubscribeButton } from '~/components/form-components';

export const Route = createFileRoute('/')({
  component: FormPage,
});

function FormPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [lastUsedFPSId, setLastUsedFPSId] = useLocalStorage<string>({
    key: LOCAL_STORAGE_KEYS.LAST_USED_FPS_ID,
    defaultValue: '',
    getInitialValueInEffect: false,
  });

  const currentMonth = format(new Date(), 'MMMM');
  const currentYear = format(new Date(), 'yyyy');

  const form = useAppForm({
    defaultValues: {
      month: 'currentMonth',
      year: 'currentYear',
      districtCode: DEFAULT_DISTRICT_CODE,
      tsoCode: DEFAULT_TSO_CODE,
      fpsId: lastUsedFPSId,
    },
    validators: {
      onDynamic: STOCK_LOOKUP_SCHEMA,
    },
    validationLogic: revalidateLogic(),
    onSubmit: async ({ value }) => {
      await queryClient.ensureQueryData(
        orpc.stocks.getStocks.queryOptions({
          input: {
            ...value,
            month: value.month === 'currentMonth' ? format(new Date(), 'MM') : value.month,
            year: value.year === 'currentYear' ? format(new Date(), 'yyyy') : value.year,
          },
        }),
      );
      await navigate({
        to: '/table',
        search: value,
      });
    },
  });

  return (
    <div className='flex min-h-screen justify-center bg-gray-50 p-4 lg:items-center'>
      <form.AppForm>
        <form.Form className='w-full max-w-lg space-y-4 rounded-md lg:border lg:p-4 lg:shadow-sm'>
          <h1 className='text-lg font-bold'>Stock Register</h1>
          <div className='grid gap-4 md:grid-cols-2'>
            <form.AppField
              name='month'
              children={(field) => (
                <field.Select
                  label='Month'
                  withAsterisk
                  values={[
                    { label: `Current Month (${currentMonth})`, value: 'currentMonth' },
                    ...MONTHS.map((month) => ({
                      label: month.name,
                      value: month.code,
                    })),
                  ]}
                />
              )}
            />
            <form.AppField
              name='year'
              children={(field) => (
                <field.Select
                  label='Year'
                  withAsterisk
                  values={[
                    { label: `Current Year (${currentYear})`, value: 'currentYear' },
                    ...YEARS.map((year) => ({
                      label: year.name,
                      value: year.code,
                    })),
                  ]}
                />
              )}
            />
          </div>
          <form.AppField
            name='districtCode'
            children={(field) => (
              <field.Select
                label='District'
                withAsterisk
                values={DISTRICTS.map((district) => ({
                  label: district.name,
                  value: district.code,
                }))}
              />
            )}
          />
          <form.AppField
            name='tsoCode'
            children={(field) => (
              <field.Select
                label='TSO'
                withAsterisk
                values={TSOS.map((tso) => ({
                  label: tso.name,
                  value: tso.code,
                }))}
              />
            )}
          />
          <form.AppField
            name='fpsId'
            listeners={{ onChange: ({ value }) => setLastUsedFPSId(value) }}
            children={(field) => (
              <field.Select
                label='FPS'
                withAsterisk
                values={FPS_IDS.map((fps) => ({
                  label: `${fps.name} (${fps.code})`,
                  value: fps.code,
                }))}
              />
            )}
          />

          <SubscribeButton className='w-full'>View Stock Register</SubscribeButton>
        </form.Form>
      </form.AppForm>
    </div>
  );
}
