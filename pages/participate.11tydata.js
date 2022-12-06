const { getPages } = require('./graphql/data');

module.exports = async () => {
  const pages = await getPages();
  const filtered = pages.filter((page) => '/participate/' === page.slug);
  let html = filtered.length > 0 ? filtered[0].html : '';

  return {
    html,
  };
};
