const API_URL = '/matches';

document.addEventListener('DOMContentLoaded', () => {
    fetchMatches();
    setupFilters();
});

async function fetchMatches(year = '') {
    const grid = document.getElementById('matches-grid');
    const summary = document.getElementById('stats-summary');
    
    // Show loading state if needed (initial load)
    if (!grid.children.length) {
        grid.innerHTML = Array(6).fill('<div class="match-card loading"></div>').join('');
    }

    try {
        const url = year ? `${API_URL}?year=${year}` : API_URL;
        const response = await fetch(url);
        const matches = await response.json();

        renderStats(matches);
        renderMatches(matches);
        
        if (!year) populateYears(matches);
    } catch (error) {
        console.error('Error fetching matches:', error);
        grid.innerHTML = '<p class="error">Failed to load matches. Please try again later.</p>';
    }
}

function renderStats(matches) {
    const totalMatches = matches.length;
    const totalGoals = matches.reduce((acc, match) => acc + (match.goals || 0), 0);
    const totalAssists = matches.reduce((acc, match) => acc + (match.assists || 0), 0);

    const summaryHTML = `
        <div class="stat-card">
            <div class="stat-label">Total Matches</div>
            <div class="stat-value">${totalMatches}</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Total Goals</div>
            <div class="stat-value">${totalGoals}</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Total Assists</div>
            <div class="stat-value">${totalAssists}</div>
        </div>
    `;

    document.getElementById('stats-summary').innerHTML = summaryHTML;
}

function renderMatches(matches) {
    const grid = document.getElementById('matches-grid');
    
    if (matches.length === 0) {
        grid.innerHTML = '<p class="no-results">No matches found for this criteria.</p>';
        return;
    }

    const matchesHTML = matches.map(match => {
        const homeTeam = match.home ? match.team : match.opponent;
        const awayTeam = match.home ? match.opponent : match.team;
        const homeScore = match.home ? match.teamScore : match.opponentScore;
        const awayScore = match.home ? match.opponentScore : match.teamScore;

        return `
        <div class="match-card">
            <div class="match-header">
                <span>${new Date(match.matchDate).toLocaleDateString()}</span>
                <span>${match.competition}</span>
            </div>
            <div class="match-teams">
                <div class="team">
                    <span>${homeTeam}</span>
                    <span class="score">${homeScore}</span>
                </div>
                <div class="team">
                    <span>${awayTeam}</span>
                    <span class="score">${awayScore}</span>
                </div>
            </div>
            <div class="match-details">
                <span class="tag">Goals: ${match.goals}</span>
                <span class="tag">Assists: ${match.assists}</span>
            </div>
        </div>
    `}).join('');

    grid.innerHTML = matchesHTML;
}

function populateYears(matches) {
    const years = [...new Set(matches.map(m => new Date(m.matchDate).getFullYear()))].sort((a, b) => b - a);
    const select = document.getElementById('year-filter');
    
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        select.appendChild(option);
    });
}

function setupFilters() {
    const select = document.getElementById('year-filter');
    select.addEventListener('change', (e) => {
        fetchMatches(e.target.value);
    });
}
