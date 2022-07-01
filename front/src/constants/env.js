const { NEXT_PUBLIC_ENV: ENV } = process.env;

export const IS_CI_ENV = ENV === 'ci';
export const IS_PROD_ENV = ENV === 'prod';
export const IS_LOCAL_ENV = ENV === 'local';
