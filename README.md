# GeoGenius

Travel the Globe, visit the countries, One Guess at a Time!


<image src="./screenshots/gameplay.png"/>


# Home assignment questions


> 1. How did you decide on the technical and architectural choices used as part of your solution?

- The Next.JS framework provides all basic structure that is needed for this application.
- Leaflet was chosen over Mapbox for its open-source nature and simplicity, making it more appropriate for the project's scope.
- The use of the [Trevor Blades Countries GraphQL endpoint](https://github.com/trevorblades/countries) adds unnecessary complexity. It lacks geolocation data so not very useful in the map context. The countries data  rarely changed  o it can be used as a static resource.
This requirement appears aimed at demonstrating server communication skills.

> 2. Are there any improvements you could make to the final piece?
- The endgame winning and loosing screen
- add e2e tests with playwright
- separate a game logic from the React Compomnent code and UI logic
> 3. What would you do differently if you had more time?
- separate a game logic from the React Compomnent code and UI logic

### Build

To build all apps and packages, run the following command:

```
cd test-countries-map
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd test-countries-map
pnpm dev
```



## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
