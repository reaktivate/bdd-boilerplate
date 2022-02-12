# Styling guidelines

# CodeStyle
* Component folder structure
component-name
ComponentName.tsx - react view, only render part, maximum dumb     ComponentName.model.ts - mobx store for data fetching and saving ComponentName.ctrl.ts - mobx store controller for view, so we can put all logic here ComponentName.ctrl.spec.ts - mobx store controller tests coverage ComponentName.type.ts ComponentName.util.ts ComponentName.mock.ts ComponentName.scss

* Every component that have logic, has own local controller store. Global store only contains store which could be shared across whole application e.g. userStore, uiStore etc
* In View only mobx store usage, all logic in store, view only render
* Test store/logic mostly, view optionally
* Views are functional, stores are classes
* Use direct store import where possible (if singleton controller, otherwise passing store / context with IoC)
* Init store where you need it: in store file for 1 store per all components, or in the component to have separate store for each component
* For mobx async actions use async/wait + try/catch + runInAction !!! https://mobx.js.org/actions.html
* for request loading state handling use loadingState: LoadingStateStore = new LoadingStateStore(); this.loadingState.setLoading(); this.loadingState.setSuccess(); this.loadingState.setError(); store.loadingState.isLoading
store.loadingState.isSuccess store.loadingState.isError
* Remove console.log, use console.debug in case if you need to leave it for debug purpose
* While refactoring be careful and check all code/components usage

## Logic-separate rules :
Basically, there are three types of components:
* Dummy (”elements”):
* Visual elements
  * Form blocks etc
  * Layouts
  * Patterns / HOCs
* Non-dummy
  * Screens
  * Functional blocks
  * Partials
Partials are only used to split parts of non-dummy, always using “same controller as parent”

### Rules:

**Flat Presentation**.

* For dummy components, any amount of props are OK
* For non-dummy components, props amount should be 0 or max 1 (passing store or index, for instance, in a list)
* Try to keep controller properties plain (isUserLoggedIn, albumName etc)
* For testing purposes, don’t forget to make all actions async - so tests know the action is finished. not only looking at the observables.
* In dummy components, logic inside is OK. For non-dummy, all the actions should be one-liners, and can be only 1 usestate (attach controller) and 1 useeffect (initialize controller).
