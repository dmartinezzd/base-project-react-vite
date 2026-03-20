//Selectors
export const getHelloWorldData = (state) => state.helloWorldReducer.helloWorld.data;

export const getHelloWorldDataError = (state) => state.helloWorldReducer.helloWorld.error;
