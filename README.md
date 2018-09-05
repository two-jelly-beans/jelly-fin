# Jelly Fin

[![Join the chat at https://gitter.im/jellyfin/Lobby](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/jellyfin/Lobby)

---

Finances are hard.  It's one of the first _adulting_ things everyone has to wrestle with.  So, let's make it easy and automate it.  Over the course of several years, my wife and I have tracked our finances using a forecasting method and had done it all within a spreadsheet.  The time came where I wanted to take this concept and make it mobile using serverless architecture and clean design.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

For the API:

1. [Install NVM and download Node v6.x.x. LTS](https://github.com/creationix/nvm#installation)
1. [Install and configure ClaudiaJS](https://claudiajs.com/tutorials/installing.html)

### Installing

1. Clone the repo.
2. Run `npm install` to cover any dependencies.
3. Run `npm run claudia:create` to install backend into AWS.

## Running the tests

We don't have tests yet, but we will eventually. :)

## Deployment

We need some CI/CD pipeline, but that's in the works!

## Built With

* [ClaudiaJS](https://claudiajs.com)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/jonathan-irvin/jelly-fin/tags). 

## Authors

* **Jonathan Irvin** - *Initial work* - [Jelly Fin](https://github.com/jonathan-irvin/jelly-fin)

See also the list of [contributors](https://github.com/jonathan-irvin/jelly-fin/contributors) who participated in this project.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Thanks to my wife for the idea, motivation, and support
* Thanks to [Ben Halpern](https://dev.to/ben) for encouraging me to open source this

## Why are we doing this?

The idea is to take what we know: the transactions that are predictable like mortgage and insurance and just keep track of them against the account balance.  Then take transactions that aren't predictable and try to predict them using seasonality analytics.  Does your electric bill go up in the summer?  Let's predict what it would be and try and account for it.
