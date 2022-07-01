import React from 'react';
import { Typography } from '~components';
import { ThanksYouPiggy } from '~assets/svg';
import s from './styles/complete.module.sass';

const Complete = () => (
  <div className={s.container}>
    <Typography className={s.title} type="h2">
      Thank you, the dealer will be in touch!
    </Typography>
    <div className={s.intro_wrapper_title}>
      <Typography className={s.intro_title} type="h2">
        Finance with Buyacar
      </Typography>
      <ThanksYouPiggy />
    </div>
    <div className={s.main_content}>
      <Typography className={s.main_content_text}>
        Having your finance in place before you go to view your vehicle will
        give you the peace of mind that you are getting a great rate with
        Buyacar.
      </Typography>
    </div>
  </div>
);

export default Complete;
