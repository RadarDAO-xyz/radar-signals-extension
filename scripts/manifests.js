const copy = require('recursive-copy');
const fs = require('fs');
const path = require('path');

const buildPath = path.join(__dirname, '../build');
const v2Path = path.join(__dirname, '../v2');
const v3Path = path.join(__dirname, '../v3');

const manifests = path.join(__dirname, '../manifests');

copy(buildPath, v2Path, function (error, results) {
    if (error) {
        console.error('Copy failed: ' + error);
    } else {
        console.info('Copied ' + results.length + ' files');
        fs.copyFileSync(path.join(manifests, 'v2.json'), path.join(v2Path, 'manifest.json'));
        fs.renameSync(buildPath, v3Path);
        fs.copyFileSync(path.join(manifests, 'v3.json'), path.join(v3Path, 'manifest.json'));
        fs.mkdirSync(buildPath); // Recreate a build path to move the builds into
        fs.renameSync(v2Path, path.join(buildPath, 'v2'));
        fs.renameSync(v3Path, path.join(buildPath, 'v3'));
        console.log("Successfully created build/v2 and build/v3")
        console.log("The V3 build is for Chrome, the V2 build is for Firefox")
    }
});
