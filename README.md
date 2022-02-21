# Improvements

- Dockerized the whole project so we can start it by `docker-compose up`.

- Removed unnecessary packages and also moved some packages from dependencies to dev dependencies.

- Added eslint and prettier to have consistency across the codebase.

- Added `swagger.json` and `swagger-ui` for documentation.

- Added and configured `jest` and also added some tests for testing endpoints.

- Removed all console.logs and added winston logger instead.

- It's a good practice to have a `index.ts` file to shorten the imports.

- Changed `Favorite` and `Simulator` models to have reference to `Profile` instead of a simple string field.

-  `Favorite` should store the favorite1, favorite2, favorite3 in an array name `favorites` as they are just 3 strings with same type.

- Added export default in models for easier imports.

- Added interfaces for models.

- `seed.ts` was trying to create a `Simulator` with fields `start_date`, `check_date` that didn't exist in the `Simulator` model, so I removed them.

- We should avoid using `var` so I refactored the codebase to use `const` and `let`.

- We should follow the same naming convention across the codebase so I chose the `cameCase` and applied it to codebase.

- Added the `success` field to response to specify whether the operation is successful or not. If we have an error we add it to the `message` field.

- Added `databases` directory to hold the all configuration of databases.

- Created `initDatabase` function to create a connection to database anywhere we want. 
- `checkEnv` function's if statements updated to compare the value with `undefined` 				as they may have the value of 0 or false

- Added `http-status-codes` package instead of hardcoding status codes.

## Routes

- Added `/v1` to route to support backward compatibility and also not to force our consumers to use the new version.

- Added pagination to `GET` routes to improve performance.

- We may have some transform layer to omit some fields of our models but in this app it's not necessary.

- It's a good practice to divide the logic to `routes`, `controllers` and `services` that the calling flow be `routes` => `controllers` => `services`  => `repositories` and data is returned in this order `repositories` => `services` => `controllers` => `routes`, but in this app the logic is so little we can skip service layers.

- Added a validation layer using `Joi validator` so we won't get invalid data from clients, used `express-validation` to validate requests

- Changed the `/favorite` to `/favorites`, `/profile` to `/profiles` and `simulator` to `simulators` as it's the best practice for REST API to use plural nouns.

- In the `createProfile` route instead of having to 2 db calls we could just use `findOneAndUpdate` with `upsert:true` .

- Route POST `/simulator/:profile_id` route doesn't need the param as it can be in body, changed the route to POST `/simulators`