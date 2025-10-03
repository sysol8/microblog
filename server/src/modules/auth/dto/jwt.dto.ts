export interface JwtDto {
  id: string;
  username: string;
  iat?: number;
  exp?: number;
}
