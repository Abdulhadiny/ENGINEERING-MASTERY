# GEMINI.md - Persistent CLI Productivity System

## Project Overview
This project is a **Persistent CLI Productivity System**, a multi-command task and note manager built with TypeScript and Node.js. It follows a layered architecture to ensure clean separation between the domain logic, repository interface, and persistence implementations.

### Main Technologies
- **Runtime:** Node.js (LTS)
- **Language:** TypeScript
- **Testing:** Vitest
- **Architecture:** Layered (Command -> Domain -> Repository -> Storage)

## Directory Structure
- `PROJECT-01/`: Main project workspace.
  - `tasks-cli/`: The core CLI application.
    - `src/domain.ts`: Defines `Task` entity and `TaskRepository` interface.
    - `src/in-memory-repo.ts`: In-memory implementation of the repository.
    - `test/`: Vitest test suites.
  - `persistence-layer/`: Storage-related configurations and data files (e.g., `db.json`).
  - `cli-productivity-system.md`: Comprehensive project requirements and roadmap.
  - `plan.md`: Current execution plan and milestones.

## Building and Running

### Development
Currently, the project is in the scaffolding phase. Most logic is verified through tests.

### Testing
To run tests, navigate to the `tasks-cli` directory and use:
```bash
npm test
```

### Running the CLI
- **TODO:** The command parser (Phase 3) is not yet implemented. Once implemented, the CLI will be executable via `tsx src/index.ts` or similar.

## Development Conventions

### Educational Interaction Mode (Socratic Mentorship)
- **No Direct Solutions:** Do not provide complete, copy-pasteable code solutions for the user's questions or tasks.
- **Clarification & Detail:** Focus on providing detailed explanations, conceptual examples, and architectural rationale.
- **Documentation Nudges:** Point the user toward official documentation (e.g., Node.js, TypeScript, Vitest), technical articles, and reference materials.
- **Goal:** Empower the user to learn how to research, synthesize information, and solve problems independently.

### Coding Style
- **Layer Separation:** Never mix persistence logic (e.g., `fs` calls) with domain logic. All data access must go through the `TaskRepository` interface.
- **Async First:** Repository methods are asynchronous to allow for future database integrations (SQLite).
- **Atomic Writes:** When implementing file-based persistence, use the write-to-temp-then-rename pattern to prevent data corruption.

### Testing Practices
- **Test-Driven Development:** Write tests for the repository contract before implementing new backends.
- **In-Memory First:** Use `InMemoryTaskRepository` for fast unit tests of higher-level logic.

### Error Handling
- Commands should set non-zero exit codes on failure.
- Errors should be written to `stderr` with user-friendly messages rather than raw stack traces.

## Roadmap & Progress
- [x] Phase 1: Scaffolding & Core Model (Domain types, In-memory repo, Tests).
- [ ] Phase 2: Persistence Layer (JSON-file backend with atomic writes).
- [ ] Phase 3: Command Parser (`add`, `list`, `complete`, etc.).
- [ ] Phase 4: Hierarchies and Tags.
- [ ] Phase 5: Undo/Redo support.
- [ ] Phase 6: Polish & Packaging.
