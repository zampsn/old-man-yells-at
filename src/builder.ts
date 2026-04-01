import type sharp from 'sharp';
import { compositeImages } from './composite.js';

const DEFAULT_SIZE = 128;

export class Builder {
    private readonly inputPath: string;
    private readonly templateBuffer: Buffer;
    private outputWidth: number = DEFAULT_SIZE;
    private outputHeight: number = DEFAULT_SIZE;

    constructor(inputPath: string, templateBuffer: Buffer) {
        this.inputPath = inputPath;
        this.templateBuffer = templateBuffer;
    }

    resize(width: number, height: number): this {
        this.outputWidth = width;
        this.outputHeight = height;
        return this;
    }

    async toSharp(): Promise<sharp.Sharp> {
        return compositeImages({
            inputPath: this.inputPath,
            templateBuffer: this.templateBuffer,
            width: this.outputWidth,
            height: this.outputHeight,
        });
    }

    async toBuffer(): Promise<Buffer> {
        return (await this.toSharp()).toBuffer();
    }

    async toFile(outputPath: string): Promise<void> {
        await (await this.toSharp()).toFile(outputPath);
    }
}
