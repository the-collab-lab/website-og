const { getTeams, getAdvisors, getFounders } = require('./graphql/data');

module.exports = async () => {
  const teams = await getTeams();
  const advisors = await getAdvisors();
  const founders = await getFounders();

  return {
    teams,
    advisors,
    founders,
  };
};
