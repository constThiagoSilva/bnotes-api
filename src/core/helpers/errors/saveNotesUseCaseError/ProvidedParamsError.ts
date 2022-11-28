export class ProvidedParamsError extends Error {
    constructor(incorrectlyParameterProvided: string) {
      super(`parameter: ${incorrectlyParameterProvided}, not provided`);
    }
  }