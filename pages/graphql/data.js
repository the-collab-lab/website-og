const { request } = require('graphql-request');
const format = require('date-fns/format');
const parseISO = require('date-fns/parseISO');
const keyBy = require('lodash.keyby');
const { CohortsQuery } = require('./queries');

const cohortDate = ({ startDate, endDate }) =>
  `${format(parseISO(startDate), 'MMMM-y')} - ${format(
    parseISO(endDate),
    'MMMM-y',
  )}`;

const graphQLEndpoint =
  'https://api-us-east-1.graphcms.com/v2/ckfwosu634r7l01xpco7z3hvq/master';

/**
 * Data transformation layer. Prepare the data to be consumed by the templates
 */
const cohorts = async () => {
  try {
    const { cohorts } = await request(graphQLEndpoint, CohortsQuery);
    const result = cohorts.map((cohort) => ({
      ...cohort,
      cohortDate: cohortDate({
        startDate: cohort.startDate,
        endDate: cohort.endDate,
      }),
    }));

    return result;
  } catch (e) {
    throw new Error('There was a problem getting Collabies', e);
  }
};

exports.cohorts = cohorts;
