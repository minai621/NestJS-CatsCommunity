import { CatsRepository } from './cats.repository';
import { CatRequestDTO } from './dto/cats.request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Cat } from './cats.schema';
import * as brcypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signup(body: CatRequestDTO) {
    const { email, catName, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);
    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }
    const hashedPassword = await brcypt.hash(password, 10);
    const cat = await this.catsRepository.create({
      email,
      catName,
      password: hashedPassword,
    });
    return cat.readOnlyData;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    return newCat;
  }

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const ReadOnlyCats = allCat.map((cat) => cat.readOnlyData);

    return ReadOnlyCats;
  }
}
