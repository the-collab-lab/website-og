const { getPages } = require('./graphql/data');

module.exports = async () => {
  const pages = await getPages();
  const filtered = pages.filter(page => '/apply/' === page.slug);
  let html = '';

  if (filtered.length > 0) {
    const page = filtered[0]; // should only ever be one page result per slug

    // render any images
    if (page.imageFloatedRights.length > 0) {
      // only use the first floated image, always display at the top of the page
      // yeah, it's limiting, but it's temporary until GraphCMS supports embedded entities
      const img = page.imageFloatedRights[0];
      html += `<figure class="float-right image-floated-right"><img src="${img.path}" alt="${img.caption}" /><figcaption>${img.caption}</figcaption></figure>`;
    }

    // render any text blocks
    if (page.textBlocks.length > 0) {
      page.textBlocks.forEach(block => {
        if (block.visible) {
          html += block.textContent.html;
        }
      });
    }
  }

  return {
    html,
  };
};
