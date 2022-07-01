import { GTM as gtm } from '~services';

export const GTM = (path = '', page, title) => {
  if (!path) return;

  const forTitle = path.split('-').join(' ');

  gtm.fire({
    event: 'VirtualPageView',
    virtualPagePath: `/virtual/${page}/${path}`,
    virtualPageTitle: `${title} - ${forTitle}`,
  });
};

export const GTM_GA = (event, eventCategory) => {
  gtm.fire({
    event: 'GAEvent',
    eventCategory,
    eventAction: event,
    eventNonInteraction: false,
  });
};

export const getFinanceSubmitEvent = (isLeadgen) =>
  isLeadgen
    ? '/virtual/LGFinanceComplete'
    : '/virtual/finance/form-complete?completedAction=financeapplied_newlySaved';

export const GTM_EVENT = (event) => {
  gtm.fire({ event });
};
