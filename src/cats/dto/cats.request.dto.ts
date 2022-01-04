import { PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class CatRequestDTO extends PickType(Cat, [
  'email',
  'catName',
  'password',
] as const) {}
