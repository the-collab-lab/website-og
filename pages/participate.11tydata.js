const { getPages, getTeams, getAdvisors, getFounders } = require('./graphql/data');

module.exports = async () => {
  const teams = await getTeams();
  const advisors = await getAdvisors();
  const founders = await getFounders();

  const pages = await getPages();
  const filtered = pages.filter(page => '/apply/' === page.slug);
  let html = filtered.length > 0 ? filtered[0].html : '';

  return {
    html,
    teams,
    advisors,
    founders,
  };
};
