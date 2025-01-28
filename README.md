# Lionel Messi Stats API

This API provides detailed statistics for all matches played by Lionel Messi. You can filter the data by year, opponents, season, competition, and more to get specific insights. The data is updated regularly as Messi plays new matches.

## Endpoints

### Matches (`/matches`)

Retrieve statistics of all matches in Messi's career. Can be filtered by opponents, season, year, competition, among others.

**Example Request:**

GET /matches?year=2022&competition=World%20Cup

**Example Response:**

```json
[
  {
    "date": "2022-11-22",
    "opponent": "Saudi Arabia",
    "competition": "World Cup",
    "goals": 1,
    "assists": 0,
    "minutesPlayed": 90
  }
]
```

### Totals (/totals)

Retrieve total statistics. Can also be filtered by various parameters.

**Example Request:**

GET /totals?year=2022&competition=World%20Cup

**Example Response:**

```json
{
  "totalGoals": 7,
  "totalAssists": 3,
  "totalMatches": 7,
  "totalMinutesPlayed": 630
}
```
