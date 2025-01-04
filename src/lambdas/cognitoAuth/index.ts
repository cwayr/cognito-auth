import { handleDefineAuthChallenge } from './defineAuthChallenge';
import { handleCreateAuthChallenge } from './createAuthChallenge';
import { handleVerifyAuthChallengeResponse } from './verifyAuthChallengeResponse';

export const handler = async (event: any, context: unknown) => {
  switch (event.triggerSource) {
    case 'DefineAuthChallenge':
      await handleDefineAuthChallenge(event);
      break;
    case 'CreateAuthChallenge':
      await handleCreateAuthChallenge(event);
      break;
    case 'VerifyAuthChallengeResponse':
      await handleVerifyAuthChallengeResponse(event);
      break;
  }
}
