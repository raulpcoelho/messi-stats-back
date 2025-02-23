import { QueryRunner } from 'typeorm';
import { FindMatchBetweenYearsDto } from './dto/find-match-between-years.dto';
import { FindMatchDto } from './dto/find-match.dto';
import { MatchDto } from './dto/match.dto';
import { Match } from './entities/match.entity';

export abstract class MatchesRepository {
  abstract findAllFiltered(findMatchDto: FindMatchDto): Promise<Match[]>;
  abstract findAllBetweenYears(findMatchBetweenYearsDto: FindMatchBetweenYearsDto): Promise<Match[]>;
  abstract create(matchDto: MatchDto, queryRunner: QueryRunner): Promise<Match>;
}
