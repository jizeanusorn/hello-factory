# As-Built V1a: Clock1 Rendering

## Root Cause

The CSV upload flow already parsed and stored all three values: `clock1`, `clock2`, and `clock3`. `clock1` was silently ignored in the rendering layer because `src/app/App.tsx` only rendered `WorldClock` components for `clock2` and `clock3`.

## Files Changed

- `src/app/App.tsx`
- `playwright.config.ts`
- `tests/clock-config.spec.ts`
- `tests/fixtures/clock-config-3cities.csv`
- `.github/workflows/playwright.yml`
- `docs/as-built/as-built-v1a.md`

## What Was Built

- Added the missing `WorldClock` render for `clockConfig.clock1` using the existing `WorldClock` component and existing CSV upload state.
- Added a Playwright contract test that uploads a CSV with `clock1=CN`, `clock2=DE`, and `clock3=SG`, then verifies Shanghai, Berlin, and Singapore are all visible.
- Added GitHub Actions Playwright workflow so CI runs the contract test with Chromium.

## What Was Not Touched

- Singapore duplicate city/country text was not changed.
- Flag rendering was not changed.
- No dropdown was added.
- CSV parsing behavior and `ExcelUpload` were not changed.
- No redesign or component refactor was done.
