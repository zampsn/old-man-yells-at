import { describe, expect, it } from 'vitest';
import { getTemplateBuffer } from '../src/template.js';

describe('getTemplateBuffer', () => {
    it('should load the template', async () => {
        await expect(getTemplateBuffer()).resolves.not.toThrow();
    });
});
