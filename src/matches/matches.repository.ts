import { FindMatchDto } from './dto/find-match.dto';
import { Match } from './entities/match.entity';

export abstract class MatchesRepository {
  abstract findAllFiltered(findMatchDto: FindMatchDto): Promise<Match[]>;
}
