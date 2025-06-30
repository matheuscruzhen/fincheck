import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';

export class OptionalParseUUIDPipe implements PipeTransform {
  private uuidPipe = new ParseUUIDPipe();

  async transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): Promise<string | undefined> {
    if (value === undefined) {
      return undefined;
    }
    return this.uuidPipe.transform(value, metadata);
  }
}
