# Execution (Layer 3)

This directory contains the **Execution Scripts** for the agent.

## What is an Execution Script?
An Execution Script is a deterministic Python script that performs a specific, atomic task.

## Principles
- **Deterministic**: The same input should always produce the same output.
- **Reliable**: Handle errors gracefully and return structured output.
- **Testable**: Scripts should be easy to test in isolation.
- **No Logic**: Business logic belongs in the Directive (Layer 1) or Orchestration (Layer 2). These scripts just *do the work*.

## Usage
These scripts are called by the agent based on the instructions in the `directives/` folder.
