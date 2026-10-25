import { FileSearch, ClipboardList, ListChecks, Play, Bug, RefreshCcw, GitBranch, Rocket } from 'lucide-react'

export const workflow = [
  { title: 'Requirements Analysis', icon: FileSearch, text: 'Read the spec. Ask questions. Flag gaps before a line of code ships.' },
  { title: 'Test Planning', icon: ClipboardList, text: 'Set scope, approach, environments and exit criteria.' },
  { title: 'Test Case Design', icon: ListChecks, text: 'Write clear test cases for happy paths, negative paths and edge cases.' },
  { title: 'Test Execution', icon: Play, text: 'Run functional, UI, API and integration tests, both manual and automated.' },
  { title: 'Defect Reporting', icon: Bug, text: 'Log bugs in Jira with steps, evidence, severity and priority.' },
  { title: 'Retesting', icon: RefreshCcw, text: 'Verify every fix against the original report.' },
  { title: 'Regression Testing', icon: GitBranch, text: 'Make sure the fix broke nothing else.' },
  { title: 'Release Validation', icon: Rocket, text: 'Final checks and UAT support. Ship with confidence.' },
]

export const workflowNote =
  'I code too, so I can read logs, check an API response or query the database myself. Then I tell the developer exactly where it breaks, not just that it does.'
