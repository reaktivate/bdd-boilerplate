# What is it
A super-opinionated boilerplate and demo project for BDD approach.
# Project structure
- a
  - b
- 
# Styling guidelines
[guidelines.md](docs/guidelines.md)
# MVVC Pattern
The architecture is based on "[clean code](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)" by Uncle Bob. 
In fact, it's a MVVC pattern, where both Controllers and Models (repositories) are merely MobX classes.

# Toolbelt / Tech Stack
* React
* [TypeScript](https://www.typescriptlang.org/) - just because it's standard
* [NextJS](https://nextjs.org/) - 
  * gives incredible way to forget about webpack/babel configuration and start coding
  * easy and straightforward routing
  * very quick hot-reload
* [MobX](https://mobx.js.org/) 
  * Less boilerplate code than Redux / RTK
  * Simpler implementation of 'observer' pattern
* [Jest](https://jestjs.io/) tests
  * they are simple, yay!
* SASS
  * We choose not to use styled components. Opinionated hard decision.

And other (replaceable) bits and tools:
* Axios for REST API calls
* Reactstrap / Bootstrap
* Lodash
* Lerna for monorepo