# Jelly Fin

<!-- Badges -->
[![Discord](https://badgen.net/badge/chat/on%20Discord/cyan)](https://discord.gg/xveZ3FT)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=jelly-fin/jelly-fin)](https://dependabot.com)
[![PRs Welcome](https://badgen.net/badge/PRs/welcome/green)](http://makeapullrequest.com)
[![contributions welcome](https://badgen.net/badge/contributions/welcome/green)](https://github.com/jelly-fin/jelly-fin/issues)
[![CodeFactor](https://www.codefactor.io/repository/github/jelly-fin/jelly-fin/badge)](https://www.codefactor.io/repository/github/jelly-fin/jelly-fin)
<!-- End Badges -->

---

Finances are hard.  It's one of the first _adulting_ things everyone has to wrestle with.  So, let's make it easy and automate it.  Over the course of several years, my wife and I have tracked our finances using a forecasting method and had done it all within a spreadsheet.  The time came where I wanted to take this concept and make it mobile using serverless architecture and clean design.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Node v8.x.x or use [NVM](https://github.com/creationix/nvm#installation)
* [A Firebase project](https://firebase.google.com/console)

### Installing and Running

1. Clone the repo.
2. Run `npm install` to cover any dependencies.

### Common Issues:

If installation isn't working for you, check the following:
1. Your version of node (v 8.x.x) & npm(v 6.x.x): run `node -v` & `npm -v`.

## Running the tests

After installing all prerequisites and dependencies, just run `npm test`

## Dependencies

Dependency PRs are automagically opened using [Dependabot](https://dependabot.com/https://dependabot.com/).  We want to make sure the app stays green by ensuring the build doesn't break when dependencies are bumped and each dependency is well tested to ensure stability.

## Built With

* React
* Firebase

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/jelly-fin/jelly-fin/tags).

## Authors

* **Jonathan Irvin** - *Initial work* - [Jelly Fin](https://github.com/jelly-fin/jelly-fin)

See also the list of all [![contributors](https://badgen.net/github/contributors/jelly-fin/jelly-fin)](https://github.com/jonathan-irvin/jelly-fin/contributors) who participated in this project.

## License [![license](https://badgen.net/github/license/jelly-fin/jelly-fin)](LICENSE)

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Thanks to my wife for the idea, motivation, and support
* Thanks to [Ben Halpern](https://dev.to/ben) for encouraging me to open source this

## Why are we doing this?

The idea is to take what we know: the transactions that are predictable like mortgage and insurance and just keep track of them against the account balance.  Then take transactions that aren't predictable and try to predict them using seasonality analytics.  Does your electric bill go up in the summer?  Let's predict what it would be and try and account for it.
