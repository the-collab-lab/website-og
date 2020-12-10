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
      where: {
        roles_some: {name: "Advisor"},
        roles_none: {name: "Founder"}
      }
      orderBy: firstName_ASC
    ) {
      firstName
      bio {
        html
      }
    }
  }
`;

const FoundersQuery = gql`
  query GetFounders {
    collabies(
      where: { roles_some: {name: "Founder"} }
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
      slug,
      navigationTitle,
      breadcrumbValue,
      textBlocks {
        textContent {
          html
        },
        visible
      },
      imageFloatedRights {
        path,
        caption
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

exports.TeamsQuery = TeamsQuery;
exports.MentorsQuery = MentorsQuery;
exports.AdvisorsQuery = AdvisorsQuery;
exports.FoundersQuery = FoundersQuery;
exports.PagesQuery = PagesQuery;
exports.TechTalksQuery = TechTalksQuery;
