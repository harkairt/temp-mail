import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

// taken from https://github.com/mswjs/msw/discussions/1934#discussioncomment-9494612
// also undici is  ^5.0.0
/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */

import { TextDecoder, TextEncoder } from 'node:util';
import { ReadableStream, TransformStream } from 'node:stream/web';

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream },
  TransformStream: { value: TransformStream },
});

import { Blob } from 'node:buffer';
import { fetch, Headers, FormData, Request, Response } from 'undici';

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
});


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3010);
}
bootstrap();
