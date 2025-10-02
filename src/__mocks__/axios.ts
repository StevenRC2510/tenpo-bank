export default {
  isAxiosError: (error: unknown) => error instanceof Error,
  create: () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }),
};
