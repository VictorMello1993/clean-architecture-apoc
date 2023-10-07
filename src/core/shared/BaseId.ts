import { randomUUID } from "node:crypto";

export class BaseId {
  static gerar(): string {
    return randomUUID();
  }
}
