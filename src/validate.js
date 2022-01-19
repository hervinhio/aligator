import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import {
  ArgumentsAndContractsMismatchError,
  ContractViolationError,
  IllegalArgumentsError,
  NoAvailableValidatorError,
} from './errors';
import validators from './validators';

/**
 * Validates a set of arguments against their corresponding contracts.
 * @param {Array|Object} args The arguments to validate. If an object then the
 * 'contracts' argument must also be an ojbect with the exact same fields.
 * @param {Array|Object} contracts The contracts used to validate the arguments
 */
export default function validateArgs(args, contracts) {
  if (areArgsAndContractsAreDefined(args, contracts)) {
    assertArgsCountAndContractCountAreEqual(args, contracts);
    assertArgsAndContractsAreArraysOrObjects(args, contracts);
    assertEachArgMeetsContract(args, contracts);
  }
}

/**
 * Validates that args and contracts are both defined
 * @param {Array|Object} args The arguments to validate. If an object then the
 * 'contracts' argument must also be an ojbect with the exact same fields.
 * @param {Array|Object} contracts The contracts used to validate the arguments
 * @return {bool} true if both args and contracts are defined. False otherwise
 */
function areArgsAndContractsAreDefined(args, contracts) {
  return !!args && !!contracts;
}

/**
 * Validates that the number of args is equal to the number of contracts
 * @param {Array|Object} args The arguments to validate. If an object then the
 * 'contracts' argument must also be an ojbect with the exact same fields.
 * @param {Array|Object} contracts The contracts used to validate the arguments
 */
function assertArgsCountAndContractCountAreEqual(args, contracts) {
  const bothArgsAndContractsAreArrays = isArray(args) && isArray(contracts);

  assertArgsAndContractsAreOfTheSameType(args, contracts);

  const argsCount = bothArgsAndContractsAreArrays ?
    args.length :
    Object.entries(args).length;
  const contractsCount = bothArgsAndContractsAreArrays ?
    args.length :
    Object.entries(contracts).length;

  if (argsCount !== contractsCount) {
    const message = 'The number of arguments differs from theat of contracts';
    throw new ArgumentsAndContractsMismatchError(message);
  }
}

/**
 * Validates that args and contracts are both either objects or arguments
 * @param {Array|Object} args The arguments to validate. If an object then the
 * 'contracts' argument must also be an ojbect with the exact same fields.
 * @param {Array|Object} contracts The contracts used to validate the arguments
 */
function assertArgsAndContractsAreOfTheSameType(args, contracts) {
  const bothArgsAndContractsAreArrays = isArray(args) && isArray(contracts);
  const bothArgsAndContractsAreObject = isObject(args) && isObject(contracts);

  if (!bothArgsAndContractsAreArrays && !bothArgsAndContractsAreObject) {
    const message = 'Args and contracts must both be arrays or both be objects';
    throw new ArgumentsAndContractsMismatchError(message);
  }
}

/**
 * Validates that args and contracts are arrays of the same length
 * @param {Array|Object} args The arguments to validate. If an object then the
 * 'contracts' argument must also be an ojbect with the exact same fields.
 * @param {Array|Object} contracts The contracts used to validate the arguments
 */
function assertArgsAndContractsAreArraysOrObjects(args, contracts) {
  const argsAreAnArrayOrAnObject = isArray(args) || isObject(args);
  const contractsAreAnArrayOrAnObject = isArray(args) || isObject(contracts);

  if (!argsAreAnArrayOrAnObject || !contractsAreAnArrayOrAnObject) {
    const message = 'Args and contracts must be either objects or arrays';
    throw new IllegalArgumentsError(message);
  }
}

/**
 * Validates that each argument meets a its contract
 * @param {Array|Object} args The arguments to validate. If an object then the
 * 'contracts' argument must also be an ojbect with the exact same fields.
 * @param {Array|Object} contracts The contracts used to validate the arguments
 */
function assertEachArgMeetsContract(args, contracts) {
  if (isObject(args)) {
    Object.entries(args).forEach(([key, value]) => {
      assertArgMeetsContract(value, contracts[key]);
    });
  } else {
    args.forEach((arg, index) => {
      assertArgMeetsContract(arg, contracts[index]);
    });
  }
}

/**
 * Validates that an argument meets its contract
 * @param {any} arg The arguments to validate. If an object then the
 * 'contracts' argument must also be an ojbect with the exact same fields.
 * @param {Object} contract The contracts used to validate the arguments
 */
function assertArgMeetsContract(arg, contract) {
  assertContractIsAnObject(contract);
  assertAllContractValidatorAreGreen(arg, contract);
}

/**
 * Validates that the contract is an object
 * @param {Object} contract The contracts used to validate the arguments
 */
function assertContractIsAnObject(contract) {
  if (!isObject(contract)) {
    throw new IllegalArgumentsError('Contract should be an object');
  }
}

/**
 * Validates that for an argument, each rule in the contract is met
 * @param {Array|Object} arg The argument to validate
 * @param {Array|Object} contract The contract used to validate the argument
 */
function assertAllContractValidatorAreGreen(arg, contract) {
  Object.keys(contract).forEach((rule) => {
    assertThereExistAValidatorForTheContractRule(rule);
    assertArgumentRespectsRule(arg, rule, contract);
  });
}

/**
 * Validates that there exist a validator defined a rule in a contract
 * @param {String} rule The rule to check
 */
function assertThereExistAValidatorForTheContractRule(rule) {
  const validator = validators[rule];
  if (validator === undefined || validator === null) {
    const message = `No validator defined for the rule ${rule}`;
    throw new NoAvailableValidatorError(message);
  }
}

/**
 * Validates that an argument meets a rule
 * @param {any} arg The argument to validate
 * @param {String} rule The contract's rule to validate
 * @param {Object} contract The contract from wich the rule is taken
 */
function assertArgumentRespectsRule(arg, rule, contract) {
  const validator = validators[rule];
  if (validator(arg, contract)) {
    throw new ContractViolationError(`Argument violates rule ${rule}`);
  }
}
