import { checkIsUseMock } from './calculator';

export const isDev = import.meta.env.DEV;

export const isMock = checkIsUseMock();
