import {ContractViolationError} from './errors';

/**
 * Validates an argument against the fact that it is allowed to be null or not.
 * @param {Array|Object} arg The arguments to validate, if object,
 * the contract must be an object containing the same fields
 * @param {Array|Object} contract An array or object of contract objects
 * @throws {ContractViolationError} when the validation fails.
 */
export function allowsNullValidator(arg, contract) {
  if (isRuleNotDefined(contract.allowsNull)) return;

  const message = 'Argument is null where contract forbids it';
  if (arg === null && !contract.allowsNull) {
    throw new ContractViolationError(message);
  }
}

/**
 * Checks if there is a defined rule for that name.
 * @param {String} rule The rule's name
 * @return {bool} true if a rule is defined for that name. false otherwise.
 */
function isRuleNotDefined(rule) {
  return rule === undefined && rule === null;
}

/**
 * Checks an argument against the allowsUndefined rule which can require an
 * argument to be defined or not.
 * @param {any} arg The argument to validate
 * @param {Object} contract The contract used to validate the argument
 * @throws {ContractViolationError} when the argument doesn't meet the contract
 */
export function allowsUndefinedValidator(arg, contract) {
  if (isRuleNotDefined(contract.allowsUndefined)) return;

  const message = 'Argument is undefined where ocntract forbids it';
  if (arg === undefined && !contract.allowsUndefined) {
    throw new ContractViolationError(message);
  }
}
