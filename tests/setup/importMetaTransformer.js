const { testEnv } = require('../setup/testEnv');

module.exports = {
  process(sourceText) {
    const modifiedCode = sourceText.replace(
      /import\.meta\.env/g,
      JSON.stringify({ ...testEnv }).replace(/"/g, '')
    );
    return {
      code: modifiedCode,
    };
  },
};