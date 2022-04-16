const { getPages, getVolunteers } = require('./graphql/data');

module.exports = async () => {
  const volunteers = await getVolunteers();
  const pages = await getPages();
  const filtered = pages.filter(page => '/mentor/' === page.slug);
  let html = filtered.length > 0 ? filtered[0].html : '';
  return { html, volunteers };
};
