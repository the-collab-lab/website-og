const getMentor = async () => {
    try {
      const { mentors } = await request(graphQLEndpoint, MentorsQuery);
      const result = teams.map((team) => ({
        ...mentors
      }));
  
      return result;
    } catch (e) {
      throw new Error('There was a problem getting Mentors', e);
    }
  };
  
  exports.getMentor = getMentor;
  