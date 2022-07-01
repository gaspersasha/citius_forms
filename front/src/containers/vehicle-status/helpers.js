export const steps = {
  SEARCH: {
    id: 'search',
    text: 'Search',
  },
  FINANCE: {
    id: 'finance',
    text: 'Finance',
  },
  ORDER: {
    id: 'order',
    text: 'Order',
  },
  VERIFY: {
    id: 'verify',
    text: 'Verify & confirm',
  },
  VEHICLE_PREP: {
    id: 'verify-prep',
    text: 'Vehicle prep',
  },
  DELIVERY: {
    id: 'delivery',
    text: 'Delivery',
  },
};

export const subSteps = {
  // search (finance flow)
  START: 'start',
  // finance (finance flow)
  SOFT: 'soft',
  APPLIED: 'applied',
  PART_EX: 'part-ex',

  // order (finance flow)
  PENDING_NO_PAID: 'pending-no-paid',
  PENDING_PAID: 'pending-paid',
  APPROVED_NO_PAID: 'approved-no-paid',
  APPROVED_PAID: 'approved-paid',
  SECCI_SENT: 'secci-sent', // common sub-step for finance and cash
  // order (cash flow)
  SECURE_VEHICLE: 'secure-vehicle',
  // verify (finance)
  GETTING_REQUIREMENTS: 'getting-requirements',
  LINK_SENT: 'link-sent',
  DOCS_SENT: 'docs-sent',
  CONDITION_REPORT: 'condition-report', // common sub-step for finance and cash
  // delivery (finance flow and cash flow - common)
  TO_BE_BOOKED: 'to-be-booked',
  BOOKED: 'booked',
  CONFIRMED: 'confirmed',
};

export const financeFlowSteps = [
  steps.SEARCH,
  steps.FINANCE,
  steps.ORDER,
  steps.VERIFY,
  steps.DELIVERY,
];
export const cashFlowSteps = [steps.ORDER, steps.VEHICLE_PREP, steps.DELIVERY];

export const getProgress = (subStep, isFinanceFlow) => {
  if (isFinanceFlow) {
    // finance flow
    switch (subStep) {
      // search
      case subSteps.START:
        return 50;
      // finance
      case subSteps.SOFT:
        return 25;
      case subSteps.APPLIED:
        return 50;
      case subSteps.PART_EX:
        return 75;
      // order
      case subSteps.PENDING_NO_PAID:
        return 17;
      case subSteps.PENDING_PAID:
        return 33;
      case subSteps.APPROVED_NO_PAID:
        return 50;
      case subSteps.APPROVED_PAID:
        return 67;
      case subSteps.SECCI_SENT:
        return 83;
      // verify
      case subSteps.GETTING_REQUIREMENTS:
        return 20;
      case subSteps.LINK_SENT:
        return 40;
      case subSteps.DOCS_SENT:
        return 60;
      case subSteps.CONDITION_REPORT:
        return 80;
      // delivery
      case subSteps.TO_BE_BOOKED:
        return 33;
      case subSteps.BOOKED:
        return 66;
      case subSteps.CONFIRMED:
        return 100;
      default:
        return 100;
    }
  }

  // cash flow
  switch (subStep) {
    // order
    case subSteps.SECURE_VEHICLE:
      return 33;
    case subSteps.SECCI_SENT:
      return 66;
    // vehicle prep
    case subSteps.CONDITION_REPORT:
      return 50;
    // delivery
    case subSteps.TO_BE_BOOKED:
      return 33;
    case subSteps.BOOKED:
      return 66;
    case subSteps.CONFIRMED:
      return 100;
    default:
      return 100;
  }
};
