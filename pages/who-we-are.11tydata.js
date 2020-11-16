const { getTeams, getMentors, getAdvisors, getFounders } = require('./graphql/data');

module.exports = async () => {
  const teams = await getTeams();
  const mentors = await getMentors();
  const advisors = await getAdvisors();
  const founders = await getFounders();

  return {
    teams,
    mentors,
    advisors,
    founders,
  };
};
