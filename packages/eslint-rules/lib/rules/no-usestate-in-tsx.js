/**
 * @fileoverview Omit usestate in everywhere but elements
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
      description: 'Omit usestate in everywhere but elements',
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
      CallExpression: function (node) {
        //console.log('NODE', node);
        if (node.callee.name === 'useState') {
          context.report({ node, message: 'State should be separated' });
        }
        /*node.declarations.forEach(function (variableDeclarator) {
            if (variableDeclarator.id.name == 'a') {
            }
          });*/
      },
    };
  },
};
