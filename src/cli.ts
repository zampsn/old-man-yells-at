import { yellAt } from './yell-at.js';

yellAt('test/fixtures/test-input.png')
    .then((res) => res.toFile('temp.png'))
    .catch((err) => {
        console.error('Failed to yell at image', err);
        process.exit(1);
    });
