# Problem
With time, all the requirements change. And people in the team change

### Management perspective

* Decline of productivity with time
* Acceptance criteria
* "How do i know anything is broken" -> Automated testing

### Developer perspective

* A new "spaghetti code" style 
* Burying the logic 
* Complexity for refactoring
 

# Solution 
The borderline between UX logic and Business logic is so complicated, that we want ALL the logic to be separated from presentation. So all the interface logic becomes the SUT (system under test) target.

1. **Separation of logic from presentation**.
80% of programmers time is reading, not writing code. So, splitting the code in (roughly) 2 different types of code saves 50% on reading & comprehending the code.
2. **BDD**. Automated tests that correspond with use-cases and scenarios.
3. No. Hidden. Logic.

### React doing it wrong?
* React is a great tool, but it's not a framwework - it's a **rendering library** 
* JSX is a great thing, but it allows to write too much code inside the markup
* Props is nice mechanism, but overusing it becomes a mess
* Mix of programmer needs and UI blocks into component tree
### Back to programmer's peace of mind

[Testing logic](https://www.logicroom.co/blog/end-to-end-testing-encourages-bad-ui-architecture)