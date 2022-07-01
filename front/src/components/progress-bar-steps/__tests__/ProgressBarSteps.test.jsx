import React from 'react';
import { ProgressBarSteps } from '../ProgressBarSteps';

describe('<ProgressBarSteps />', () => {
  let wrapper;

  const getWrapper = (props) => shallow(<ProgressBarSteps {...props} />);

  const config = {
    steps: ['Step1', 'Step2', 'Step3', 'Step4', 'Step5'],
    currentStep: 'Step3',
    progress: 88,
  };

  it('renders without errors', () => {
    wrapper = getWrapper(config);
    expect(wrapper).toMatchSnapshot();
  });

  it('render steps', () => {
    wrapper = getWrapper(config);
    expect(wrapper.find('[data-id="progress-bar-step"]').length).toEqual(
      config.steps.length
    );
  });
});
