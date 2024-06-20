import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryStorageService {
  private storage: Record<string, any> = {};

  set(key: string, value: any): void {
    this.storage[key] = value;
  }

  get(key: string): any {
    return this.storage[key];
  }

  delete(key: string): void {
    delete this.storage[key];
  }
}