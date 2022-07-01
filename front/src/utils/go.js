import config from '~contexts/go/config';

export const getTestFlag = (id) => window.google_optimize.get(config[id]);
