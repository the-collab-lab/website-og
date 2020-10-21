const urls = {
  teams: `https://api-us-east-1.graphcms.com/v2/ckfwosu634r7l01xpco7z3hvq/master?operationName=GetTeams&query=query%20GetTeams%20%7B%0A%20%20teams(orderBy%3A%20startDate_ASC)%20%7B%0A%20%20%20%20displayName%0A%20%20%20%20startDate%0A%20%20%20%20endDate%0A%20%20%20%20participants(orderBy%3A%20firstName_ASC)%20%7B%0A%20%20%20%20%20%20firstName%0A%20%20%20%20%20%20fullName%0A%20%20%20%20%20%20pathToPhoto%0A%20%20%20%20%20%20gitHubUrl%0A%20%20%20%20%20%20linkedInUrl%0A%20%20%20%20%20%20twitterUrl%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A`,
  mentors: `https://api-us-east-1.graphcms.com/v2/ckfwosu634r7l01xpco7z3hvq/master?operationName=GetMentors&query=query%20GetMentors%20%7B%0A%20%20collabies(%0A%20%20%20%20where%3A%20%7B%20roles_some%3A%20%7Bname%3A%20%22Mentor%22%7D%20%7D%0A%20%20%20%20orderBy%3A%20firstName_ASC%0A%20%20)%20%7B%0A%20%20%20%20firstName%0A%20%20%20%20fullName%0A%20%20%20%20bio%20%7B%0A%20%20%20%20%20%20html%0A%20%20%20%20%7D%0A%20%20%20%20pathToPhoto%0A%20%20%20%20gitHubUrl%0A%20%20%20%20linkedInUrl%0A%20%20%20%20twitterUrl%0A%20%20%7D%0A%7D`,
  advisors: `https://api-us-east-1.graphcms.com/v2/ckfwosu634r7l01xpco7z3hvq/master?operationName=GetAdvisors&query=query%20GetAdvisors%20%7B%0A%20%20collabies(%0A%20%20%20%20where%3A%20%7B%20roles_some%3A%20%7Bname%3A%20%22Advisor%22%7D%20%7D%0A%20%20%20%20orderBy%3A%20firstName_ASC%0A%20%20)%20%7B%0A%20%20%20%20firstName%0A%20%20%20%20bio%20%7B%0A%20%20%20%20%20%20html%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D`,
  founders: `https://api-us-east-1.graphcms.com/v2/ckfwosu634r7l01xpco7z3hvq/master?operationName=GetFounders&query=query%20GetFounders%20%7B%0A%20%20collabies(%0A%20%20%20%20where%3A%20%7B%20roles_some%3A%20%7Bname%3A%20%22Founder%22%7D%20%7D%0A%20%20%20%20orderBy%3A%20firstName_ASC%0A%20%20)%20%7B%0A%20%20%20%20firstName%0A%20%20%20%20fullName%0A%20%20%20%20bio%20%7B%0A%20%20%20%20%20%20html%0A%20%20%20%20%7D%0A%20%20%20%20pathToPhoto%0A%20%20%20%20gitHubUrl%0A%20%20%20%20linkedInUrl%0A%20%20%20%20twitterUrl%0A%20%20%7D%0A%7D`,
};

async function fetchData(url) {
  return fetch(url);
}

module.exports = async function () {
  let teams = await fetchData(urls.teams);
  let mentors = await fetchData(urls.mentors);
  let advisors = await fetchData(urls.advisors);
  let founders = await fetchData(urls.founders);

  return {
    teams,
    mentors,
    advisors,
    founders,
  };
};
