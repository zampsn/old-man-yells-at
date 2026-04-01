import { describe, expect, it } from 'vitest';
import { yellAt } from '../src/index.js';
import { Builder } from '../src/builder.js';
import path from 'node:path';
import os from 'node:os';
import sharp from 'sharp';
import { existsSync } from 'node:fs';

const FIXTURE_PATH = path.resolve(import.meta.dirname, 'fixtures', 'test-input.png');

describe('yellAt', () => {
    it('should return a Builder instance', async () => {
        const result = await yellAt(FIXTURE_PATH);
        expect(result).toBeInstanceOf(Builder);
    });

    it('should produce a valid emoji buffer end-to-end', async () => {
        const builder = await yellAt(FIXTURE_PATH);
        const buffer = await builder.toBuffer();
        const metadata = await sharp(buffer).metadata();

        expect(metadata.width).toBe(128);
        expect(metadata.height).toBe(128);
        expect(metadata.format).toBe('png');
    });

    it('should write an emoji file end-to-end', async () => {
        const outputPath = path.join(os.tmpdir(), `yell-at-test-${Date.now()}.png`);
        const builder = await yellAt(FIXTURE_PATH);
        await builder.toFile(outputPath);

        expect(existsSync(outputPath)).toBe(true);
        const metadata = await sharp(outputPath).metadata();
        expect(metadata.width).toBe(128);
        expect(metadata.height).toBe(128);
    });

    it('should support chained resize end-to-end', async () => {
        const builder = await yellAt(FIXTURE_PATH);
        const buffer = await builder.resize(64, 64).toBuffer();
        const metadata = await sharp(buffer).metadata();

        expect(metadata.width).toBe(64);
        expect(metadata.height).toBe(64);
    });
});
