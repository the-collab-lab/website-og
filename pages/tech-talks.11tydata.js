const { getTechTalks } = require('./graphql/data');

module.exports = async () => {
  const techTalks = await getTechTalks();

  return {
    techTalks,
  };
};
