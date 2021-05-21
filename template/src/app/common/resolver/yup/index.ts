import {Resolver} from './type';
import {
  appendErrors,
  Field,
  FieldError,
  FieldErrors,
  get,
  InternalFieldName,
  set,
} from 'react-hook-form';
import Yup from 'yup';

const toNestError = <TFieldValues>(
  errors: Record<string, FieldError>,
  fields: Record<InternalFieldName, Field['_f']>,
): FieldErrors<TFieldValues> => {
  const fieldErrors: FieldErrors<TFieldValues> = {};
  for (const path in errors) {
    const field = get(fields, path) as Field['_f'] | undefined;
    set(
      fieldErrors,
      path,
      Object.assign(errors[path], {ref: field && field.ref}),
    );
  }

  return fieldErrors;
};
const parseErrorSchema = (
  error: Yup.ValidationError,
  validateAllFieldCriteria: boolean,
) => {
  return error.inner.reduce<Record<string, FieldError>>((previous, error) => {
    if (!previous[error.path!]) {
      previous[error.path!] = {message: error.message, type: error.type!};
    }

    if (validateAllFieldCriteria) {
      const types = previous[error.path!].types;
      const messages = types && types[error.type!];

      previous[error.path!] = appendErrors(
        error.path!,
        validateAllFieldCriteria,
        previous,
        error.type!,
        messages
          ? ([] as string[]).concat(messages as string[], error.message)
          : error.message,
      ) as FieldError;
    }

    return previous;
  }, {});
};

export const yupResolver: Resolver =
  (
    schema,
    schemaOptions = {
      abortEarly: false,
    },
    resolverOptions = {},
  ) =>
  async (values, context, options) => {
    try {
      if (schemaOptions.context && process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(
          "You should not used the yup options context. Please, use the 'useForm' context object instead",
        );
      }

      const result = await schema[
        resolverOptions.mode === 'sync' ? 'validateSync' : 'validate'
      ](values, Object.assign({}, schemaOptions, {context}));

      return {
        values: result,
        errors: {},
      };
    } catch (e) {
      return {
        values: {},
        errors: toNestError(
          parseErrorSchema(e, options.criteriaMode === 'all'),
          options.fields,
        ),
      };
    }
  };
