const { request } = require('graphql-request');
const format = require('date-fns/format');
const parseISO = require('date-fns/parseISO');
const { TeamsQuery, MentorsQuery, AdvisorsQuery, FoundersQuery, PagesQuery, TechTalksQuery, FrontPageApplicationBlock } = require('./queries');

/**
 * Transforms two dates of type 2020-10-10 and 2020-11-11 to
 * October 2020 - November 2020
 *
 * Used in the Teams section.
 */
const calculatedDate = ({ startDate, endDate }) => {
  let startMask = 'MMMM y';
  let endMask = 'MMMM y';

  // if the years are the same, don’t show the year twice
  // e.g., "December 2019 – January 2020"
  // e.g., "October – November 2020"
  if (startDate.slice(0, 4) === endDate.slice(0, 4)) {
    startMask = 'MMMM';
  }

  let formattedStartDate = format(parseISO(startDate), startMask);
  let formattedEndDate = format(parseISO(endDate), endMask);

  return `${formattedStartDate} – ${formattedEndDate}`;
};

/**
 * Blocks allow us to build up arbitrary pages composed of other entities.
 * This function takes a `blocks` array from a `Pages` query and assembles
 * the HTML to be rendered.
 *
 * The default type is `TextBlock`. Adding new types would entail creatiing
 * a content model in GraphCMS then adding a `case` statement to this
 * function to handle rendering of that type.
 */
const assembleBlocks = blocks => {
  let html = '';
  if (Array.isArray(blocks)) {
    blocks.forEach(block => {
      switch (block.__typename) {
        case 'ImageFloatedRight':
          html += `<figure class="float-right image-floated-right"><img src="${block.path}" alt="${block.caption}" /><figcaption>${block.caption}</figcaption></figure>`;
        break;
        default: // 'TextBlock' (only add if visible: true)
          html += block.visible ? block.textContent.html : '';
        break;
      }
    });
  }
  return html;
};

// Generate Team Number for sorting
const calculateTeamNumber = (anchor) =>
  anchor.includes('pilot') ? 8.5 : parseInt(anchor.split('-').pop());

const graphQLEndpoint =
  'https://api-us-east-1.graphcms.com/v2/ckfwosu634r7l01xpco7z3hvq/master';

/**
 * Data transformation layer. Prepare the data to be consumed by the templates
 */
const getTeams = async () => {
  try {
    const { teams } = await request(graphQLEndpoint, TeamsQuery);
    const result = teams.map((team) => ({
      ...team,
      calculatedDate: calculatedDate({
        startDate: team.startDate,
        endDate: team.endDate,
      }),
      teamNumber: calculateTeamNumber(team.anchor),
    }));

    return result.filter(team => team.visible).sort((a, b) => b.teamNumber - a.teamNumber);
  } catch (e) {
    throw new Error('There was a problem getting Teams', e);
  }
};

const getMentors = async () => {
  try {
    const { collabies } = await request(graphQLEndpoint, MentorsQuery);
    return collabies;
  } catch (e) {
    throw new Error('There was a problem getting Mentors', e);
  }
};

const getAdvisors = async () => {
  try {
    const { collabies } = await request(graphQLEndpoint, AdvisorsQuery);
    return collabies;
  } catch (e) {
    throw new Error('There was a problem getting Advisors', e);
  }
};

const getFounders = async () => {
  try {
    const { collabies } = await request(graphQLEndpoint, FoundersQuery);
    return collabies;
  } catch (e) {
    throw new Error('There was a problem getting Founders', e);
  }
};

const getPages = async () => {
  try {
    const { pages } = await request(graphQLEndpoint, PagesQuery);
    // assemble html for the pages
    const assembledPages = pages.map(page => {
      const assembledPage = {
        slug: page.slug,
        html: null,
      };
      assembledPage.html = assembleBlocks(page.blocks);
      return assembledPage;
    });
    // an assembled page will have the following shape:
    // {
    //   slug: '/apply/',
    //   html: '<h2>Title</h2><p>Some text.</p>',
    // }
    return assembledPages;
  }
  catch (e) {
    throw new Error('There was a problem getting Pages', e);
  }
};

const getTechTalks = async () => {
  const rgx = /(v=([\w-]+))|(be\/([\w-]+))/; // there's probably room for improvement here
  try {
    const { techTalks } = await request(graphQLEndpoint, TechTalksQuery);
    const result = techTalks.map(talk => {
      talk.formattedDate = format(parseISO(talk.dateAndTime), 'd MMM y');
      talk.youTubeEmbedUrl = null;
      if (talk.youTubeUrl) {
        // source = https://www.youtube.com/watch?v=3mci0a8AWnI
        // source = https://youtu.be/FU7v7JI5-pg
        // target = https://www.youtube.com/embed/3mci0a8AWnI
        const matches = talk.youTubeUrl.match(rgx);
        // depending on the format of the input URL, the slug will be at either
        // position 2 or position 4 of the `matches` array
        if (matches && (matches[2] || matches[4])) {
          const id = matches[2] || matches[4];
          talk.youTubeEmbedUrl = `https://www.youtube.com/embed/${id}`;
        }
      }
      return talk;
    });
    return result;
  }
  catch (e) {
    throw new Error('There was a problem getting Tech Talks', e);
  }
};

const getFrontPageApplicationBlock = async () => {
  try {
    const block = await request(graphQLEndpoint, FrontPageApplicationBlock);
    return block;
  }
  catch (e) {
    throw new Error('There was a problem getting Front Page Application Block', e);
  }
};

exports.getTeams = getTeams;
exports.getMentors = getMentors;
exports.getAdvisors = getAdvisors;
exports.getFounders = getFounders;
exports.getPages = getPages;
exports.getTechTalks = getTechTalks;
exports.getFrontPageApplicationBlock = getFrontPageApplicationBlock;
