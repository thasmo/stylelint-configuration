import fs from 'fs';
import p from 'path';
import test from 'ava';
import glob from 'fast-glob';
import stylelint from 'stylelint';

const base = JSON.parse(fs.readFileSync('src/base.json', 'utf8'));
const files = glob('src/rules/*.json');

files.then((paths) => {
    paths.forEach((path) => {
        const data = fs.readFileSync(path, 'utf8');
        const rules = JSON.parse(data);
        const name = p.basename(path, '.json');
        const fixture = `test/fixtures/${name}.scss`;
        const config = {
            ...base,
            rules: {
                ...rules,
            },
        };

        test(name, (assert) => {
            return stylelint.lint({
                config,
                files: fixture,
            }).then((result) => {
                assert.true(result.errored);
            });
        });
    });
});
