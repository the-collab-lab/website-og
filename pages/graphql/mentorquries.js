const { gql } = require('graphql-request');

const MentorsQuery = gql`
  query Teams {
    teams(orderBy: startDate_DESC) {
      anchor
      displayName
      developers: participants(orderBy: firstName_ASC) {
        firstName
        fullName
        bio {
          html
        }
      }
    }
  }
`;

exports.MentorsQuery = MentorsQuery;