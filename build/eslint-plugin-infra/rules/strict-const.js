export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This is my first ESLint Rule',
      url: 'https://github.com/kholstinin/infra-homework/blob/main/TASK-4.md'
    },
    messages: {
      useGlobalThis: 'Wrong usage of runtime const, please use globalThis.{{name}}',
      doNotUseGlobalThis: 'Wrong usage of buildtime const, please use {{name}} without globalThis'
    },
    schema: [{
      type: 'object'
    }]
  },
  create(context) {
    const constants = context.options[0] ? Object.keys(context.options[0]) : [];

    const isConst = (str) => str === str.toUpperCase();
    const isProperty = (node) => node?.parent?.type === 'Property';
    const isMemberExpression = (node) => typeof node?.parent?.object?.name === 'string';
    const hasGlobalThis = (node) => node?.parent?.object?.name === 'globalThis';
    const hasInList = (name) => constants.includes(name);

    return {
      Identifier(node) {
        const { name } = node;

        if(name != null && isConst(name)) {
          if (hasInList(name)) {
            if (hasGlobalThis(node)) {
              return context.report({
                node,
                messageId: 'doNotUseGlobalThis',
                data: {
                  name
                }
              });
            }
          } else {
            if (!isMemberExpression(node) && !isProperty(node)) {
              return context.report({
                node,
                messageId: 'useGlobalThis',
                data: {
                  name
                }
              });
            }
          }
        }
      }
    }
  }
}
