Troubleshooting: Mocha after Hook Timeout During Directory Cleanup

🧠 Problem

The after hook in walkAndFindAll.test.js consistently times out (even with a 20s limit), despite successful test execution and correct before hook setup. Environment/tooling conflicts had to be addressed before isolating the cause.

⸻

⚙️ Resolved Environment Issues

Yarn PnP Context Conflict
	•	Issue: yarn test failed with PnP errors referencing the parent /Dev/ folder.
	•	Fixes:
	•	Added .yarnrc.yml with enableGlobalCache: false
	•	Temporarily used npm run test to bypass context errors.

Lockfile Mismatch
	•	Issue: Internal Error: ktr-util@workspace:.: not in lockfile
	•	Fix: Ran yarn install to refresh dependencies and fix the state.

✅ Result: yarn test (which runs yarn build:clean && mocha ...) now works.

⸻

🔍 Diagnostic Checks

1. File Descriptor Still Open
	•	Cause: Unclosed fs handles.
	•	Check:

exec('lsof +D test/test_resources/walkAndFind', (_, out) => console.log(out || 'No open handles'));

2. Static import on Fixture Files
	•	Cause: Node keeps them in memory.
	•	Fix: Use fs.readFile() instead.

3. Event Loop Delay
	•	Fix: Add artificial delay before deletion:

await new Promise(r => setTimeout(r, 500));

4. OS-Level Locking
	•	Cause: Spotlight/iCloud indexing.
	•	Fix: Move test dirs to /tmp/ktr-util-test-fixtures.

5. Mocha after() Hook Glitch
	•	Fixes:
	•	Use callback:

after(done => rimraf(dir, done));


	•	Or use sync:

after(() => rimrafSync(dir));



⸻

✅ Recommended Steps
	1.	Ensure yarn install has been run
	2.	Use lsof +D to check for open handles
	3.	Replace static fixture imports with fs.readFile()
	4.	Add await delay(500) before cleanup
	5.	Use /tmp/... for test fixtures
	6.	Try sync or callback-based after hook

⸻

🎯 Goal

Make tests self-contained, deterministic, and immune to external interference.
