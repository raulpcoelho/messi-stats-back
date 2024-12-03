import * as fs from 'fs';
import * as path from 'path';
import { FindMatchDto } from 'src/matches/dto/find-match.dto';
import { Match } from 'src/matches/entities/match.entity';
import { MatchesRepository } from 'src/matches/matches.repository';

export class InMemoryMatchesRepository implements MatchesRepository {
  public matches: Match[] = [];

  constructor() {
    const data = fs.readFileSync(path.join(__dirname, '../data/matches.json'), 'utf-8');
    this.matches = JSON.parse(data);
  }
  async findAllFiltered(findMatchDto: FindMatchDto): Promise<Match[]> {
    return await this.matches.filter(match => {
      const keys = Object.keys(findMatchDto);
      return keys.every(key => {
        if (key === 'year') {
          return new Date(match.matchDate).getFullYear() === findMatchDto.year;
        }
        if (['season', 'competition', 'team', 'opponent'].includes(key)) {
          return match[key].name === findMatchDto[key];
        }
        return match[key] === findMatchDto[key];
      });
    });
  }
}
