import validate from '.';
import {ContractViolationError} from './errors';

describe('Core validators', () => {
  describe('allowsNull', () => {
    it('should throw ContractViolationError when argument is null', () => {
      const fn = () => validate([null], [{allowsNull: false}]);
      expect(fn).toThrow(ContractViolationError);
    });

    it('should not throw when arguments is not null', () => {
      const fn = () => validate([{}], [{allowsNull: false}]);
      expect(fn).not.toThrow();
    });

    it('should not throw when null allowed, argument is null', () => {
      const fn = () => validate([null], [{allowsNull: true}]);
      expect(fn).not.toThrow();
    });

    it('should not throw when null allowed, argument is not null', () => {
      const fn = () => validate([{foo: 'bar'}], [{allowsNull: true}]);
      expect(fn).not.toThrow();
    });
  });

  describe('allowsUndefined', () => {
    it('should throw ContractViolationError when argument is undefined', () => {
      const fn = () => validate([undefined], [{allowsUndefined: false}]);
      expect(fn).toThrow(ContractViolationError);
    });

    it('should not throw when arguments is not undefined', () => {
      const fn = () => validate([{}], [{allowsUndefined: false}]);
      expect(fn).not.toThrow();
    });

    it('should not throw undefined allowed, argument undefined', () => {
      const fn = () => validate([undefined], [{allowsUndefined: true}]);
      expect(fn).not.toThrow();
    });

    it('should not throw when undefined is allowed, argument defined', () => {
      const fn = () => validate([{foo: 'bar'}], [{allowsUndefined: true}]);
      expect(fn).not.toThrow();
    });
  });
});
