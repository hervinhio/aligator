/**
 * Throwed when arguments and contracts are incompatible
 */
export class ArgumentsAndContractsMismatchError extends Error {
  /**
   * @param {String} what The error's message
   */
  constructor(what) {
    super(what);
    this.name = 'ArgumentsAndContractsMismatchError';
  }
}

/**
 * Throwed when an argument's value cannot be used
 */
export class IllegalArgumentsError extends Error {
  /**
   * @param {String} what The error's message
   */
  constructor(what) {
    super(what);
    this.name = 'IllegalArgumentsError';
  }
}

/**
 * Throwed when an argument does not respect its contract
 */
export class ContractViolationError extends Error {
  /**
   * @param {String} what The error's message
   */
  constructor(what) {
    super(what);
    this.name = 'ContractViolationError';
  }
}

/**
 * Throwed when there is no validator defined for a rule in a contract
 */
export class NoAvailableValidatorError extends Error {
  /**
   * @param {String} what The error's message
   */
  constructor(what) {
    super(what);
    this.name = 'NoAvailableValidatorError';
  }
}
