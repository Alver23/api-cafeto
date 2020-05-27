import { CAuthService } from './auth-service';
import { AuthService } from "./auth-service-interface";
import { RedisServiceMock } from "../../../core/redis/redis-service-mock";

import mocks from './mocks.json';

describe('AuthService', () => {
  let authService: AuthService;
  let redisService: any;
  beforeEach(() => {
    redisService =  new RedisServiceMock();
    authService = new CAuthService(redisService, mocks.config);
  });
	describe('createToken method', () => {
    it('should get an token', () => {
      expect(authService.createToken(mocks.user)).toEqual(expect.any(String));
    });
  });

	describe('ramdonToken method', () => {
	  it('should get an string', () => {
	    expect(
	      authService.ramdonToken()
      ).toEqual(expect.any(String));
    })
  });

	describe('generateRefreshToken method', () => {
	  it('should get an refresh token', () => {
	    expect(
	      authService.generateRefreshToken(mocks.user)
      ).toEqual(expect.any(String));
    });
  });

  describe('refreshToken method', () => {
    it('should get an new token', () => {
      redisService.setDataInCache('token', mocks.user);
      return authService
        .refreshToken('token')
        .then(response => {
          expect(response)
            .toEqual(
              expect.objectContaining({
                user: expect.objectContaining({
                  id: expect.any(Number),
                  name: expect.any(String),
                  email: expect.any(String),
                }),
                token: expect.any(String),
                refreshToken: expect.any(String),
              }),
            );
        });
    });

    it('should get an error', () => {
      return authService
        .refreshToken('token')
        .catch(error => {
          expect(error).toBeTruthy();
        })
    });
  });
});
