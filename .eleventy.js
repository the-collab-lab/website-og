// https://www.11ty.dev/docs/config/
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');

module.exports = function (eleventyConfig) {
  // Used to copy additional files that are not page templates
  // https://www.11ty.dev/docs/copy/
  eleventyConfig.addPassthroughCopy('pages/assets');
  eleventyConfig.addPassthroughCopy('pages/favicon.ico');
  eleventyConfig.addPassthroughCopy({
    'pages/google657107b6feadb517.html': 'google657107b6feadb517.html',
  });
  eleventyConfig.addPassthroughCopy('_redirects');

  // Used for creating infinite-depth hierarchical navigation
  // https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // https://www.11ty.dev/docs/shortcodes/
  // Used to extend template engines with custom functions
  eleventyConfig.addShortcode(
    'generateSocialMediaLinkLabel',
    function (name, platform) {
      return `Connect with ${name} on ${platform}.`;
    },
  );

  return {
    dir: {
      input: 'pages',
      output: 'build',
    },
  };
};
