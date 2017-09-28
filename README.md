# Isomorphic React/Redux SPA-application boilerplate

## Technologies stack
- C# / [Asp.NetCore](https://docs.microsoft.com/en-us/aspnet/core/)
- [Serilog](https://github.com/serilog/serilog-aspnetcore)
- [JSON:API](http://jsonapi.org/)
- [xUnit](https://xunit.github.io/)
- [Typescript](https://www.typescriptlang.org/)
- [JavaScriptServices](https://github.com/aspnet/JavaScriptServices)
- [React](https://facebook.github.io/react/) + [Redux](http://redux.js.org/)
- [Redux First Router](https://github.com/faceyspacey/redux-first-router)
- [Redux Dev Tools](https://github.com/zalmoxisus/redux-devtools-extension)
- [Webpack](https://webpack.js.org/)
- [SCSS](http://sass-lang.com/)
- [HMR](https://webpack.js.org/concepts/hot-module-replacement/)
- Server Side Rendering
- [Karma Test Runner](https://karma-runner.github.io/1.0/index.html) + [Mocha](https://mochajs.org/) + [Enzyme](https://github.com/airbnb/enzyme) + [Sinon](http://sinonjs.org/)
- [Docker](https://www.docker.com/)
- [Cake](https://cakebuild.net/)

## Requirements
- [Asp.NetCore 2.0 SDK](https://www.microsoft.com/net/download/core)
- [NodeJS >= 6.x](https://nodejs.org/en/)
- [Docker >= 17.06.2](https://cakebuild.net/)
- [Yarn >= 0.11](https://yarnpkg.com/lang/en/)

## What is it
It's template for modern cross-platform web application, based on Asp.NetCore 2.0 and React/Redux.

## How to use
1. to build image use command `./build.sh --script '"image.cake"'` from build directory
2. to run application `docker run -d -p 80:80 aurokk/app`

## Recommendations
- Follow the recommendations of redux
- Normalize data in your application
- Organize components logically, modullar, for example, address form should be in /Components/AddressForm
- Create directory for reusable components, like /DumbComponents. It will store components like input from address form
- In react each component should be able to render itself without data (with empty data)