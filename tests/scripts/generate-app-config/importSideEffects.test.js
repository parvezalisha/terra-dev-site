const importSideEffects = require('../../../scripts/generate-app-config/importSideEffects');
const ImportAggregator = require('../../../scripts/generate-app-config/generation-objects/ImportAggregator');

describe('importSideEffects', () => {
  it('finds the correct side effect js files', () => {
    const sideEffects = [
      '../tests/scripts/generate-app-config/sideEffectFiles/normal',
      '../tests/scripts/generate-app-config/sideEffectFiles/jsx',
      '../tests/scripts/generate-app-config/sideEffectFiles/extension.js',
      `${process.cwd()}/tests/scripts/generate-app-config/sideEffectFiles/fullpath`,
      '../tests/scripts/generate-app-config/sideEffectFiles/*/*.js',
      '../tests/scripts/generate-app-config/sideEffectFiles/strangeExt.derp',
    ];
    const imports = new ImportAggregator();
    importSideEffects(sideEffects, imports);
    expect(Object.keys(imports.imports).length).toBe(7);
    expect(Object.keys(imports.imports)).toEqual(expect.arrayContaining([
      `${process.cwd()}/tests/scripts/generate-app-config/sideEffectFiles/normal.js`,
      `${process.cwd()}/tests/scripts/generate-app-config/sideEffectFiles/jsx.jsx`,
      `${process.cwd()}/tests/scripts/generate-app-config/sideEffectFiles/extension.js`,
      `${process.cwd()}/tests/scripts/generate-app-config/sideEffectFiles/fullpath.js`,
      `${process.cwd()}/tests/scripts/generate-app-config/sideEffectFiles/glob/globa.js`,
      `${process.cwd()}/tests/scripts/generate-app-config/sideEffectFiles/glob/globb.js`,
      `${process.cwd()}/tests/scripts/generate-app-config/sideEffectFiles/strangeExt.derp.js`,
    ]));
  });
});
