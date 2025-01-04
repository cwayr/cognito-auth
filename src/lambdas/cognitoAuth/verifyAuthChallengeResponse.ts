export const handleVerifyAuthChallengeResponse = async (event: any) => {
  const expectedAnswer = event.request.privateChallengeParameters.challengeCode;
  const userAnswer = event.request.challengeAnswer;

  if (userAnswer === expectedAnswer) {
    event.response.answerCorrect = true;
  } else {
    event.response.answerCorrect = false;
  }
};


