#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { yellAt } from './yell-at.js';

const DEFAULT_OUTPUT = 'old-man-yells-at.png';
const DEFAULT_SIZE = 128;

const usage = `Usage: old-man-yells-at <input-image> [output-file]

Arguments:
  input-image   Path to the target image
  output-file   Output file path (default: ${DEFAULT_OUTPUT})

Options:
  --size, -s    Output size in pixels (default: ${DEFAULT_SIZE})
  --help, -h    Show this help message`;

const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
        size: { type: 'string', short: 's' },
        help: { type: 'boolean', short: 'h' },
    },
});

if (values.help) {
    console.log(usage);
    process.exit(0);
}

const [inputImage, outputFile] = positionals;

if (!inputImage) {
    console.error('Error: input image is required.\n');
    console.error(usage);
    process.exit(1);
}

const size = values.size ? parseInt(values.size, 10) : DEFAULT_SIZE;

if (isNaN(size) || size <= 0) {
    console.error('Error: --size must be a positive integer.');
    process.exit(1);
}

const output = outputFile ?? DEFAULT_OUTPUT;

yellAt(inputImage)
    .then((builder) => builder.resize(size, size).toFile(output))
    .then(() => console.log(`Saved to ${output}`))
    .catch((err: unknown) => {
        console.error('Failed to yell at image:', err instanceof Error ? err.message : err);
        process.exit(1);
    });
