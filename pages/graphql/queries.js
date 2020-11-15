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
      where: {
        roles_some: {name: "Mentor"},
        roles_none: {name: "Founder"}
      }
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

const AdvisorsQuery = gql`
  query GetAdvisors {
    collabies(
      where: { roles_some: {name: "Advisor"} }
      orderBy: firstName_ASC
    ) {
      firstName
      bio {
        html
      }
    }
  }
`;

exports.TeamsQuery = TeamsQuery;
exports.MentorsQuery = MentorsQuery;
exports.AdvisorsQuery = AdvisorsQuery;
