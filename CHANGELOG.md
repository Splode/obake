
<a name="v1.0.1"></a>
## [v1.0.1](https://github.com/Splode/obake/compare/v1.0.0...v1.0.1)

> 2021-09-24

### Bug Fixes

* false positive Zavvi promo selector

### Chore

* add changelog, git-chglog config
* add LICENSE


<a name="v1.0.0"></a>
## [v1.0.0](https://github.com/Splode/obake/compare/v0.0.15...v1.0.0)

> 2021-09-19


<a name="v0.0.15"></a>
## [v0.0.15](https://github.com/Splode/obake/compare/v0.0.14...v0.0.15)

> 2021-09-16

### Features

* add Zavvi merchant


<a name="v0.0.14"></a>
## [v0.0.14](https://github.com/Splode/obake/compare/v0.0.13...v0.0.14)

> 2021-09-16

### Bug Fixes

* trim whitespace from price string

### Docs

* update README


<a name="v0.0.13"></a>
## [v0.0.13](https://github.com/Splode/obake/compare/v0.0.12...v0.0.13)

> 2021-09-16

### Bug Fixes

* update walmart selector

### Tests

* update amazon, costco test URLs


<a name="v0.0.12"></a>
## [v0.0.12](https://github.com/Splode/obake/compare/v0.0.11...v0.0.12)

> 2021-09-13

### Chore

* build pre-publish


<a name="v0.0.11"></a>
## [v0.0.11](https://github.com/Splode/obake/compare/v0.0.10...v0.0.11)

> 2021-09-13

### Bug Fixes

* re-arrange dev deps


<a name="v0.0.10"></a>
## [v0.0.10](https://github.com/Splode/obake/compare/v0.0.9...v0.0.10)

> 2021-09-13

### Bug Fixes

* additional ignores in npmignore


<a name="v0.0.9"></a>
## [v0.0.9](https://github.com/Splode/obake/compare/v0.0.8...v0.0.9)

> 2021-09-13

### Bug Fixes

* allow dist in npm, remove install scripts


<a name="v0.0.8"></a>
## [v0.0.8](https://github.com/Splode/obake/compare/v0.0.7...v0.0.8)

> 2021-09-13

### Bug Fixes

* use npx in postinstall script


<a name="v0.0.7"></a>
## [v0.0.7](https://github.com/Splode/obake/compare/v0.0.6...v0.0.7)

> 2021-09-13

### Bug Fixes

* use npx to build on prepare


<a name="v0.0.6"></a>
## [v0.0.6](https://github.com/Splode/obake/compare/v0.0.5...v0.0.6)

> 2021-09-13

### Bug Fixes

* install during prep script


<a name="v0.0.5"></a>
## [v0.0.5](https://github.com/Splode/obake/compare/v0.0.4...v0.0.5)

> 2021-09-13

### Bug Fixes

* just add everything to devDeps


<a name="v0.0.4"></a>
## [v0.0.4](https://github.com/Splode/obake/compare/v0.0.3...v0.0.4)

> 2021-09-13

### Bug Fixes

* add postinstall script


<a name="v0.0.3"></a>
## [v0.0.3](https://github.com/Splode/obake/compare/v0.0.2...v0.0.3)

> 2021-09-13

### Bug Fixes

* remove pre-install script


<a name="v0.0.2"></a>
## v0.0.2

> 2021-09-13

### Bug Fixes

* TypeScript as dev dependency
* add bin file ext
* REI price selector string
* error handler, browser creation for B&H
* use puppeteer by default, puppeteer-extra for certain merchants
* run amazon with browser window

### Chore

* update various deps
* various dep updates
* add eslint rule for ts-comments
* update package-lock
* update package-lock
* update yargs dep
* add linting, build scripts
* install eslint, prettier config
* convert project to typescript
* add prettier dep, script

### Docs

* minor README tweaks
* enhance README
* clean up example config
* build-out README
* add documenation to various utility functions
* add example config
* add header img to README

### Features

* add npm lifecycle scripts, enhance help text
* add obake bin
* add JensonUSA vendor
* display browser window offscreen if not headless
* check for stock in Walmart
* add teardown method
* add optional interval mode
* add request err handler to merchant
* SMTP email notifications
* more consistent request err handling
* add B&H merchant, uses custom checker with puppeteer-extra
* use puppeteer-extra stealth plugin
* multicolored banner text
* add banner in verbose logging
* verbose logging in notifier
* add verbose logging
* set log max file size
* interact with Notifier from Store
* log to user directory file
* add out of stock condition for best buy
* add Costco
* display merchant names in output
* add best buy, walmart
* allow merchants to run with window, run multiple browser instances
* add desktop notifications
* use a standard request err handler
* throw errors from low-level functions instead of logging
* use syslog logging levels
* add newegg support
* notification class, expand config for notifications
* log to file, rename project
* replace console logging with logger
* add logger
* parse cli args, read config from args
* add REI, refactoring
* add Amazon merchant, refactor
* add telegram messaging
* merchant classes
* use config to run requests
* read toml config

### Refactoring

* move app initialization to Store
* shift verbose option to file config, general clean-up
* config get func
* reconfigure merchant checking
* merchant creation and price checking
* notification err handling and logging
* use network idle event for newegg
* use catch methods in place of try-catch
* telegram
* guard against null config
* IGoods
* config files
* merchant

### Style

* organize imports
* format files
* format various files

### Tests

* fix price parsing in feature tests
* decrease jest timeout
* add various merchant feature tests
* add feature tests with jest

