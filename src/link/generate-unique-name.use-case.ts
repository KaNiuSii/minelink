import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class GenerateUniqueNameUseCase {
  call(): string {
    const currentDateTime = new Date().toISOString();
    const randomPart = crypto.randomBytes(8).toString('hex');
    const hash = crypto.createHash('sha256');
    hash.update(currentDateTime + randomPart);
    return hash.digest('hex').substring(0, 8);
  }
}
