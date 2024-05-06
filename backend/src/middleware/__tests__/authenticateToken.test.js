import jwt from 'jsonwebtoken';
import { authenticateToken } from '../../middleware/authenticateToken.js';

describe('authenticateToken middleware', () => {
  it('should call next() if valid token provided', () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer validToken123'
      }
    };
    const mockResponse = {};
    const mockNext = jest.fn();
    jwt.verify = jest.fn().mockImplementation((token, secret, callback) => {
      callback(null, { userId: '123' });
    });

    authenticateToken(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockRequest.user).toEqual({ userId: '123' });
  });

  it('should return 401 if no token provided', () => {
    const mockRequest = {
      headers: {}
    };
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn()
    };
    const mockNext = jest.fn();

    authenticateToken(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid', () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer invalidToken456'
      }
    };
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn()
    };
    const mockNext = jest.fn();

    jwt.verify = jest.fn().mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'));
    });

    authenticateToken(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockNext).not.toHaveBeenCalled();
  });
});
