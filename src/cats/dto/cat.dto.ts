import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDTO extends PickType(Cat, [
  'email',
  'catName',
] as const) {
  @ApiProperty({
    example: 'number string',
    description: 'id',
    required: true,
  })
  id: string;
}
