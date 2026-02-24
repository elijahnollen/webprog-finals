import "reflect-metadata";
import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { AppModule } from "../src/app.module";
import { configureApp } from "../src/bootstrap";

type ServerHandler = (req: VercelRequest, res: VercelResponse) => void;

let cachedHandler: ServerHandler | null = null;

async function createHandler(): Promise<ServerHandler> {
  if (cachedHandler) {
    return cachedHandler;
  }

  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  await configureApp(app);

  cachedHandler = (req, res) => {
    expressApp(req, res);
  };

  return cachedHandler;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const server = await createHandler();
  server(req, res);
}
