import { getYearsAtJobLabel, formatOption } from '../helpers';

describe('testing config util functions', () => {
  it('getYearsAtJobLabel helper', () => {
    expect(getYearsAtJobLabel('employed')).toEqual(
      'How many years have you been working at this address?'
    );
    expect(getYearsAtJobLabel('unemployed', 'UNEMPLOYED')).toEqual(
      'How long have you been unemployed?'
    );
    expect(getYearsAtJobLabel('unemployed', 'STUDENT')).toEqual(
      'How long have you been a student?'
    );
    expect(getYearsAtJobLabel('unemployed', 'test')).toEqual(
      'How many years have you spent as a test?'
    );
  });

  it('formatOption helper', () => {
    expect(formatOption('TEST')).toEqual('Test');
    expect(formatOption('TEST_OPTION')).toEqual('Test option');
  });
});
