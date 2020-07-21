# Bulla

Bulla is a documentation theme for [Hugo](https://gohugo.io/). It's based on the free, open source CSS framework [Bulma](https://bulma.io/).

## Installation

### Install in an existing project

Navigate to your hugo project and run:

```sh
git submodule add https://github.com/todinov/bulla themes/bulla
```

Set `theme = "bulla"` for toml configuration or `theme: bulla` for yaml configuration.


### Install in a new project

```sh
hugo new site docs; cd docs
git init
git submodule add https://github.com/todinov/bulla themes/bulla
cp -r themes/bulla/example/content .
cp themes/bulla/example/config.yaml .
```
