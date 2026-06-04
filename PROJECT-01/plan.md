# DECOMPOSE

## Goal: turn the project from "huge thing" into "one small thing I can start now."


**Phase 1: Scaffolding & core model**

**Milestone:**

1. Need to produce:
    - A Task type, an in-memory repository implementing a clear interface, and a vitest test that adds and retrieves a task.

2. Already know: 
    - Basic TS syntax, npm.

3. Need to look up (specifically):
    - how to define an interface in TS
    - how to write a vitest test
    - how node:test differs from vitest.


**Phase 2: Persistence Layer**

**Milestone:**

1. Need to produce:
    - a JSON-file backend that satisfies the repository contract already defined above.

2. Already know: 
    - How to define an interface in TS, and how to write a vitest test.

3. Need to look up (specifically):
    - how to implement a JSON-File backend.
    - how to implement atomic writes.
    - how to write a vitest test.

## Achievements: 
    - Defined a shared Domain Interface.
    - Implemented two different Storage Backends (In-Memory and File).
    - Handled JSON Serialization and Date Hydration.
    - Implemented Atomic File Safety.
    - Implemented test with idempotency (cleans up created file after each run) and utilizing a temporary OS directory.


**Phase 3: The Command Parser**

**Milestone:**

1. Need to produce:
    - a CLI where I can type node src/index.ts add "Buy milk" and it actually saves to the file.

2. Already know: 
    - How to define an interface in TS, how to handle JSON serialization and date hydration, implement atomicity in file system, and how to write a vitest test with idempotency and to run on temporary os.

3. Need to look up (specifically):
    - How to build a minimal argv → Command parser.
    - How can it support: add, list, complete, delete, tag, untag, find.
    - How to make each command to be a class with execute() returning a result.

## Achievements: 
    - Defined a shared Domain Interface.
    - Implemented two different Storage Backends (In-Memory and File).
    - Handled JSON Serialization and Date Hydration.
    - Implemented Atomic File Safety.
    - Implemented test with idempotency (cleans up created file after each run) and utilizing a temporary OS directory.