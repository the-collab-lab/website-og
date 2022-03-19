module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('pages/assets');
  eleventyConfig.addPassthroughCopy('pages/favicon.ico');
  eleventyConfig.addPassthroughCopy({
    'pages/google657107b6feadb517.html': 'google657107b6feadb517.html',
  });

  eleventyConfig.addPassthroughCopy('_redirects');

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
