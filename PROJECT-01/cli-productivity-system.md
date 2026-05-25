# Project 1 — Persistent CLI Productivity System

## 1. Project Title
**Persistent CLI Productivity System** — a multi-command task & note manager that runs in the terminal, persists locally, and is built without web frameworks.

## 2. Core Idea
Build a serious command-line tool that manages tasks, notes, and tags. It must support hierarchical tasks, due dates, tagging, search, undo/redo, and import/export — entirely from the terminal. State is stored locally in a structured file format you design (JSON or SQLite via `better-sqlite3`).

This is deliberately *not* a TODO toy. The complexity comes from designing the **domain model**, **persistence layer**, and **command parser** as clean separate concerns.

## 3. Why This Project Matters
Most beginner projects skip the hardest part of engineering: deciding how to *model a problem*. A CLI strips away UI distractions and forces you to confront:

- Domain modeling (what is a Task? what state can it be in?)
- Separation of concerns (parser ≠ domain ≠ persistence ≠ presentation)
- Testing discipline (no UI to hide behind — your logic must be testable)
- Error handling as a design concern (every command can fail)
- File I/O and atomic writes (data corruption is a real risk)

This project establishes the engineering habits that every later project assumes. Cutting corners here will compound into bad habits in Project 3 and beyond.

## 4. Skills and Concepts Learned
- Node.js fundamentals: `fs`, `path`, `process`, streams
- Designing a domain layer independent of I/O
- Writing testable code (dependency injection, pure functions)
- Argv parsing — first by hand, then via a library
- Atomic file writes (write-to-temp + rename)
- Schema design for local persistence
- Migrations (yes, even in a local app — schemas evolve)
- Unit testing with a real test runner (Vitest or Node's built-in `node:test`)
- Semantic exit codes and structured stderr
- Building a CLI installable via `npm link` / `bin` field
- Logging vs. printing (they are different)

## 5. System Design Concepts Involved
- Layered architecture: command layer → domain layer → repository layer → storage layer
- Repository pattern as the boundary between domain and persistence
- Idempotency in commands (running `complete <id>` twice should be safe)
- Single-writer assumption and what breaks if violated
- Backup and recovery strategy for local state

## 6. DSA Concepts Involved
- Trees (hierarchical task parent/child relationships)
- Hash maps (fast lookup by ID and by tag)
- Sets (tag membership, distinct queries)
- Stack (undo/redo history)
- Topological sort (if you add task dependencies as a stretch)
- Basic search algorithms (substring, fuzzy match, prefix)

## 7. Design Patterns Involved
- **Command pattern** — every user action is a Command object with `execute` / `undo`. This is the cleanest way to implement undo/redo.
- **Repository pattern** — domain code never imports `fs`.
- **Factory pattern** — constructing the right Command from parsed argv.
- **Strategy pattern** — pluggable storage backends (JSON file vs. SQLite).

## 8. Expected Architectural Complexity
**Low–medium.** ~1,500–3,000 lines of code. The complexity is in *discipline*, not size. The trap is overengineering — see pitfalls.

## 9. Suggested Tech Stack
- **Runtime:** Node.js LTS
- **Language:** TypeScript (introducing types early pays compound dividends)
- **Storage:** Start with a JSON file using atomic writes. Migrate to SQLite (`better-sqlite3`) as a stretch goal — this teaches schema migrations.
- **Testing:** `node:test` or Vitest
- **Argv parsing:** Build a minimal parser by hand first (≈100 lines), then optionally swap in `commander` or `yargs` to feel the difference
- **No frameworks beyond that.** Resist the urge.

## 10. Real-World Engineering Challenges
- **Atomic writes:** If your process crashes mid-write, you must not corrupt the user's data. Standard pattern: write to `data.json.tmp` and rename atomically.
- **Schema evolution:** Once users have saved state in v1 format, how does v2 read it? You need versioned schemas and a migration function.
- **Concurrent invocations:** What happens if the user runs two commands at once? Either lock (advisory lockfile) or accept and document last-write-wins.
- **Testability:** If your domain code calls `fs.writeFile` directly, you can't unit-test it without touching disk. This is why the repository layer exists.
- **Useful error messages:** "Error: ENOENT" is hostile. "No task found with id `abc123`. Run `tasks list` to see available IDs." is engineering.

## 11. Common Mistakes and Pitfalls
- **Overengineering.** Don't introduce dependency injection containers, CQRS, or event sourcing here. Use plain functions and constructors.
- **Mixing layers.** A command handler calling `fs.writeFile` directly is the most common smell. Push it through the repository.
- **Hand-rolling ID generation badly.** Use UUIDs or a monotonic counter — not `Date.now()` (collisions, sorting weirdness).
- **No tests for the parser.** The parser is the most error-prone piece. Test it.
- **Treating undo as an afterthought.** Bolting it on later is painful. Design commands as reversible objects from the start.
- **Silent failures.** Every command that fails should set a non-zero exit code and write the error to stderr.

## 12. Suggested Milestones / Phases

### Phase 1 — Scaffolding & core model (3–5 days)
- Define `Task` domain type and its valid state transitions.
- Implement `TaskRepository` interface with an in-memory backend.
- Write tests for repository contract.

### Phase 2 — Persistence layer
- Implement a JSON-file backend that satisfies the repository contract.
- Implement atomic writes.
- Make the file-backed repository pass the same test suite as the in-memory one.

### Phase 3 — Command parser
- Build a minimal argv → Command parser.
- Support: `add`, `list`, `complete`, `delete`, `tag`, `untag`, `find`.
- Each command is a class with `execute()` returning a result.

### Phase 4 — Hierarchies and tags
- Add parent/child relationships and tag indexes.
- Implement tree-printing for `list` (use box-drawing characters).

### Phase 5 — Undo/redo
- Refactor commands to support `undo()`.
- Maintain a bounded history stack persisted to disk.

### Phase 6 — Polish & packaging
- Add a config file (`~/.taskrc.json`) for defaults.
- Add shell completion script.
- Add `npm link` / `bin` entry so it installs as `tasks`.
- Add a help system that's actually helpful.

## 13. Stretch Goals
- Swap the JSON backend for SQLite *without* changing any code outside the repository layer. (If you can't, your boundary is wrong.)
- Implement a schema migration system (v1 → v2 of the data file).
- Add full-text search using a trie or inverted index — implemented by hand, not via a library.
- Add a `tasks watch` mode that re-renders the list on file change (introduces `fs.watch` and reactive patterns).
- Add encrypted storage with a passphrase (introduces real crypto: `argon2` for KDF, `aes-256-gcm` for cipher).
- Add a sync command that pushes to a remote git repo as a backup — your first taste of distributed state.

## 14. What Completing This Project Proves
You can:
- Design a small system with clean layer boundaries.
- Write code that is testable because the architecture allows it, not because you bolted tests on after.
- Treat persistence as a concern that needs design, not just "save the file."
- Ship a polished tool that handles errors gracefully.

It doesn't yet prove you can design *large* systems. That comes later. What it proves is that you have the *habits* that scale.
