export const handleCreateAuthChallenge = async (event: any) => {
  // Generate a 6-digit code
  const challengeCode = Math.floor(100000 + Math.random() * 900000).toString();
  // Send the code to the user's email (implementation of sending email is not shown here)
  await sendEmail(event.request.userAttributes.email, challengeCode);

  event.response.publicChallengeParameters = { email: event.request.userAttributes.email };
  event.response.privateChallengeParameters = { challengeCode };
  event.response.challengeMetadata = `CODE-${challengeCode}`;
};

const sendEmail = async (email: string, challengeCode: string) => {
  // Implement your email sending logic here
  console.log(`Sending email to ${email} with challenge code: ${challengeCode}`);
};


