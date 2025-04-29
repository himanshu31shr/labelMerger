import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import fetch from 'node-fetch';
import { testEnv } from './setup/testEnv';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.fetch = fetch as any;
global.Request = fetch.Request as any;
global.Response = fetch.Response as any;
global.Headers = fetch.Headers as any;

// Mock Vite's import.meta.env
(global as any).import = {
  meta: {
    env: testEnv
  }
};

// Mock Firebase modules
jest.mock('firebase/app');
jest.mock('firebase/auth');
jest.mock('firebase/firestore');