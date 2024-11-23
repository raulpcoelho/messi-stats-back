import { Team } from '../../teams/entities/team.entity';
import { Competition } from '../../competitions/entities/competition.entity';
import { Season } from '../../seasons/entities/season.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({ name: 'matches' })
export class Match {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id!: number;

  @Column({ name: 'match_date', type: 'date', nullable: true })
  matchDate: Date;

  @ManyToOne(() => Season, season => season.matches)
  @JoinColumn({ name: 'season_id' })
  season: Relation<Season>;

  @ManyToOne(() => Competition, competition => competition.matches)
  @JoinColumn({ name: 'competition_id' })
  competition: Relation<Competition>;

  @Column({ name: 'home', nullable: true })
  home: boolean;

  @ManyToOne(() => Team, team => team.matchesWithMessi)
  @JoinColumn({ name: 'team_id' })
  team: Relation<Team>;

  @ManyToOne(() => Team, team => team.matchesAgainstMessi)
  @JoinColumn({ name: 'opponent_id' })
  opponent: Relation<Team>;

  @Column({ name: 'team_score', nullable: true })
  teamScore: number;

  @Column({ name: 'opponent_score', nullable: true })
  opponentScore: number;

  @Column({ name: 'goals', nullable: true })
  goals: number;

  @Column({ name: 'assists', nullable: true })
  assists: number;

  @Column({ name: 'started', nullable: true })
  started: boolean;

  @Column({ name: 'minutes_played', nullable: true })
  minutesPlayed: number;

  @Column({ name: 'pens_scored', nullable: true })
  pensScored: number;

  @Column({ name: 'pens_missed', nullable: true })
  pensMissed: number;

  @Column({ name: 'hat_tricks', nullable: true })
  hatTricks: number;

  @Column({ name: 'free_kicks', nullable: true })
  freeKicks: number;

  @Column({ name: 'inside_box', nullable: true })
  insideBox: number;

  @Column({ name: 'outside_box', nullable: true })
  outsideBox: number;

  @Column({ name: 'left', nullable: true })
  left: number;

  @Column({ name: 'right', nullable: true })
  right: number;

  @Column({ name: 'head', nullable: true })
  head: number;

  @Column({ name: 'other', nullable: true })
  other: number;

  @Column({ name: 'successful_dribbles', nullable: true })
  successfulDribbles: number;

  @Column({ name: 'motm', nullable: true })
  motm: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
