import { useStore } from '@tanstack/react-form';
import { cn } from '~/lib/utils';
import { useFieldContext, useFormContext } from '~/hooks/form';
import { LoadingButton, type LoadingButtonProps } from '~/components/loading-button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  MultiSelect as BaseMultiSelect,
  type MultiSelectProps as BaseMultiSelectProps,
} from '~/components/ui/multi-select';
import * as BaseSelect from '~/components/ui/select';
import { Slider as BaseSlider } from '~/components/ui/slider';
import { Switch as BaseSwitch } from '~/components/ui/switch';
import { Textarea as BaseTextarea } from '~/components/ui/textarea';

export type SubscribeButtonProps = LoadingButtonProps & {
  isDefaultValue?: boolean;
  disableIfDefaultValue?: boolean;
};

export function SubscribeButton({
  disabled,
  isDefaultValue,
  disableIfDefaultValue,
  children,
  isLoading,
  ...rest
}: SubscribeButtonProps) {
  const form = useFormContext();
  const [isSubmitting, _isDefaultValue] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.isDefaultValue,
  ]);

  const resolvedIsDefaultValue = _isDefaultValue || isDefaultValue;
  const resolvedDisabled =
    isSubmitting || disabled || (disableIfDefaultValue && resolvedIsDefaultValue);

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <LoadingButton
          type='submit'
          disabled={resolvedDisabled}
          isLoading={isSubmitting || isLoading}
          form={form.formId}
          {...rest}
        >
          {children}
        </LoadingButton>
      )}
    </form.Subscribe>
  );
}

type ErrorMessagesProps = { errors: Array<string | { message: string }>; className?: string };

function ErrorMessages({ errors, className }: ErrorMessagesProps) {
  return (
    <>
      {errors.map((error) => (
        <div
          key={typeof error === 'string' ? error : error.message}
          className={cn('mt-1 text-sm text-red-500', className)}
        >
          {typeof error === 'string' ? error : error.message}
        </div>
      ))}
    </>
  );
}

export type TextInputProps = React.ComponentProps<typeof Input> & {
  label?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  withAsterisk?: boolean;
};

export function TextInput({
  label,
  placeholder,
  className,
  wrapperClassName,
  labelClassName,
  errorClassName,
  withAsterisk,
  disabled,
  ...props
}: TextInputProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <div className={wrapperClassName}>
      {label && (
        <Label htmlFor={label} className={cn('mb-2', labelClassName)} withAsterisk={withAsterisk}>
          {label}
        </Label>
      )}
      <Input
        id={label}
        value={field.state.value}
        placeholder={placeholder}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        disabled={disabled}
        className={className}
        {...props}
      />
      {isInvalid && <ErrorMessages errors={field.state.meta.errors} className={errorClassName} />}
    </div>
  );
}

export type TextAreaProps = React.ComponentProps<typeof BaseTextarea> & {
  label?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  withAsterisk?: boolean;
};

export function TextArea({
  label,
  rows = 3,
  className,
  wrapperClassName,
  labelClassName,
  errorClassName,
  withAsterisk,
  disabled,
  ...props
}: TextAreaProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <div className={wrapperClassName}>
      {label && (
        <Label htmlFor={label} className={cn('mb-2', labelClassName)} withAsterisk={withAsterisk}>
          {label}
        </Label>
      )}
      <BaseTextarea
        id={label}
        value={field.state.value}
        onBlur={field.handleBlur}
        rows={rows}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        disabled={disabled}
        className={className}
        {...props}
      />
      {isInvalid && <ErrorMessages errors={field.state.meta.errors} className={errorClassName} />}
    </div>
  );
}

export type SelectProps = React.ComponentProps<typeof BaseSelect.Select> & {
  label?: string;
  values: Array<{ label: string; value: string }>;
  placeholder?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  withAsterisk?: boolean;
  className?: string;
};

export function Select({
  label,
  values,
  placeholder,
  className,
  wrapperClassName,
  labelClassName,
  errorClassName,
  triggerClassName,
  contentClassName,
  itemClassName,
  withAsterisk,
  ...props
}: SelectProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <div className={wrapperClassName}>
      {label && (
        <Label htmlFor={label} className={cn('mb-2', labelClassName)} withAsterisk={withAsterisk}>
          {label}
        </Label>
      )}
      <BaseSelect.Select
        name={field.name}
        value={field.state.value}
        onValueChange={(value) => field.handleChange(value)}
        {...props}
      >
        <BaseSelect.SelectTrigger
          id={label}
          className={cn('w-full', className, triggerClassName)}
          aria-invalid={isInvalid}
        >
          <BaseSelect.SelectValue placeholder={placeholder} />
        </BaseSelect.SelectTrigger>
        <BaseSelect.SelectContent className={contentClassName}>
          <BaseSelect.SelectGroup>
            {label && <BaseSelect.SelectLabel>{label}</BaseSelect.SelectLabel>}
            {values.map((value) => (
              <BaseSelect.SelectItem
                key={value.value}
                value={value.value}
                className={itemClassName}
              >
                {value.label}
              </BaseSelect.SelectItem>
            ))}
          </BaseSelect.SelectGroup>
        </BaseSelect.SelectContent>
      </BaseSelect.Select>
      {isInvalid && <ErrorMessages errors={field.state.meta.errors} className={errorClassName} />}
    </div>
  );
}

export type SliderProps = React.ComponentProps<typeof BaseSlider> & {
  label?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  withAsterisk?: boolean;
};

export function Slider({
  label,
  className,
  wrapperClassName,
  labelClassName,
  errorClassName,
  withAsterisk,
  ...props
}: SliderProps) {
  const field = useFieldContext<number>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <div className={wrapperClassName}>
      {label && (
        <Label htmlFor={label} className={cn('mb-2', labelClassName)} withAsterisk={withAsterisk}>
          {label}
        </Label>
      )}
      <BaseSlider
        id={label}
        onBlur={field.handleBlur}
        value={[field.state.value]}
        onValueChange={(value) => field.handleChange(value[0])}
        aria-invalid={isInvalid}
        className={className}
        {...props}
      />
      {isInvalid && <ErrorMessages errors={field.state.meta.errors} className={errorClassName} />}
    </div>
  );
}

export type SwitchProps = React.ComponentProps<typeof BaseSwitch> & {
  label?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  withAsterisk?: boolean;
};

export function Switch({
  label,
  className,
  wrapperClassName,
  labelClassName,
  errorClassName,
  withAsterisk,
  ...props
}: SwitchProps) {
  const field = useFieldContext<boolean>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <div className={wrapperClassName}>
      <div className='flex items-center gap-2'>
        <BaseSwitch
          id={label}
          onBlur={field.handleBlur}
          checked={field.state.value}
          onCheckedChange={(checked) => field.handleChange(checked)}
          aria-invalid={isInvalid}
          className={className}
          {...props}
        />
        {label && (
          <Label htmlFor={label} className={labelClassName} withAsterisk={withAsterisk}>
            {label}
          </Label>
        )}
      </div>
      {isInvalid && <ErrorMessages errors={field.state.meta.errors} className={errorClassName} />}
    </div>
  );
}

export type MultiSelectProps = Omit<BaseMultiSelectProps, 'value' | 'onChange'> & {
  label?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  withAsterisk?: boolean;
  className?: string;
};

export function MultiSelect({
  label,
  options,
  className,
  wrapperClassName,
  labelClassName,
  errorClassName,
  withAsterisk,
  ...props
}: MultiSelectProps) {
  const field = useFieldContext<string[]>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <div className={wrapperClassName}>
      {label && (
        <Label htmlFor={label} className={cn('mb-2', labelClassName)} withAsterisk={withAsterisk}>
          {label}
        </Label>
      )}
      <BaseMultiSelect
        id={label}
        options={options}
        value={field.state.value}
        onChange={(value) => field.handleChange(value)}
        aria-invalid={isInvalid}
        className={className}
        {...props}
      />
      {isInvalid && <ErrorMessages errors={field.state.meta.errors} className={errorClassName} />}
    </div>
  );
}

export function UnsavedChangesIndicator() {
  const form = useFormContext();
  const [isDefaultValue] = useStore(form.store, (state) => [state.isDefaultValue]);

  return <div className='hidden' data-dirty={!isDefaultValue} />;
}

export type FormProps = React.ComponentProps<'form'>;

export function Form({ children, onSubmit, ...props }: FormProps) {
  const form = useFormContext();
  return (
    <form
      {...props}
      id={form.formId}
      onSubmit={(e) => {
        e.preventDefault();
        if (form.state.isSubmitting) return;
        void form.handleSubmit();
        onSubmit?.(e);
      }}
    >
      {children}
    </form>
  );
}
