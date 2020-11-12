const { gql } = require('graphql-request');

const TeamsQuery = gql`
  query Teams {
    teams(orderBy: startDate_DESC) {
      anchor
      displayName
      startDate
      endDate
      developers: participants(orderBy: firstName_ASC) {
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

const MentorsQuery = gql`
  query GetMentors {
    collabies(
      where: { roles_some: { name: "Mentor" } }
      orderBy: firstName_ASC
    ) {
      firstName
      fullName
      bio {
        html
      }
      pathToPhoto
      gitHubUrl
      linkedInUrl
      twitterUrl
    }
  }
`;

exports.TeamsQuery = TeamsQuery;
exports.MentorsQuery = MentorsQuery;
