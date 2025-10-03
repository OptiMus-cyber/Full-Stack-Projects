const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    preset: 'jest-preset-angular',
    roots: [__dirname + `/src`],
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    setupFilesAfterEnv: [__dirname + '/src/test.ts'],
    collectCoverage: false,
    coverageReporters: ['html'],
    coverageDirectory: 'coverage/Frontend',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
        prefix: __dirname
    })
};