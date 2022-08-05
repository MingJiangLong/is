const versionInfo = require('./package.json');
const fs = require("fs");
const { stdout, stderr } = require('process');
const path = require("path");
const spawn = require("child_process").spawn;
const spawnSync = require("child_process").spawnSync;


// 删除dist文件夹
// 重新编译ts文件
// 修改版本
// 发布

/**
 * 移除编译文件夹
 * @param {*} distPath 
 * @returns 
 */
function removeFolder(distPath = path.join(__dirname, './dist')) {
    if (!fs.existsSync(distPath)) return;
    let files = fs.readdirSync(distPath);
    files.forEach((filePath, index) => {
        let currentPath = path.join(distPath, filePath);
        if (fs.statSync(currentPath).isDirectory()) {
            removeFolder(currentPath)
        } else {
            fs.unlinkSync(currentPath)
        }
    })
    fs.rmdirSync(distPath)
}

/**
 * 编译ts文件
 * @returns 
 */
function compileTs() {

    return new Promise((resolve, reject) => {
        let process = spawn('cmd', ['/c', 'tsc'], {
            cwd: __dirname
        });
        process.on("error", error => {
            console.log("编译失败!")
            reject(error)
        })

        process.on("exit", code => {
            if (!code) {
                console.log("编译成功!")
                resolve()
            } else {
                console.log("编译失败!")
                reject();
            }
        })
    })

}

/**
 * 构建新的版本信息
 * @returns 
 */
function getNewVersionInfo() {
    let newVersion = { ...versionInfo };
    let [mainVersion, subVersion, tinyVersion] = newVersion.version.split(".")
    newVersion.version = `${mainVersion}.${subVersion}.${+tinyVersion + 1}`
    return newVersion;
}

/**
 * 将版本信息写入package.json
 */
function writeVersion2File(info) {
    fs.writeFileSync("package.json", JSON.stringify(info));
}

function npmPublish() {
    return new Promise((resolve, reject) => {

        let process = spawn(
            "cmd",
            ["/c", "npm publish"],
            {
                cwd: __dirname
            },
        )

        //输出正常情况下的控制台信息
        process.stdout.on("data", function (data) {
            console.log(data);
        });

        //输出报错信息
        process.stderr.on("data", function (data) {
            console.log("stderr: " + data);
        });

        //当程序执行完毕后的回调，那个code一般是0
        process.on("exit", function (code) {
            if (code) {
                reject()
            } else {
                resolve()
            }
        })


    }).catch(e => {
        console.log(e)
    })
}

async function publish() {
    removeFolder()
    await compileTs()
    let newVersion = getNewVersionInfo();
    writeVersion2File(newVersion);

    // try {
    //     await npmPublish()
    // } catch (error) {
    //     writeVersion2File(versionInfo)
    //     throw error
    // }
}

publish();