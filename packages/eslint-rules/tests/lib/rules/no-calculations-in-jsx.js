/**
 * @fileoverview No calculations should be done inside JSX tags
 * @author Alex Postnikov
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-calculations-in-jsx'),
  RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('no-calculations-in-jsx', rule, {
  valid: [
    '<input onChange={()=>{applySomething()}}/>',
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: `<><input onChange={()=>{applySomething()}}/>
             <input onChange={()=>{const v=1;}}/></>`,
      errors: [{ message: 'Calculation inside JSX ("return" or "const" found)' }],
    },
  ],
});
