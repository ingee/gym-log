const execa = require("execa");
const fs = require("fs");

(async () => {
  try {
    const timeStr = new Date().toISOString()
    const patternStr = "s/REL_TIME/" + timeStr + "/g"
    console.log("Release time :", timeStr)
    await execa("sed", ["-i", patternStr, "src/views/About.vue"]);
    await execa("git", ["checkout", "--orphan", "gh-pages"]);
    console.log("Building...");
    await execa("npm", ["run", "build"]);
    const folderName = fs.existsSync("dist") ? "dist" : "build";
    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);
    console.log("Pushing to gh-pages...");
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
    await execa("rm", ["-r", folderName]);
    await execa("git", ["checkout", "-f", "dev"]);
    await execa("git", ["branch", "-D", "gh-pages"]);
    console.log("Successfully deployed");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();
