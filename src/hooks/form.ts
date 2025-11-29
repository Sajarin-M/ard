import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import {
  Form,
  MultiSelect,
  Select,
  SubscribeButton,
  Switch,
  TextArea,
  TextInput,
} from '~/components/form-components';

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm: useAppFormBase } = createFormHook({
  fieldComponents: {
    MultiSelect,
    Select,
    Switch,
    TextArea,
    TextInput,
  },
  formComponents: {
    Form,
    SubscribeButton,
  },
  fieldContext,
  formContext,
});

export const useAppForm: typeof useAppFormBase = (options) => {
  const form = useAppFormBase({
    canSubmitWhenInvalid: true,
    onSubmitInvalid: () => {
      const errorElement = window.document.querySelector('[aria-invalid="true"]');
      if (errorElement && 'focus' in errorElement && typeof errorElement.focus === 'function') {
        errorElement.focus();
      }
    },
    ...options,
  });
  return form;
};

export { revalidateLogic } from '@tanstack/react-form';
