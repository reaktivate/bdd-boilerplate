# What is it
A super-opinionated boilerplate and demo project for BDD approach. The project has three goals:
* Attempt to explain "why" and "what" is the front-end architecture for BDD. 
* Provide boilerplate for other projects
* Provide samples of common scenarios and solutions

# Project structure
- packages/eslint-rules - some custom rules for EsLint to enforce usage of patterns
- packages/shared - stub folder to store all the core models and utilities. In case the project spans to different interfaces (web, mobile etc).
- packages/next - NextJS application 
  - src/elements - all the dumb UI components. Rules of architecture don't apply here.
  - src/pages - navigation + SSR starting points
  - src/components - all the logic components, mostly following same structure as pages 
  - src/stores - core repositories (models) for the application
  - src/lib - rest of the toolbelt, especially...
  - src/lib/fsm - rewrite of FSM, [Javascript State Machine](https://github.com/jakesgordon/javascript-state-machine) to fit our needs

# Styling guidelines
See [guidelines.md](docs/guidelines.md)

# MVVC Pattern
The architecture is based on "[clean code](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)" by Uncle Bob. 
In fact, it's a MVVC pattern, where both Controllers and Models (repositories) are merely MobX classes.

# Toolbelt / Tech Stack
* React (though same core pattern is framework-agnostic)
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