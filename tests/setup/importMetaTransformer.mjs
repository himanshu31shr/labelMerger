import { testEnv } from './testEnv.js';

export default {
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