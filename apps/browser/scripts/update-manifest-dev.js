// Update the manifest key in the build directory.
// Cross-platform equivalent of update-manifest-dev.sh (no bash/jq required).
const fs = require("fs");
const path = require("path");

const buildDir = path.join(__dirname, "..", "build");
const manifestPath = path.join(buildDir, "manifest.json");

// Generated arbitrary public key from Chrome Dev Console to pin side-loaded extension IDs during development
const DEV_PUBLIC_KEY =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuIvjtsAVWZM0i5jFhSZcrmwgaf3KWcxM5F16LNDNeivC1EqJ+H5xNZ5R9UN5ueHA2xyyYAOlxY07OcY6CKTGJRJyefbUhszb66sdx26SV5gVkCois99fKBlsbSbd6und/BJYmoFUWvFCNNVH+OxLMqMQWjMMhM2ItLqTYi7dxRE5qd+7LwQpnGG2vTkm/O7nu8U3CtkfcIAGLsiTd7/iuytcMDnC0qFM5tJyY/5I+9QOhpUJ7Ybj3C18BDWDORhqxutWv+MSw//SgUn2/lPQrnrKq7FIVQL7FxxEPqkv4QwFvaixps1cBbMdJ1Ygit1z5JldoSyNxzCa5vVcJLecMQIDAQAB";

if (fs.existsSync(buildDir)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.key = DEV_PUBLIC_KEY;
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Updated manifest key in ${manifestPath}`);
}
