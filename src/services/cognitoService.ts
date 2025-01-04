import { 
  CognitoIdentityProviderClient, 
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  InitiateAuthCommandOutput,
  RespondToAuthChallengeCommand,
  RespondToAuthChallengeCommandInput,
  RespondToAuthChallengeCommandOutput
} from '@aws-sdk/client-cognito-identity-provider';

export class CognitoService {
  private client: CognitoIdentityProviderClient;
  private clientId = process.env.COGNITO_CLIENT_ID || '';

  constructor() {
    this.client = new CognitoIdentityProviderClient({ region: 'us-east-1' });

    if (!this.clientId) {
      throw new Error('COGNITO_CLIENT_ID is not defined');
    }
  }

  public async authenticate(
    userId: string, 
  ): Promise<InitiateAuthCommandOutput> {
    const params: InitiateAuthCommandInput = {
      ClientId: this.clientId,
      AuthFlow: 'CUSTOM_AUTH',
      AuthParameters: {
        USERNAME: userId,
      }
    }

    const command = new InitiateAuthCommand(params);
    const response = await this.client.send(command);
    return response
  }

  public async respondToAuthChallenge(
    userId: string, 
    challengeResponse: string, 
    session: string
  ): Promise<RespondToAuthChallengeCommandOutput> 
  {
    const params: RespondToAuthChallengeCommandInput = {
      ClientId: this.clientId,
      ChallengeName: 'CUSTOM_CHALLENGE',
      ChallengeResponses: {
        USERNAME: userId,
        ANSWER: challengeResponse
      },
      Session: session
    }

    const command = new RespondToAuthChallengeCommand(params);
    const response = await this.client.send(command);
    return response;
  }
}
