import { Builder } from './builder.js';
import { getTemplateBuffer } from './template.js';

export const yellAt = async (imagePath: string): Promise<Builder> => {
    const templateBuffer = await getTemplateBuffer();
    return new Builder(imagePath, templateBuffer);
};
