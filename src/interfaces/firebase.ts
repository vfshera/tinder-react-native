export interface IFireBaseUser {
  _redirectEventId: any;
  apiKey: string;
  appName: string;
  createdAt: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  phoneNumber: any;
  photoURL: string;
  providerData: IproviderData[];
  stsTokenManager: IstsTokenManager;
  tenantId: any;
  uid: string;
}

interface IproviderData {
  displayName: string;
  email: string;
  phoneNumber: any;
  photoURL: string;
  providerId: string;
  uid: string;
}

interface IstsTokenManager {
  accessToken: string;
  expirationTime: number;
  refreshToken: string;
}
