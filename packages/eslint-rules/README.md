# eslint-plugin-reaktivate-rules

Custom rules 

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-reaktivate-rules`:

```sh
npm install eslint-plugin-reaktivate-rules --save-dev
```

## Usage

Add `reaktivate-rules` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "reaktivate-rules"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "reaktivate-rules/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


