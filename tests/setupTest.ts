import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import fetch from 'node-fetch';
import { testEnv } from './setup/testEnv';
import React from 'react';

// Make React available globally for JSX in tests
global.React = React;

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;
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