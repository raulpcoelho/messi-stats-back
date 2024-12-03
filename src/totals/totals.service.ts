import { Injectable } from '@nestjs/common';
import { FindMatchDto } from '../matches/dto/find-match.dto';
import { MatchesRepository } from '../matches/matches.repository';
import { TotalsDto } from './dtos/totals.dto';

@Injectable()
export class TotalsService {
  constructor(private readonly matchesRepository: MatchesRepository) {}
  async findAllFiltered(findMatchDto: FindMatchDto): Promise<TotalsDto> {
    const matches = await this.matchesRepository.findAllFiltered(findMatchDto);

    const totalsDto = matches.reduce((acc, match) => {
      acc.totalGoals += match.goals;
      acc.totalAssists += match.assists;
      acc.totalMatches += 1;
      acc.totalMinutes += match.minutesPlayed;
      acc.totalPensScored += match.pensScored;
      acc.totalPensMissed += match.pensMissed;
      acc.totalHatTricks += match.hatTricks;
      acc.totalFreeKicks += match.freeKicks;
      acc.totalInsideBox += match.insideBox;
      acc.totalOutsideBox += match.outsideBox;
      acc.totalLeft += match.left;
      acc.totalRight += match.right;
      acc.totalHeaded += match.head;
      acc.totalOtherBodyPart += match.other;
      acc.totalSuccessfulDribbles += match.successfulDribbles;
      acc.matchesWon += match.teamScore > match.opponentScore ? 1 : 0;
      acc.matchesLost += match.teamScore < match.opponentScore ? 1 : 0;
      acc.homeMatches += +match.home; // +true = 1, +false = 0
      acc.awayMatches += +!match.home;
      acc.totalMotm += +match.motm;
      acc.matchesStarted += +match.started;
      return acc;
    }, new TotalsDto()); // new TotalsDto() creates a new instance of the TotalsDto class with all properties set to 0

    return totalsDto;
  }
}
