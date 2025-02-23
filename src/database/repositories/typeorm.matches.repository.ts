import { Injectable } from '@nestjs/common';
import { MatchesRepository } from '../../matches/matches.repository';
import { TypeOrmService } from '../typeorm.service';
import { FindMatchDto } from '../../matches/dto/find-match.dto';
import { Match } from '../../matches/entities/match.entity';
import { SelectQueryBuilder } from 'typeorm';
import { FindMatchBetweenYearsDto } from 'src/matches/dto/find-match-between-years.dto';
import { MatchDto } from 'src/matches/dto/match.dto';
import { Competition } from 'src/competitions/entities/competition.entity';
import { Season } from 'src/seasons/entities/season.entity';
import { Team } from 'src/teams/entities/team.entity';

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

  private static applyFilter(queryBuilder: SelectQueryBuilder<Match>, key: string, value: any): void {
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

  async create(matchDto: MatchDto): Promise<Match> {
    let competition = await this.typeOrmService.manager.findOneBy(Competition, { name: matchDto.competition });
    if (!competition) {
      const newCompetition: Partial<Competition> = {
        name: matchDto.competition,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      competition = await this.typeOrmService.manager.save(Competition, newCompetition);
    }

    let season = await this.typeOrmService.manager.findOneBy(Season, { name: matchDto.season });
    if (!season) {
      const newSeason: Partial<Season> = {
        name: matchDto.season,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      season = await this.typeOrmService.manager.save(Season, newSeason);
    }

    let team = await this.typeOrmService.manager.findOneBy(Team, { name: matchDto.team });
    if (!team) {
      const newTeam: Partial<Team> = {
        name: matchDto.team,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      team = await this.typeOrmService.manager.save(Team, newTeam);
    }

    let opponent = await this.typeOrmService.manager.findOneBy(Team, { name: matchDto.opponent });
    if (!opponent) {
      const newOpponent: Partial<Team> = {
        name: matchDto.opponent,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      opponent = await this.typeOrmService.manager.save(Team, newOpponent);
    }

    const newMatch: Partial<Match> = {
      ...matchDto,
      competition,
      season,
      team,
      opponent,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await this.typeOrmService.manager.save(Match, newMatch);
  }
}
