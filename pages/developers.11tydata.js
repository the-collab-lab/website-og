const { getTeams } = require('./graphql/data');

module.exports = async () => {
  const teams = await getTeams();

  return {
    teams,
  };
};
