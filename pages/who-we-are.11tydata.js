const { gql, request } = require('graphql-request');

const graphQLEndpoint =
  'https://api-us-east-1.graphcms.com/v2/ckfwosu634r7l01xpco7z3hvq/master';

/**
 * See this query in GraphiQL: https://api-us-east-1.graphcms.com/v2/ckfwosu634r7l01xpco7z3hvq/master?operationName=GetCollabies&query=fragment%20collabieFields%20on%20Collabie%20%7B%0A%20%20fullName%0A%20%20bio%20%7B%0A%20%20%20%20html%0A%20%20%7D%0A%20%20pathToPhoto%0A%20%20gitHubUrl%0A%20%20linkedInUrl%0A%20%20twitterUrl%0A%7D%0A%0Aquery%20GetCollabies(%24participantWhere%3A%20CollabieWhereInput!%2C%20%24mentorWhere%3A%20CollabieWhereInput!%20)%20%7B%0A%20%20mentors%3A%20collabies(where%3A%20%24mentorWhere%2C%20orderBy%3A%20firstName_ASC)%20%7B%0A%20%20%20%20...collabieFields%0A%20%20%7D%0A%20%20participants%3A%20collabies(where%3A%20%24participantWhere%2C%20orderBy%3A%20firstName_ASC)%20%7B%0A%20%20%20%20...collabieFields%0A%20%20%7D%0A%7D%0A&variables=%7B%0A%20%20%22mentorWhere%22%3A%20%7B%22roles_contains_some%22%3A%20%5B%22MENTOR%22%5D%7D%2C%0A%20%20%22participantWhere%22%3A%20%7B%22AND%22%3A%5B%7B%22roles_contains_some%22%3A%20%5B%22PARTICIPANT%22%5D%7D%2C%20%7B%22NOT%22%3A%20%5B%7B%22roles_contains_some%22%3A%20%5B%22MENTOR%22%5D%7D%5D%7D%5D%7D%0A%7D
 */

// const query = gql`
//   fragment collabieFields on Collabie {
//     fullName
//     bio {
//       html
//     }
//     pathToPhoto
//     gitHubUrl
//     linkedInUrl
//     twitterUrl
//   }
//   query GetCollabies(
//     $participantWhere: CollabieWhereInput!
//     $mentorWhere: CollabieWhereInput!
//   ) {
//     mentors: collabies(where: $mentorWhere, orderBy: firstName_ASC) {
//       ...collabieFields
//     }
//     participants: collabies(where: $participantWhere, orderBy: firstName_ASC) {
//       ...collabieFields
//     }
//   }
// `;

const query = gql`
  query GetTeams {
    teams(orderBy: startDate_DESC) {
      displayName
      startDate
      endDate
      participants(orderBy: firstName_ASC) {
        firstName
        fullName
        pathToPhoto
        gitHubUrl
        linkedInUrl
        twitterUrl
      }
    }
  }
`;

// const ROLES_CONTAINS_SOME_MENTOR = { roles_contains_some: ["MENTOR"] };

// const queryVars = {
//   mentorWhere: ROLES_CONTAINS_SOME_MENTOR,
//   participantWhere: {
//     AND: [
//       { roles_contains_some: ["PARTICIPANT"] },
//       { NOT: [ROLES_CONTAINS_SOME_MENTOR] },
//     ],
//   },
// };

const queryVars = {};

/**
 * Resolves to an object of the following shape:
 *  {
 *     mentors: [Collabie]
 *     participants: [Collabie]
 * }
 */
module.exports = request(graphQLEndpoint, query, queryVars);
