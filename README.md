# Aligator

[![CircleCI](https://circleci.com/gh/hervinhio/aligator/tree/main.svg?style=svg)](https://circleci.com/gh/hervinhio/aligator/tree/main)

A contract based runtime argument validation for JavaScript.

## Install
`(npm | yarn) install`

## What is Aligator
A tool that helps validate arguments at runtime. Altough it was built with arguments in mind Aligator can be used to validate anything against a contract.
- A contract is an object that spcifies the rules against wich the argument will be validated.
- A validator is component that is able to validate an individual argument against a contract. Custom validators can be provided that can even override core validators.

### Example 1
```
function (arg1, arg2, arg3) {
    // Will throw if any argument doesn't meet its contract
    validate(
        // One may used the predfined constant `arguments`
        [arg1, arg2, arg3], 
        [
            { allowsNull: true, allowsUndefined: true, ... },
            ...
        ]
    );
}
```
It is important that contracts are passed in the same order as the arguments they are meant for.
### Example 2
The validation also accepts objects as inputs, a good way to validate an entier object.
```
function (arg) {
    // Will throw if any argument doesn't meet its contract
    validate(
        // Suppose `args`contains fields from field1 to fieldN
        arg, 
        {
            field1:  {
                allowsNull: false,
                allowsUndefined: false,
            },
            field2: {
                allowsNull: true,
                allowsUndefined: true,
            },
            ...
        },
    );
}
```