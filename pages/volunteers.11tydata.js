const { getVolunteers } = require('./graphql/data');

module.exports = async () => {
  const volunteers = await getVolunteers();
  return { volunteers };
};
