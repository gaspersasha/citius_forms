# POC todo list
## project wide
- [x] [Separate repository](https://github.com/dennisinteractive/buyacar_fee)
- [x] [Docker container](https://creativesolutions.atlassian.net/browse/DEVOPS-950)
- [ ] Jenkins support for deployment (Stage / CI) [Vitaliy]
- [ ] [Page could be loaded via different url, eg - /new-part-exchange in main product](https://creativesolutions.atlassian.net/browse/DEVOPS-961) [Vitaliy]
- [x] Load testing (currently max load is 1k requests per minute for search page, we should be able to handle `x2` of that) (need [apach bench](https://httpd.apache.org/docs/2.4/programs/ab.html) add bash script to test "repo" - `ab -n 5000 -c 500 http://localhost:80/`)
- [x] ~~Separate repository for integration tests (selenium, gherkin, multibrowser, multidevices, parralel runs)~~ [One repo seems easier and more convenient]


## `/part-exchange` as example page
- [ ] GA support (token hardcoded for now, but prefer to fetch it from CMS?) [Sasha]
- [ ] External scripts support (GTG, ami, instana, try every script that we currently have)
- [ ] SEO support on the same level or above (meta tags, [schema?](https://schema.org/))
- [ ] CMS module to take needed info
- [x] Mock CMS [A] (/_cms)
- [x] Mock Java API [A] (/_api)
- [x] Lower amount of assets is loaded (js, css) (out of the box at nextjs)
- [ ] PWA support (use our custom manifest) [Kolya]
- [ ] Interacts with Java BE (mock server for development for now?)
- [ ] Pageload speed and Performance improvements (get current values, set new one)
- [ ] hooks testing (`react-testing-library`) [Sasha, Kolya]
- [ ] adaptive -> responsive -> ~~px~~ (`em|%`) [connect]
- [ ] make static page example [Kolya]


## not for `/part-exchange` page:
- [ ] Route with AMP example (image, link, something else from product page or alike)

<!-- - [ ] Menu module -->
