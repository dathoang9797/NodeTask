/// <reference types="node" />
import http from 'http';
export declare const server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
