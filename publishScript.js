const versionInfo = require('./package.json');
const fs = require("fs");
const { stdout, stderr } = require('process');
const spawn = require("child_process").spawn;
let [mainVersion, subVersion, tinyVersion] = versionInfo.version.split(".")
versionInfo.version = `${mainVersion}.${subVersion}.${+tinyVersion + 1}`
fs.writeFileSync("package.json", JSON.stringify(versionInfo));

let process = spawn(
    "npm",
    ["publish"],
    {
        cwd: __dirname
    },
)

process.stdout.on('data', (data) => {
    if (!data) {
        console.log(`is发布失败版本${+tinyVersion + 1}失败!`)
    } else {
        console.log(`is发布成功,当前版本为${mainVersion}.${subVersion}.${+tinyVersion + 1} `)
    }
});

process.on('close', (data) => {
    if (data) {
        console.log(data)
    } else {
        console.log(data)
    }
});
