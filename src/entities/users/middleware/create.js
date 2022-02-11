import asyncHandler from '../../../helpers/async-handler';
import formatValidationErrors from '../../../helpers/format-validation-errors';
import ValidationError from '../../../lib/errors/validation-error';
import validate from '../validation';

const validatePayload = asyncHandler(async (req, res, next) => {
  const isValid = validate(req.body);

  if (!isValid.valid) {
    const errors = formatValidationErrors(isValid.errors);
    next(new ValidationError('Validation Failed', errors));
    return;
  }
  next();
});

export default validatePayload;
