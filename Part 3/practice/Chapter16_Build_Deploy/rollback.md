# Rollback Procedure
1) Identify target artifact (e.g., web-dist-<SHA>) in storage.
2) Update deployment to point to previous artifact or tag.
3) Invalidate CDN cache for changed paths.
4) Verify health checks and error rate drop.
5) Create incident note: cause, fix-forward plan.
