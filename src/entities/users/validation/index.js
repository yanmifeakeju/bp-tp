import Ajv from 'ajv';
import userSchema from '../../../lib/validation/schemas/users/user.json';

export default function validate(data) {
  const ajvValidate = new Ajv({ allErrors: true }).addFormat('email', /^[\w.+]+@\w+\.\w+$/).compile(userSchema);

  const valid = ajvValidate(data);
  if (!valid) return { valid: false, errors: ajvValidate.errors };

  return { valid: true, errors: null };
}
