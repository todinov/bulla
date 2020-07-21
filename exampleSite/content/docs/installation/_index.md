---
title: Installation
menu:
  main:
    weight: -200
---

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
cp -r themes/bulla/exampleSite/content .
cp themes/bulla/exampleSite/config.yaml .
```
