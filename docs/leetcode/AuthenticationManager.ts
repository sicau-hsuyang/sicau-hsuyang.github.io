class AuthenticationManager {
  private expire = 0;

  constructor(timeToLive: number) {
    this.expire = timeToLive;
  }

  generate(tokenId: string, currentTime: number): void {}

  renew(tokenId: string, currentTime: number): void {}

  countUnexpiredTokens(currentTime: number): number {}
}

/**
 * Your AuthenticationManager object will be instantiated and called as such:
 * var obj = new AuthenticationManager(timeToLive)
 * obj.generate(tokenId,currentTime)
 * obj.renew(tokenId,currentTime)
 * var param_3 = obj.countUnexpiredTokens(currentTime)
 */
