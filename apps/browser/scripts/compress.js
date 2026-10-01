// Compress the build directory into a zip file in dist/.
// Cross-platform equivalent of compress.sh (no bash/zip required).
// Usage: node scripts/compress.js <filename.zip>
const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");

const filename = process.argv[2];
if (!filename) {
  console.error("Usage: node scripts/compress.js <filename.zip>");
  process.exit(1);
}

const buildDir = path.join(__dirname, "..", "build");
const distDir = path.join(__dirname, "..", "dist");

function addDir(zip, dir, prefix) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const name = prefix + entry.name;
    if (entry.isDirectory()) {
      addDir(zip, full, name + "/");
    } else {
      zip.file(name, fs.readFileSync(full));
    }
  }
}

async function main() {
  if (!fs.existsSync(buildDir)) {
    return;
  }

  fs.mkdirSync(distDir, { recursive: true });
  const distPath = path.join(distDir, filename);
  fs.rmSync(distPath, { force: true });

  const zip = new JSZip();
  addDir(zip, buildDir, "");
  const content = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    platform: "UNIX",
  });
  fs.writeFileSync(distPath, content);
  console.log(`Zipped ${buildDir} into ${distPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
