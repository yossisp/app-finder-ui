const loggerMiddleware = store => next => (action) => {
  const { type } = action;
  console.log(`%credux: dispatching ${type}`, 'color: green');
  return next(action);
};

export {
  loggerMiddleware
};
