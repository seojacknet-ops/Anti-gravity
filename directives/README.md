# Directives (Layer 1)

This directory contains the **Directives** for the agent.

## What is a Directive?
A Directive is a Standard Operating Procedure (SOP) written in Markdown. It serves as the "Instruction Set" for the agent (Layer 2) to follow.

## Structure
Each directive should define:
- **Goal**: What needs to be achieved.
- **Inputs**: What information is required.
- **Tools/Scripts**: Which `execution/` scripts to use.
- **Outputs**: What the result should be.
- **Edge Cases**: How to handle common errors.

## Usage
The agent reads these files to understand *how* to perform a task, then orchestrates the execution using the scripts in `execution/`.
