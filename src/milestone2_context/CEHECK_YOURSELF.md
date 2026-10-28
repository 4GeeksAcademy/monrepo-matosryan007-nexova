````md
# What You Need to Do

Implement the following functionality in TypeScript.

> **Important:** All entity names, fields, types, and rules must match exactly what is specified in `BRIEFING.md`. A generic implementation that ignores the provided context will not be accepted.

## Backend and Logic

- [ ] Define TypeScript interfaces for all main company entities specified in `BRIEFING.md`.
- [ ] Implement filtering functions that allow elements to be searched using one or more criteria, such as:
  - [ ] Category
  - [ ] Price range
  - [ ] Status
- [ ] Implement sorting functions that sort arrays using different criteria:
  - [ ] Ascending order
  - [ ] Descending order
  - [ ] Multiple fields
- [ ] Implement linear search for finding elements in unsorted arrays.
- [ ] Implement binary search for finding elements in previously sorted arrays.
- [ ] Create aggregation functions that generate reports, including:
  - [ ] Counting elements by category
  - [ ] Calculating totals
  - [ ] Calculating averages
  - [ ] Finding maximum values
  - [ ] Finding minimum values
- [ ] Implement business validations that verify whether objects comply with the rules in `BRIEFING.md` before they are processed.
- [ ] Add explicit types to all function parameters.
- [ ] Add explicit return types to all functions.
- [ ] Follow the single responsibility principle so that each function performs one clearly defined task.
- [ ] Include a clear command for validating or executing the TypeScript code during development.

> **Important:** Field names, entity types, and validation rules must match exactly what is specified in `BRIEFING.md`. A generic implementation that ignores the context will not be accepted.

## Frontend and Manual Testing — Optional

- [ ] Create a simple HTML page styled with Tailwind CSS that allows the functions to be tested manually.
- [ ] Include buttons or controls for executing different operations:
  - [ ] Filtering
  - [ ] Searching
  - [ ] Sorting
  - [ ] Generating reports
- [ ] Display the results of each operation clearly in the interface.
- [ ] If an `index.html` page is created for manual testing, ensure it can be served locally or in Codespaces using a simple command such as:

```bash
npx http-server -p 3000 -a 0.0.0.0
```

## Code Quality

- [ ] Use descriptive names for variables, functions, and interfaces.
- [ ] Use `camelCase` for variables and functions.
- [ ] Use `PascalCase` for interfaces.
- [ ] Ensure every function is pure.
- [ ] Ensure functions work only with the values received through their parameters.
- [ ] Do not modify global variables.
- [ ] Write comments only when necessary to explain complex logic.
- [ ] Do not write comments that merely describe obvious code.
- [ ] Handle empty arrays correctly.
- [ ] Handle elements that cannot be found.
- [ ] Handle `null` values correctly.
- [ ] Use `const` by default.
- [ ] Use `let` only when a value must change.
- [ ] Maintain consistent indentation and formatting throughout the code.
````



# What We Will Evaluate

## Technical Correctness

- [ ] TypeScript interfaces correctly model all entities specified in `BRIEFING.md`.
- [ ] Every required entity field is included.
- [ ] Every entity field uses the correct type.
- [ ] Filtering functions correctly return elements that meet the specified criteria.
- [ ] Sorting works correctly in ascending order.
- [ ] Sorting works correctly in descending order.
- [ ] Linear search finds elements in unsorted arrays without errors.
- [ ] Linear search handles elements that cannot be found.
- [ ] Binary search works correctly on sorted arrays.
- [ ] Binary search returns the correct index when an element is found.
- [ ] Binary search returns `-1` when an element is not found.
- [ ] Aggregation functions correctly calculate totals.
- [ ] Aggregation functions correctly calculate averages.
- [ ] Aggregation functions correctly calculate counts.
- [ ] Aggregation functions correctly calculate maximum values.
- [ ] Aggregation functions correctly calculate minimum values.
- [ ] Validations reject data that does not comply with the business rules in `BRIEFING.md`.
- [ ] There are no TypeScript compilation errors in any file.
- [ ] A command for validating or executing the TypeScript code locally is documented, such as:

```bash
npx tsc --noEmit
```

- [ ] Alternatively, an equivalent project command is provided, such as:

```bash
npm run typecheck
```

## Structure and Organization

- [ ] Code is organized into separate files based on responsibility.
- [ ] Entity interfaces and related types are stored in dedicated type files.
- [ ] Reusable operations are stored in utility files.
- [ ] Business-validation functions are stored in validation files.
- [ ] Every function has one clearly identifiable responsibility.
- [ ] Variable names are descriptive.
- [ ] Function names are descriptive.
- [ ] Interface names are descriptive.
- [ ] Names follow established TypeScript conventions.

## Context Adaptation

- [ ] All entity names match `BRIEFING.md` exactly.
- [ ] All field names match `BRIEFING.md` exactly.
- [ ] All field types match `BRIEFING.md` exactly.
- [ ] Implemented validations correspond to the business rules defined in `BRIEFING.md`.
- [ ] Generated reports address the company-specific needs described in `BRIEFING.md`.

## Code Quality

- [ ] All functions are pure.
- [ ] Functions do not depend on external mutable variables.
- [ ] Functions do not modify global state.
- [ ] Empty arrays are handled correctly.
- [ ] Elements that cannot be found are handled correctly.
- [ ] `null` values are handled correctly.
- [ ] Function parameters have explicit types.
- [ ] Functions have explicit return types.
- [ ] `const` is used by default.
- [ ] `let` is used only when reassignment is necessary.
- [ ] The use of `any` is avoided.
- [ ] The code follows TypeScript best practices consistently.