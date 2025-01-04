import { 
  Stack, 
  CfnOutput,
  StackProps,
  aws_lambda as lambda,
  aws_cognito as cognito,
  aws_lambda_nodejs as lambda_nodejs,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class CognitoAuthStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const cognitoAuthLambda = new lambda_nodejs.NodejsFunction(this, 'CognitoAuthLambda', {
      entry: 'src/lambdas/cognitoAuth/index.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_20_X,
    })

    const userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: 'MyUserPool',
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: false,
        },
      },
      lambdaTriggers: {
        createAuthChallenge: cognitoAuthLambda,
        defineAuthChallenge: cognitoAuthLambda,
        verifyAuthChallengeResponse: cognitoAuthLambda
      }
    });

    // const googleProvider = new cognito.UserPoolIdentityProviderGoogle(this, 'Google', {
    //   clientId: 'YOUR_GOOGLE_CLIENT_ID',
    //   clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    //   userPool,
    //   scopes: ['profile', 'email'],
    //   attributeMapping: {
    //     email: cognito.ProviderAttribute.GOOGLE_EMAIL,
    //     givenName: cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
    //     familyName: cognito.ProviderAttribute.GOOGLE_FAMILY_NAME,
    //   },
    // });

    const userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
      // supportedIdentityProviders: [cognito.UserPoolClientIdentityProvider.GOOGLE],
      userPool,
      generateSecret: false,
      authFlows: {
        custom: true,
      },
    });

    // userPoolClient.node.addDependency(googleProvider);

    new CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
    });

    new CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
    });
  }
}
