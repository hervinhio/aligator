import validate from '.';
import {NoAvailableValidatorError} from './errors';

describe('validate', () => {
  it('should not throw when args is not defined or null', () => {
    const fn = () => validate(null, [{allowsNull: false}]);
    expect(fn).not.toThrow();
  });

  it('should not throw when args is not defined or null', () => {
    const fn = () => validate({}, undefined);
    expect(fn).not.toThrow();
  });

  it('should throw NoAvailableValidatorError - rule with no validator', () => {
    const fn = () => validate({foo: 'bar'}, {foo: {shouldMatchFoo: true}});
    expect(fn).toThrow(NoAvailableValidatorError);
  });
});
