const { getFrontPageApplicationBlock } = require('./graphql/data');

module.exports = async () => {
  const block = await getFrontPageApplicationBlock();

  return {
    applicationBlock: block.textBlocks[0].textContent.html,
  };
};
