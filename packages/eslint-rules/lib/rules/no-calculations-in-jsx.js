/**
 * @fileoverview No calculations should be done inside JSX tags
 * @author Alex Postnikov
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: 'No calculations should be done inside JSX tags',
      category: 'Fill me in',
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      JSXAttribute: (node) => {
        const attributeText = context.getSourceCode().getText(node);
        if (attributeText.indexOf('return ') > 0 || attributeText.indexOf('const ') > 0) {
          context.report({ node, message: 'Calculation inside JSX ("return" or "const" found)' });
        }
      },
    };
  },
};
