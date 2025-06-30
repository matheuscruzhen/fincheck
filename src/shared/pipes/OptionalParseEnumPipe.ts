import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ParseEnumPipe } from '@nestjs/common';

export class OptionalParseEnumPipe<T = any> implements PipeTransform {
  private enumPipe: ParseEnumPipe<T>;

  constructor(private enumType: T) {
    this.enumPipe = new ParseEnumPipe(this.enumType);
  }

  async transform(
    value: T | undefined,
    metadata: ArgumentMetadata,
  ): Promise<T | undefined> {
    if (value === undefined) {
      return undefined;
    }
    return this.enumPipe.transform(value, metadata);
  }
}
