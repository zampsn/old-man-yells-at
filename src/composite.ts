import sharp from 'sharp';
import type { CompositeOptions } from './types.js';

const OVERLAY_SIZE = 48;

export const compositeImages = async (options: CompositeOptions): Promise<sharp.Sharp> => {
    const { inputPath, templateBuffer, width, height } = options;

    const overlay = await sharp(inputPath).resize(OVERLAY_SIZE, OVERLAY_SIZE, { fit: 'cover' }).toBuffer();

    return sharp(templateBuffer)
        .resize(width, height, { fit: 'cover' })
        .composite([{ input: overlay, top: 16, left: 0 }])
        .png();
};
