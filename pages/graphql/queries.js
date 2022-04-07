const { gql } = require('graphql-request');

const TeamsQuery = gql`
  query Teams {
    teams(where: { visible: true }, orderBy: startDate_DESC) {
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

const PagesQuery = gql`
  query GetPages {
    pages {
      slug
      blocks {
        __typename
        ... on TextBlock {
          textContent {
            html
          }
          visible
        }
        ... on ImageFloatedRight {
          path
          caption
        }
      }
    }
  }
`;

const TechTalksQuery = gql`
  query GetTechTalks {
    techTalks(orderBy: dateAndTime_DESC) {
      title
      presenters {
        fullName
      }
      dateAndTime
      description {
        html
      }
      meetupUrl
      youTubeUrl
      image {
        url
        width
        height
      }
      visible
    }
  }
`;

const FrontPageApplicationBlock = gql`
  query GetApplicationBlock {
    textBlocks(
      where: {
        internalName_contains: "Front Page – Applications"
        visible: true
      }
    ) {
      textContent {
        html
      }
    }
  }
`;

const StaffQuery = gql`
  query Volunteers {
    collabies(
      where: { NOT: { roles_every: { name: "Participant" } }, visible: true }
      orderBy: firstName_ASC
    ) {
      bio {
        html
      }
      roles(where: { name_not: "Participant" }) {
        name
      }
      firstName
      fullName
      pathToPhoto
      gitHubUrl
      linkedInUrl
      twitterUrl
    }
  }
`;

exports.TeamsQuery = TeamsQuery;
exports.PagesQuery = PagesQuery;
exports.TechTalksQuery = TechTalksQuery;
exports.FrontPageApplicationBlock = FrontPageApplicationBlock;
exports.StaffQuery = StaffQuery;
