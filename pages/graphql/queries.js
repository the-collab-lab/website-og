const { gql } = require('graphql-request');

const TeamsQuery = gql`
  query Teams {
    teams(orderBy: startDate_DESC) {
      anchor
      displayName
      startDate
      endDate
      visible
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
        roles_some: { name: "Mentor" }
        roles_none: { name: "Founder" }
        visible: true
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
      where: {
        roles_some: { name: "Advisor" }
        roles_none: { name: "Founder" }
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

const FoundersQuery = gql`
  query GetFounders {
    collabies(
      where: { roles_some: { name: "Founder" } }
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

const VolunteersQuery = gql`
  query Volunteers {
    collabies(
      where: {
        NOT: { roles_every: { name: "Participant" } }
        roles_none: { name: "Founder" }
        visible: true
      }
      orderBy: firstName_ASC
    ) {
      firstName
      fullName
      roles(where: { name_not: "Participant" }) {
        name
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
exports.AdvisorsQuery = AdvisorsQuery;
exports.FoundersQuery = FoundersQuery;
exports.PagesQuery = PagesQuery;
exports.TechTalksQuery = TechTalksQuery;
exports.FrontPageApplicationBlock = FrontPageApplicationBlock;
exports.VolunteersQuery = VolunteersQuery;
