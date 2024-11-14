module.exports = (options) => {
  return {
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
  };
};
