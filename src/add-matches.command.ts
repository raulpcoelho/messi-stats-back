import { Command, CommandRunner, Option } from 'nest-commander';
import { MatchesRepository } from './matches/matches.repository';
import * as fs from 'fs';
import { MatchDto } from './matches/dto/match.dto';

@Command({ name: 'add-matches', description: 'Add matches from JSON or parameters' })
export class AddMatchesCommand extends CommandRunner {
  constructor(private readonly matchesRepository: MatchesRepository) {
    super();
  }

  async run(passedParams: string[], options): Promise<void> {
    const filePath = options?.file || passedParams[0];
    if (!filePath) {
      console.error('Error: You must provide a JSON file path.');
      return;
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const matchesData = JSON.parse(fileContent);
      const properties = [
        'season',
        'competition',
        'team',
        'opponent',
        'goals',
        'assists',
        'started',
        'pensMissed',
        'hatTricks',
        'freeKicks',
        'insideBox',
        'outsideBox',
        'left',
        'right',
        'head',
        'other',
        'successfulDribbles',
        'motm',
      ];
      const propertiesMap = {
        matchDate: 'date',
        home: 'homeAway',
        teamScore: 'scoreTeam',
        opponentScore: 'scoreOpponent',
        minutesPlayed: 'minsPlayed',
        pensScored: 'pens',
      };
      const matchDto: MatchDto = new MatchDto();
      for (const matchJson of matchesData) {
        for (const property of properties) matchDto[property] = matchJson.node[property];
        for (const key in propertiesMap) {
          matchDto[key] = matchJson.node[propertiesMap[key]];
        }
        console.log(matchDto);
        //treat data!
      }
    } catch (error) {
      console.error('Error reading the JSON file:', error.message);
    }
  }

  @Option({
    flags: '-f, --file <file>',
    description: 'Path to the JSON file containing games',
  })
  parseFile(val: string): string {
    return val;
  }
}
