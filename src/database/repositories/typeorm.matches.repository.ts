import { Injectable } from '@nestjs/common';
import { MatchesRepository } from '../../matches/matches.repository';
import { TypeOrmService } from '../typeorm.service';
import { FindMatchDto } from '../../matches/dto/find-match.dto';
import { Match } from '../../matches/entities/match.entity';
import { SelectQueryBuilder } from 'typeorm';
import { FindMatchBetweenYearsDto } from 'src/matches/dto/find-match-between-years.dto';

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
      .innerJoinAndSelect('m.opponent', 'opponent')
      .orderBy('m.matchDate', 'DESC');

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

  async findAllBetweenYears(findMatchBetweenYearsDto: FindMatchBetweenYearsDto): Promise<Match[]> {
    const { startYear, endYear } = findMatchBetweenYearsDto;

    const queryBuilder = this.typeOrmService
      .createQueryBuilder()
      .select('m')
      .from(Match, 'm')
      .innerJoinAndSelect('m.season', 'season')
      .innerJoinAndSelect('m.competition', 'competition')
      .innerJoinAndSelect('m.team', 'team')
      .innerJoinAndSelect('m.opponent', 'opponent')
      .where('EXTRACT(YEAR FROM m.matchDate) BETWEEN :startYear AND :endYear', { startYear, endYear })
      .orderBy('m.matchDate', 'DESC');
    return queryBuilder.getMany();
  }
}
