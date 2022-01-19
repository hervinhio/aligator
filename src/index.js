import validateArgs from './validate';

/**
 * Validates a set of arguments against their corresponding contracts
 * @param {Array|Object} args An array or object of arguments to validate.
 * If it is an object then the contracts argument must also be an object whith
 * the exact same fields.
 * @param {Array|Object} contracts The contracts used to validate the arguments.
 * If an array, must match the order of arguments.
 */
export default function validate(args, contracts) {
  validateArgs(args, contracts);
}
