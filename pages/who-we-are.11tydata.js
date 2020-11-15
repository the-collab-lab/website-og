const { getTeams, getMentors } = require('./graphql/data');

module.exports = async () => {
  const teams = await getTeams();
  const mentors = await getMentors();
  console.log('this is mentors', mentors);

  return {
    teams,
    mentors,
  };
};
