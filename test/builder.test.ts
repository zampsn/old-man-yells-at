import { describe, expect, it } from 'vitest';
import { Builder } from '../src/builder.js';
import { getTemplateBuffer } from '../src/template.js';
import path from 'node:path';
import os from 'node:os';
import sharp from 'sharp';
import { existsSync } from 'node:fs';

const FIXTURE_PATH = path.resolve(import.meta.dirname, 'fixtures', 'test-input.png');

describe('Builder', () => {
    it('should return a buffer via toBuffer()', async () => {
        const templateBuffer = await getTemplateBuffer();
        const builder = new Builder(FIXTURE_PATH, templateBuffer);
        const buffer = await builder.toBuffer();

        expect(Buffer.isBuffer(buffer)).toBe(true);
        expect(buffer.length).toBeGreaterThan(0);
    });

    it('should write a file via toFile()', async () => {
        const outputPath = path.join(os.tmpdir(), `test-output-${Date.now()}.png`);
        const templateBuffer = await getTemplateBuffer();
        const builder = new Builder(FIXTURE_PATH, templateBuffer);
        await builder.toFile(outputPath);

        expect(existsSync(outputPath)).toBe(true);

        const metadata = await sharp(outputPath).metadata();
        expect(metadata.width).toBe(128);
        expect(metadata.height).toBe(128);
    });

    it('should support chained resize()', async () => {
        const templateBuffer = await getTemplateBuffer();
        const builder = new Builder(FIXTURE_PATH, templateBuffer);
        const buffer = await builder.resize(64, 64).toBuffer();
        const metadata = await sharp(buffer).metadata();

        expect(metadata.width).toBe(64);
        expect(metadata.height).toBe(64);
    });

    it('should return a sharp instance via toSharp()', async () => {
        const templateBuffer = await getTemplateBuffer();
        const builder = new Builder(FIXTURE_PATH, templateBuffer);
        const pipeline = await builder.toSharp();

        expect(pipeline).toBeDefined();
        expect(typeof pipeline.toBuffer).toBe('function');
    });

    it('should return itself from resize() for chaining', async () => {
        const templateBuffer = await getTemplateBuffer();
        const builder = new Builder(FIXTURE_PATH, templateBuffer);
        const result = builder.resize(64, 64);

        expect(result).toBe(builder);
    });
});
