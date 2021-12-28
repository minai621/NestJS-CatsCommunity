import { CatRequestDTO } from './dto/cats.request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import * as brcypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async signup(body: CatRequestDTO) {
    const { email, catName, password } = body;
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await brcypt.hash(password, 10);

    const cat = await this.catModel.create({
      email,
      catName,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
