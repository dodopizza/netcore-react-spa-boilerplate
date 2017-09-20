# Isomorphic React/Redux SPA-application boilerplate

## Technologies stack
- C# / [.NetCore 2.0](https://docs.microsoft.com/en-us/aspnet/core/)
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

## Requirements
- [.NetCore 2.0 SDK](https://www.microsoft.com/net/download/core)
- [NodeJS >= 6.x](https://nodejs.org/en/)

## How to use
Go to the project directory (the directory contains IsomorphicSpa.csproj), then run following commands:
1. to restore nuget packages: `dotnet restore`
2. to build project: `dotnet publish`
3. to run project: `dotnet run`

## Testing
You can run tests with ReSharper or with cli:
1. to run c# tests: `dotnet test`
2. to run js tests: `npm test` or `npm run test:watch`

## Recommendations
- Follow the recommendations of redux
- Normalize data in your application
- Organize components logically, modullar, for example, address form should be in /Components/AddressForm
- Create directory for reusable components, like /DumbComponents. It will store components like input from address form
- In react each component should be able to render itself without data (with empty data)

## Coming soon 
- Cake build scripts
- Docker images for build and execution
- More examples
- Development and production builds