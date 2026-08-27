/// <reference types="vite/client" />

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.pdf' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'express';

declare module '@vercel/node' {
  export interface VercelRequest {
    method?: string;
    body: any;
    query?: Record<string, string | string[]>;
    cookies?: Record<string, string>;
  }
  export interface VercelResponse {
    status: (statusCode: number) => VercelResponse;
    json: (body: any) => VercelResponse;
    send: (body: any) => VercelResponse;
  }
}
