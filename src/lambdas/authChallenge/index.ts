// import { CognitoUserPoolTriggerEvent, Context } from 'aws-lambda';
// 
// export const handler = async (event: CognitoUserPoolTriggerEvent, context: Context) => {
//   switch (event.triggerSource) {
//     case 'CreateAuthChallenge':
//       await handleCreateAuthChallenge(event);
//       break;
//     case 'DefineAuthChallenge':
//       await handleDefineAuthChallenge(event);
//       break;
//     case 'VerifyAuthChallengeResponse':
//       await handleVerifyAuthChallengeResponse(event);
//       break;
//     default:
//       throw new Error(`Unsupported trigger source: ${event.triggerSource}`);
//   }
//   return event;
// };
// 
// const handleCreateAuthChallenge = async (event: CognitoUserPoolTriggerEvent) => {
//   // Generate a 6-digit code
//   const challengeCode = Math.floor(100000 + Math.random() * 900000).toString();
//   // Send the code to the user's email (implementation of sending email is not shown here)
//   await sendEmail(event.request.userAttributes.email, challengeCode);
// 
//   event.response.publicChallengeParameters = { email: event.request.userAttributes.email };
//   event.response.privateChallengeParameters = { challengeCode };
//   event.response.challengeMetadata = `CODE-${challengeCode}`;
// };
// 
// const handleDefineAuthChallenge = async (event: CognitoUserPoolTriggerEvent) => {
//   if (event.request.session && event.request.session.length > 0) {
//     const previousChallenge = event.request.session.slice(-1)[0];
//     if (previousChallenge.challengeResult === true) {
//       event.response.issueTokens = true;
//       event.response.failAuthentication = false;
//     } else {
//       event.response.issueTokens = false;
//       event.response.failAuthentication = true;
//     }
//   } else {
//     event.response.issueTokens = false;
//     event.response.failAuthentication = true;
//   }
// };
// 
// const handleVerifyAuthChallengeResponse = async (event: CognitoUserPoolTriggerEvent) => {
//   const expectedAnswer = event.request.privateChallengeParameters.challengeCode;
//   if (event.request.challengeAnswer === expectedAnswer) {
//     event.response.answerCorrect = true;
//   } else {
//     event.response.answerCorrect = false;
//   }
// };
// 
// const sendEmail = async (email: string, challengeCode: string) => {
//   // Implement your email sending logic here
//   console.log(`Sending email to ${email} with challenge code: ${challengeCode}`);
// };
