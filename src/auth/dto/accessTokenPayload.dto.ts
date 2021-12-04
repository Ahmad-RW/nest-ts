export class AccessTokenPayload {
  //add more info into jwt payload if necessary
  constructor(public email: string, public sub: number) {}
}
