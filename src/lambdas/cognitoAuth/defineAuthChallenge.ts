export const handleDefineAuthChallenge = async (event: any) => {
  if (event.request.session && event.request.session.length > 0) {
    const previousChallenge = event.request.session.slice(-1)[0];
    if (previousChallenge.challengeResult === true) {
      event.response.issueTokens = true;
      event.response.failAuthentication = false;
    } else {
      event.response.issueTokens = false;
      event.response.failAuthentication = true;
    }
  } else {
    event.response.issueTokens = false;
    event.response.failAuthentication = true;
  }
};


