import React from 'react';
import {
  ReservationDetails,
  ConfirmationMessagePrimary,
  ConfirmationMessageSecondary,
  NextBestAction,
  MotoreasyBanner,
  Card,
} from '../Reservation';

describe('Reservation helpers', () => {
  it('ReservationDetails', () => {
    const wrapper = shallow(
      <ReservationDetails
        depositPaid="100"
        dateOfPayment="12.07.2021"
        timeOfPayment="14:05"
        paymentReferenceNumber="ref_num"
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('ConfirmationMessagePrimary', () => {
    const wrapper = shallow(
      <ConfirmationMessagePrimary para1="woot" para2="doh" title="Title" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('ConfirmationMessageSecondary', () => {
    const wrapper = shallow(<ConfirmationMessageSecondary title="TITLE" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('NextBestAction', () => {
    const wrapper = shallow(
      <NextBestAction
        title="title"
        buttonText="button text"
        buttonUrl="/button_url"
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('MotoreasyBanner', () => {
    const wrapper = shallow(
      <MotoreasyBanner
        withButton
        buttonText="button_Text"
        redirectUrl="/redirect"
      >
        test
      </MotoreasyBanner>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('Card', () => {
    const wrapper = shallow(<Card img="/img_url" text="img text" />);

    expect(wrapper).toMatchSnapshot();
  });
});
