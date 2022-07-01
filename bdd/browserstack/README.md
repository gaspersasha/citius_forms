# List of rules, to safely run this BDD stack (cucumber, selenium, browserstack for Safari support)
- run tests via Docker: docker build .
- run tests locally:
  - npm i
  - npm run test:s
- locally (docker or not) run with VPN `turned off`, cause of huge timeouts in network
- atm [2021.04.07] BS integration stoped, due to account issues - waiting for budget.