/**
 * @summary template fetches the old-man-yells-at.png base image from GitHub.
 *
 * For security, we verify the checksum of the image on first access.
 */
import { createHash } from 'node:crypto';

const EXPECTED_CHECKSUM = '7e0095f6b841b97f2745afcdc803b0895028de7caeeeb665e158ef6a20f35b80';
const TEMPLATE_URL = 'https://github.com/zampsn/old-man-yells-at/blob/main/static/old-man-yells-at.png?raw=true';

let cachedTemplate: Buffer | undefined;

const verifyChecksum = (buffer: Buffer): void => {
    const hash = createHash('sha256').update(buffer).digest('hex');
    if (hash !== EXPECTED_CHECKSUM) {
        throw new Error(`Template image checksum mismatch. Expected ${EXPECTED_CHECKSUM}, got ${hash}`);
    }
};

const loadFromRemote = async (): Promise<Buffer> => {
    const response = await fetch(TEMPLATE_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch template image: ${response.status} ${response.statusText}`);
    }
    return Buffer.from(await response.arrayBuffer());
};

export const getTemplateBuffer = async (): Promise<Buffer> => {
    if (cachedTemplate) return cachedTemplate;

    const buffer = await loadFromRemote();
    verifyChecksum(buffer);

    cachedTemplate = buffer;
    return buffer;
};
