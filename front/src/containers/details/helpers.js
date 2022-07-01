import { VALIDATION_TYPES } from '~constants';
import { getFormFiledProperties, composeFormState } from '~utils';

export const composeDetailsState = (state) => {
  const additional = {
    emailConfirm: getFormFiledProperties(state.email, VALIDATION_TYPES.EMAIL),
    password: getFormFiledProperties('', VALIDATION_TYPES.PASSWORD),
    passwordConfirm: getFormFiledProperties('', VALIDATION_TYPES.PASSWORD),
  };

  return composeFormState(state, additional);
};
