/**
 * @fileoverview Omit usestate in everywhere but elements
 * @author Alex Postnikov
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-usestate-in-tsx'),
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
ruleTester.run('no-usestate-in-tsx', rule, {
  valid: ["const f = 'abc'"],

  invalid: [
    {
      code: 'const [f, setF] = useState("");',
      errors: [{ message: 'State should be separated' }],
    },
  ],
});
