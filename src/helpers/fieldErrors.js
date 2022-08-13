export default function fieldErrors(errors) {
  const fieldErrors =
    typeof errors === "object" &&
    errors?.reduce((listErrors, error) => {
      if (error?.field) listErrors[error?.field] = error;
      return listErrors;
    }, {});
  return fieldErrors;
}
