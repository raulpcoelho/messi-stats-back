import { Injectable } from '@nestjs/common';
import { MatchesRepository } from 'src/matches/matches.repository';
import { TypeOrmService } from '../typeorm.service';
import { FindMatchDto } from 'src/matches/dto/find-match.dto';
import { Match } from 'src/matches/entities/match.entity';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class TypeOrmMatchesRepository implements MatchesRepository {
  constructor(private readonly typeOrmService: TypeOrmService) {}

  async findAllFiltered(findMatchDto?: FindMatchDto): Promise<Match[]> {
    const queryBuilder = this.typeOrmService
      .createQueryBuilder()
      .select('m')
      .from(Match, 'm')
      .innerJoinAndSelect('m.season', 'season')
      .innerJoinAndSelect('m.competition', 'competition')
      .innerJoinAndSelect('m.team', 'team')
      .innerJoinAndSelect('m.opponent', 'opponent');

    if (findMatchDto) {
      Object.keys(findMatchDto).forEach(key => {
        const value = findMatchDto[key];
        TypeOrmMatchesRepository.applyFilter(queryBuilder, key, value);
      });
    }

    return queryBuilder.getMany();
  }

  static applyFilter(queryBuilder: SelectQueryBuilder<Match>, key: string, value: any): void {
    if (value === undefined && value === null) {
      return;
    }

    let query;
    if (key === 'year') {
      query = `EXTRACT(YEAR FROM m.matchDate) = :year`;
      queryBuilder.andWhere(query, { year: value });
      return;
    }
    if (['season', 'competition', 'team', 'opponent'].includes(key)) {
      query = `${key}.name = :${key}`;
      queryBuilder.andWhere(query, { [key]: value });
      return;
    }
    query = `m.${key} = :${key}`;
    queryBuilder.andWhere(query, { [key]: value });
  }
}
