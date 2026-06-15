
First read the "Principles" folder and its md file contents, so that you can take them as single source of truth and start coding in best way.

# AI CODING AGENT RULES

This file overrides all other instructions.

## NEVER

* Guess requirements
* Invent features
* Invent database tables
* Invent APIs
* Invent user roles
* Invent business rules
* Add libraries without approval
* Change architecture without approval

## ALWAYS

* Follow PRD
* Follow Business Rules
* Follow Design System
* Follow Existing Folder Structure

## TYPESCRIPT

* Strict mode enabled
* No any
* No ts-ignore
* Prefer inference
* Use Zod validation

## REACT

* Small components
* Reusable components
* No business logic in UI

## API

* Input validation
* Output validation
* Consistent error responses

## DATABASE

* Foreign keys
* Indexes
* RLS policies
* No duplicate data

## IMPLEMENTATION PROCESS

Before coding:

1. Analyze requirement
2. Explain plan
3. List affected files
4. List database changes
5. List API changes

Then implement.

## COMPLETION CHECKLIST

Before marking complete:

* Build passes
* Types pass
* Lint passes
* No dead code
* Loading states exist
* Error states exist
* Responsive design works
* Accessibility checked

If any item fails, implementation is incomplete.
