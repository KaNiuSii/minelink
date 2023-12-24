import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateUniqueNameUseCase {
  call(): string {
    const currentDateTime = new Date().toISOString();
    const randomPart = crypto.randomBytes(8).toString('hex');
    const hash = crypto.createHash('md5');
    hash.update(currentDateTime + randomPart);
    return hash.digest('hex').substring(0, 8);
  }
}
