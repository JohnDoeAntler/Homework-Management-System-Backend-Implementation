import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipePipe implements PipeTransform {
  /**
   * Validates and transforms a value to a MongoDB ObjectID
   *
   * @remarks
   * Throws a ArgumentException if the validation fails
   *
   * @param value - The value to validate and transform
   * @returns The MongoDB ObjectID
   */
  public transform(value: any) {
    const validObjectId = Types.ObjectId.isValid(value);

    if (!validObjectId) {
        throw new BadRequestException('Invalid ObjectId');
    }

    return Types.ObjectId.createFromHexString(value);
  }
}
