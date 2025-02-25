import { Command, CommandRunner, Option } from 'nest-commander';
import { MatchesRepository } from './matches/matches.repository';
import * as fs from 'fs';
import { MatchDto } from './matches/dto/match.dto';
import { TypeOrmService } from './database/typeorm.service';

@Command({ name: 'add-matches', description: 'Add matches from JSON or parameters' })
export class AddMatchesCommand extends CommandRunner {
  constructor(
    private readonly matchesRepository: MatchesRepository,
    private readonly typeOrmService: TypeOrmService,
  ) {
    super();
  }

  async run(passedParams: string[], options): Promise<void> {
    const filePath = options?.file || passedParams[0];
    if (!filePath) {
      console.error('Error: You must provide a JSON file path.');
      return;
    }

    const queryRunner = this.typeOrmService.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const fileContent = await fs.promises.readFile(filePath, 'utf-8');
      const matchesData = JSON.parse(fileContent);
      const stringProperties = ['season', 'competition', 'team', 'opponent'];
      const intProperties = [
        'goals',
        'assists',
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
      ];
      const propertiesMap = {
        teamScore: 'scoreTeam',
        opponentScore: 'scoreOpponent',
        minutesPlayed: 'minsPlayed',
        pensScored: 'pens',
      };

      const allProperties = { stringProperties, intProperties, propertiesMap };

      for (const matchJson of matchesData) {
        const matchDto: MatchDto = AddMatchesCommand.fillDtoData(matchJson, allProperties);

        const match = await this.matchesRepository.create(matchDto, queryRunner);
        if (match.team) {
          console.log(
            `Match inserted: ${match.team.name} vs ${match.opponent.name} - ${match.matchDate.toLocaleDateString()}`,
          );
        }
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error('Error inserting matches:', error.message);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private static parseDate(dayMonth, year): Date {
    const [day, month] = dayMonth.split('-');
    return new Date(year, month - 1, day);
  }

  private static processJsonData(matchInfo: any): any {
    const keys = Object.keys(matchInfo);
    for (const key of keys) {
      if (matchInfo[key] === '' || matchInfo[key] === '-') {
        matchInfo[key] = null;
      }
    }
    return matchInfo;
  }

  private static fillDtoData(matchJson: any, allProperties: any): MatchDto {
    const matchInfo = AddMatchesCommand.processJsonData(matchJson.node);
    const matchDto = new MatchDto();
    const { stringProperties, intProperties, propertiesMap } = allProperties;
    for (const property of stringProperties) {
      matchDto[property] = matchInfo[property];
    }
    for (const property of intProperties) {
      const value = matchInfo[property];
      matchDto[property] = value ? parseInt(value) : null;
    }
    for (const key in propertiesMap) {
      const value = matchInfo[propertiesMap[key]];
      matchDto[key] = value ? parseInt(value) : null;
    }
    matchDto.matchDate = AddMatchesCommand.parseDate(matchInfo.date, matchInfo.year);
    matchDto.home = matchInfo.homeAway === 'H';
    matchDto.motm = matchInfo.motm === '1';
    matchDto.started = matchInfo.started === '1';
    return matchDto;
  }

  @Option({
    flags: '-f, --file <file>',
    description: 'Path to the JSON file containing games',
  })
  parseFile(val: string): string {
    return val;
  }
}
