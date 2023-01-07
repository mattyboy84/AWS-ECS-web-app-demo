const {
  NEXT_PUBLIC_repoName: repoName,
  NEXT_PUBLIC_repoURI: repoURI,
  NEXT_PUBLIC_cognitoClientId: cognitoClientId,
  NEXT_PUBLIC_cognitoClientSecret: cognitoClientSecret,
  NEXT_PUBLIC_cognitoIssuer: cognitoIssuer,
  NEXT_PUBLIC_cognitoClientScopes: cognitoClientScopes
} = process.env;

module.exports = {
  repoName,
  repoURI,
  cognitoIssuer,
  cognitoClientId,
  cognitoClientSecret,
  cognitoClientScopes,
}