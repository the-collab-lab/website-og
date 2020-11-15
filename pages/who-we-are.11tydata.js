const { getTeams, getMentors, getAdvisors } = require('./graphql/data');

module.exports = async () => {
  const teams = await getTeams();
  const mentors = await getMentors();
  const advisors = await getAdvisors();

  return {
    teams,
    mentors,
    advisors,
  };
};
