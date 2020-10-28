const { request } = require('graphql-request');
const format = require('date-fns/format');
const parseISO = require('date-fns/parseISO');
const { TeamsQuery } = require('./queries');

/**
 * Transforms two dates of type 2020-10-10 and 2020-11-11 to
 * October 2020 - November 2020
 *
 * Used in the Teams section.
 */
const calculatedDate = ({ startDate, endDate }) =>
  `${format(parseISO(startDate), 'MMMM-y')} - ${format(
    parseISO(endDate),
    'MMMM-y',
  )}`;

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

exports.getTeams = getTeams;
