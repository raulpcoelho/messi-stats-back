import { Injectable } from '@nestjs/common';
import { MatchesRepository } from './matches.repository';
import { FindMatchDto } from './dto/find-match.dto';
import { MatchDto } from './dto/match.dto';
import { Match } from './entities/match.entity';
import { FindMatchBetweenYearsDto } from './dto/find-match-between-years.dto';

@Injectable()
export class MatchesService {
  constructor(private readonly matchesRepository: MatchesRepository) {}

  async findAllFiltered(findMatchDto: FindMatchDto): Promise<MatchDto[]> {
    const matches = await this.matchesRepository.findAllFiltered(findMatchDto);
    const matchDtos: MatchDto[] = matches.map(match => MatchesService.mapMatchToMatchDto(match));
    return matchDtos;
  }

  async findAllBetweenYears(findMatchBetweenYearsDto: FindMatchBetweenYearsDto): Promise<MatchDto[]> {
    const matches = await this.matchesRepository.findAllBetweenYears(findMatchBetweenYearsDto);
    const matchDtos: MatchDto[] = matches.map(match => MatchesService.mapMatchToMatchDto(match));
    return matchDtos;
  }

  static mapMatchToMatchDto(match: Match): MatchDto {
    const matchDto = new MatchDto();
    matchDto.matchDate = match.matchDate;
    matchDto.season = match.season.name;
    matchDto.competition = match.competition.name;
    matchDto.home = match.home;
    matchDto.team = match.team.name;
    matchDto.opponent = match.opponent.name;
    matchDto.teamScore = match.teamScore;
    matchDto.opponentScore = match.opponentScore;
    matchDto.goals = match.goals;
    matchDto.assists = match.assists;
    matchDto.started = match.started;
    matchDto.minutesPlayed = match.minutesPlayed;
    matchDto.pensScored = match.pensScored;
    matchDto.pensMissed = match.pensMissed;
    matchDto.hatTricks = match.hatTricks;
    matchDto.freeKicks = match.freeKicks;
    matchDto.insideBox = match.insideBox;
    matchDto.outsideBox = match.outsideBox;
    matchDto.left = match.left;
    matchDto.right = match.right;
    matchDto.head = match.head;
    matchDto.other = match.other;
    matchDto.successfulDribbles = match.successfulDribbles;
    matchDto.motm = match.motm;
    return matchDto;
  }
}
