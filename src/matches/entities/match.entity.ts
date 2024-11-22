import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'matches' })
export class Match {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id!: number;

  @Column({ name: 'match_date', type: 'date', nullable: true })
  matchDate: Date;

  @Column({ name: 'season', length: 11, nullable: true })
  season: string;

  @Column({ name: 'competition', length: 30, nullable: true })
  competition: string;

  @Column({ name: 'home', nullable: true })
  home: boolean;

  @Column({ name: 'team', length: 30, nullable: true })
  team: string;

  @Column({ name: 'opponent', length: 30, nullable: true })
  opponent: string;

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
