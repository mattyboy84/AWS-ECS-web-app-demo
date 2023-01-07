import NextAuth from 'next-auth';
import cognitoProvider from 'next-auth/providers/cognito';

import {
  cognitoClientId,
  cognitoClientSecret,
  cognitoClientScopes,
  cognitoIssuer
} from '../../../src/utils/config'

// let scopes = "aws.cognito.signin.user.admin   email   openid  phone   profile".replaceAll('   ', ' ').replaceAll('  ', ' ').replaceAll('    ', ' ')

export default NextAuth({
  providers: [
    cognitoProvider({
      clientId: cognitoClientId,
      clientSecret: cognitoClientSecret,
      issuer: cognitoIssuer,
      //domain: 'ecs-cluster-image-repo-domain.auth.eu-west-2.amazoncognito.com'
      idToken: true,
      authorization: {
        params: {
          scope: cognitoClientScopes.replaceAll('	', ' ')// replace all tabs (%09) with space (%20)
        }
      },
      httpOptions: {
        timeout: 13500
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account}) {
      console.log(token);

      if (account) {
        token.accessToken = account.access_token
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
  debug: true,
  //,
  //secret: 'abc123'
})