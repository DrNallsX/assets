# CodexASI Kernel Constitution

## Ratification

This constitution is hereby ratified as the authoritative contract for the CodexASI kernel. All kernel behavior, authority boundaries, and public interfaces are governed by this document.

## Purpose

The CodexASI kernel exists to provide a stable, authoritative execution core. It is kernel-first and UI-secondary, with execution and workflow registries recognized as valid.

## Authority Model

1. **Kernel-first authority**: The kernel is the source of truth for execution, state, and governance.
2. **UI non-authority**: UI tabs and shells are presentation layers without authority.
3. **Registry integrity**: Execution and workflow registries are canonical and must remain consistent.
4. **Forward-only progression**: Development proceeds forward from the ratified state without regression or authority loops.

## Test Semantics

1. Tests are non-authoritative until the kernel constitution is ratified.
2. Missing symbols referenced by tests are deferred, not treated as errors.

## Canonical Public Symbols

The following identifiers are declared as canonical public symbols of the CodexASI kernel and are stable unless explicitly amended by a future constitutional revision:

- `CodexASI`
- `Kernel`
- `KernelAuthority`
- `KernelConstitution`
- `ExecutionRegistry`
- `WorkflowRegistry`
- `PublicSymbolRegistry`
- `AuthorityFreeze`
- `ForwardOnly`

## Authority Freeze

Kernel authority is hereby frozen. No feature expansion or authority changes are permitted until an explicit constitutional amendment is ratified. All subsequent work must preserve the kernel-first authority model and the canonical public symbols listed above.
