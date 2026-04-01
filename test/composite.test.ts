import { describe, expect, it } from 'vitest';
import { compositeImages } from '../src/composite.js';
import { getTemplateBuffer } from '../src/template.js';
import path from 'node:path';
import sharp from 'sharp';

const FIXTURE_PATH = path.resolve(import.meta.dirname, 'fixtures', 'test-input.png');

describe('compositeImages', () => {
    it('should return a sharp instance', async () => {
        const templateBuffer = await getTemplateBuffer();
        const result = await compositeImages({
            inputPath: FIXTURE_PATH,
            templateBuffer,
            width: 128,
            height: 128,
        });

        expect(result).toBeDefined();
    });

    it('should produce a 128x128 PNG buffer', async () => {
        const templateBuffer = await getTemplateBuffer();
        const pipeline = await compositeImages({
            inputPath: FIXTURE_PATH,
            templateBuffer,
            width: 128,
            height: 128,
        });

        const buffer = await pipeline.toBuffer();
        const metadata = await sharp(buffer).metadata();

        expect(metadata.width).toBe(128);
        expect(metadata.height).toBe(128);
        expect(metadata.format).toBe('png');
    });

    it('should produce a resized output when given custom dimensions', async () => {
        const templateBuffer = await getTemplateBuffer();
        const pipeline = await compositeImages({
            inputPath: FIXTURE_PATH,
            templateBuffer,
            width: 64,
            height: 64,
        });

        const buffer = await pipeline.toBuffer();
        const metadata = await sharp(buffer).metadata();

        expect(metadata.width).toBe(64);
        expect(metadata.height).toBe(64);
    });
});
