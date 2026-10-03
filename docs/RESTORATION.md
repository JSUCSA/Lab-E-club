# Firestore restoration and verification

## Scope

The expired test-mode rule was replaced by explicit collection access. Posts and comments are public. User documents are readable only by their owner or an administrator; only administrators may list users. Client profile writes cannot grant roles or chat access. Posting respects the existing `postPermission` setting; chat respects `chatEnabled` and verified membership. This repair does not change saved roles, settings, or existing content.

The frontend now uses atomic comment/counter writes and atomic invitation claims. Comment deletion freezes and traverses reply trees, allowing interrupted cleanup to resume. Post deletion requires an explicitly marked post with a zero comment count. User-generated Markdown is sanitized by vendored DOMPurify 3.4.16, and interpolated text, URLs and handler arguments are encoded appropriately.

## Deployment order

1. Review and publish the frontend, vendor asset/license and these rules together in source control. The existing GitHub Pages workflow deploys pushes to `main`.
2. Keep the read-only recovery rules active until the Pages deployment of that exact commit succeeds. Verify the deployed HTML and DOMPurify asset match the reviewed files.
3. Publish `firestore.rules` to the intended Firebase project only after confirming the project and approved administrator/moderator roles.
4. Reload existing browser tabs before using writes: the old frontend is incompatible with the new atomic comment protocol. Verify browsing, login and intended write flows. Keep chat off unless explicitly enabled by an administrator.

Before deployment, compare each post's stored `commentCount` with its actual comments. A preexisting inaccurate count should be corrected through an explicitly authorized trusted workflow, never by loosening client rules. Do not copy an old blanket-access example or extend a test-mode deadline.

## Tests

Prerequisites: Node.js 24, Java 21, and npm. Exact direct development dependency versions are pinned in `tests/package.json`. No production credentials or live account data are used.

```sh
npm --prefix tests install --ignore-scripts
npm --prefix tests run test:frontend
npm --prefix tests run test:rules
```

The rules test project is deliberately `demo-jsuitlab`, with a local Firestore emulator on `127.0.0.1:8088`. Do not replace it with a live project. If the Firebase CLI cannot write its configuration, set `HOME`, `XDG_CACHE_HOME` and `XDG_CONFIG_HOME` to writable local directories.

Verified locally before publication:
- 112 Firestore emulator assertions: compilation; public/private reads; role anti-escalation; preserved posting policy; ownership/category moderation; likes; atomic comments/counters; recursive cleanup; invitation claim/revocation; disabled/private chat; unknown-collection denial.
- 10 isolated frontend behavior cases.
- 9 DOMPurify/rendering injection cases, including admin and category rendering.
- 4 asynchronous navigation cases: pending submission followed by Close or navigation; stale detail responses.
- Inline JavaScript syntax check.

Tests do not replace post-deployment checks. They use synthetic data and local mocks/emulators; they do not publish posts, comments or account changes to the live service.

## Notes

- Invitation-only posting was never implemented in the original frontend; it fails closed for non-administrators rather than silently allowing all users. This does not affect the current moderator-only setting.
- Old `users/{uid}` reads used for a legacy admin check are intentionally denied; the application catches that optional read and uses `itlab_users` for actual roles.
- DOMPurify is vendored from its official npm distribution. Its upstream license is retained at `assets/vendor/DOMPurify-LICENSE`.
