type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
};

type ResetPasswordToken = {
  id: string;
  tokenHash: string;
  userId: string;
  expiresAt: Date;
};
