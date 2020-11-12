const { request } = require('graphql-request');
const format = require('date-fns/format');
const parseISO = require('date-fns/parseISO');
const { TeamsQuery, MentorsQuery } = require('./queries');

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
    }));

    return result;
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

exports.getTeams = getTeams;
exports.getMentors = getMentors;
