export default function formatValidationErrors(errors) {
  return errors.map((error) => formatErrors(error));
}

function formatErrors(error) {
  if (error.keyword === 'required') {
    const field = error.params.missingProperty;
    return {
      code: error.keyword,
      field,
      message: `The paylaod ${error.message}`
    };
  }
  if (error.keyword === 'format') {
    const field = error.params.format;
    return {
      code: error.keyword,
      field,
      message: `The payload must match a valid ${field} format`
    };
  }

  if (error.keyword === 'type') {
    const field = error.schemaPath.split('/').slice(-2, -1)[0];
    return {
      code: error.keyword,
      field,
      message: `The field ${field} ${error.message}`
    };
  }

  if (error.keyword === 'additionalProperties') {
    const field = error.params.additionalProperty;
    return {
      code: error.keyword,
      field,
      message: `The payload contain invalid field ${field}`
    };
  }

  if (error.keyword === 'minLength') {
    const field = error.schemaPath.split('/').slice(-2, -1)[0];
    return {
      code: error.keyword,
      field,
      message: `The field ${field} ${error.message}`
    };
  }

  return {
    code: 'generic',
    message: 'Invalid payload'
  };
}
