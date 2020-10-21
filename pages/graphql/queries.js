const { gql } = require('graphql-request');

const CohortsQuery = gql`
  query Cohorts {
    cohorts: teams(orderBy: startDate_DESC) {
      displayName
      startDate
      endDate
      participants: participants(orderBy: firstName_ASC) {
        firstName
        fullName
        pathToPhoto
        gitHubUrl
        linkedInUrl
        twitterUrl
        bio {
          html
        }
      }
    }
  }
`;

exports.CohortsQuery = CohortsQuery;
