const fs = require('fs');
const glob = require ('fast-glob');

const configuration = JSON.parse(fs.readFileSync('src/base.json', 'utf8'));
const files = glob('src/rules/*.json');

files.then((paths) => {
    paths.forEach((path) => {
        const data = fs.readFileSync(path, 'utf8');
        const rules = JSON.parse(data);

        configuration.rules = {
            ...configuration.rules,
            ...rules,
        };
    });

    fs.writeFileSync('dist/configuration.json', JSON.stringify(configuration, null, 4), 'utf8');
});
