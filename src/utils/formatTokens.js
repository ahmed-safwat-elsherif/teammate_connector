import parseToken from './parseToken';

const formatTokens = tokens => {
  const data = parseToken(tokens.idToken);
  const { email, firstname, lastname, username, exp, iat } = data;
  const user = {
    firstname,
    lastname,
    username,
    email,
  };
  return { user, exp, iat, ...tokens, isLoggedIn: true };
};

export default formatTokens;
