# TaskExperts

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.7

## Overview

The Task Management System is designed to help teams manage tasks efficiently within projects. Each team has multiple projects, and each project consists of tasks assigned to team members. Team members can update the progress of their tasks, and other team members can comment or reply on tasks to provide feedback or suggestions. The system ensures smooth collaboration and task tracking through well-defined states and transitions.



## Task Transitions

[*] --> New:

A new task is created and enters the "New" state.

New --> Assigned:

The task is assigned to a team member by the creator or team lead.

New --> Won’t Fix:

The task is declined or marked as irrelevant by the team lead or project manager.

Assigned --> Assigned:

The task is reassigned to another team member (by the team lead or project manager).

Assigned --> In Progress:

The assignee starts working on the task and updates its status to "In Progress."

Assigned --> Won’t Fix:

The assignee declines the task, and the team lead is notified.

In Progress --> Resolved:

The assignee completes the task and marks it as "Resolved."

The team lead is notified for review.

Any State --> Assigned:

The team lead or project manager reassigns the task if it is stuck or inactive.

In Progress --> Won’t Fix:

The assignee determines that further work on the task is not worthwhile.

Resolved --> Reopened:

The team lead reopens the task if issues arise or the resolution is incomplete.

Resolved --> Closed:

The team lead marks the task as "Closed" if no further work is needed.

Won't Fix --> Reopened:

The team lead reopens a previously declined task if it requires attention.

Won't Fix --> Closed:

The team lead marks the task as "Closed" if no further action is required.
