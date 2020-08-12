interface JWTConfigAuth {
  secret: string;
  expiresIn: string;
}

export default {
  jwt: {
    secret: process.env.API_SECRET,
    expiresIn: '1d',
  } as JWTConfigAuth,
}