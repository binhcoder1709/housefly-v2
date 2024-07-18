export class RegisterEvent {
  constructor(
    private readonly user_name: string,
    private readonly email: string,
    private readonly password:string,
  ) {}

  toString() {
    return JSON.stringify({
      user_name: this.user_name,
      email: this.email,
      password:this.password
    });
  }
}
