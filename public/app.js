const API_URL = '/matches';
let allMatches = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchAllMatches(); // Fetch all data once for client-side aggregation
    fetchMatches(); // Initial load for home
    setupFilters();
    setupNavigation();
});

async function fetchAllMatches() {
    try {
        const response = await fetch(API_URL);
        allMatches = await response.json();
        populateLists();
    } catch (error) {
        console.error('Error fetching all matches:', error);
    }
}

function setupNavigation() {
    const links = document.querySelectorAll('.sidebar-nav a');
    const views = ['home', 'teams', 'competitions', 'opponents'];

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewName = link.dataset.view;

            // Update active link
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show selected view
            views.forEach(view => {
                const el = document.getElementById(`view-${view}`);
                if (view === viewName) {
                    el.classList.remove('hidden');
                } else {
                    el.classList.add('hidden');
                }
            });
        });
    });
}

function populateLists() {
    // Teams
    const teams = [...new Set(allMatches.map(m => m.team))].sort();
    renderGridList('teams-grid', teams, 'team');

    // Competitions
    const competitions = [...new Set(allMatches.map(m => m.competition))].sort();
    renderGridList('competitions-grid', competitions, 'competition');

    // Opponents
    const opponents = [...new Set(allMatches.map(m => m.opponent))].sort();
    renderGridList('opponents-grid', opponents, 'opponent');
}

function renderGridList(elementId, items, type) {
    const container = document.getElementById(elementId);
    container.innerHTML = items.map(item => `
        <div class="grid-item" onclick="showStats('${type}', '${item.replace(/'/g, "\\'")}')">
            <h3>${item}</h3>
            <p>Click for stats</p>
        </div>
    `).join('');
}

async function showStats(type, value) {
    // Hide grid, show stats container
    const viewId = type === 'team' ? 'teams' : type === 'competition' ? 'competitions' : 'opponents';
    const statsContainer = document.getElementById(`${type === 'team' ? 'team' : type === 'competition' ? 'competition' : 'opponent'}-stats`);
    
    // Filter matches
    const filteredMatches = allMatches.filter(m => m[type] === value);
    
    // Calculate stats
    const totalMatches = filteredMatches.length;
    const goals = filteredMatches.reduce((acc, m) => acc + m.goals, 0);
    const assists = filteredMatches.reduce((acc, m) => acc + m.assists, 0);

    statsContainer.innerHTML = `
        <div class="section-header">
            <h2>${value} Stats</h2>
            <button class="btn btn-secondary" onclick="resetView('${viewId}')">Back to List</button>
        </div>
        <div class="stats-summary">
            <div class="stat-card">
                <div class="stat-label">Matches</div>
                <div class="stat-value">${totalMatches}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Goals</div>
                <div class="stat-value">${goals}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Assists</div>
                <div class="stat-value">${assists}</div>
            </div>
        </div>
        <div class="matches-grid">
            ${renderMatchesHTML(filteredMatches)}
        </div>
    `;
    
    document.getElementById(`${viewId}-grid`).classList.add('hidden');
    statsContainer.classList.remove('hidden');
}

window.resetView = function(viewId) {
    document.getElementById(`${viewId}-grid`).classList.remove('hidden');
    const statsContainer = document.getElementById(`${viewId === 'teams' ? 'team' : viewId === 'competitions' ? 'competition' : 'opponent'}-stats`);
    statsContainer.classList.add('hidden');
    statsContainer.innerHTML = '';
};

async function fetchMatches(year = '') {
    const grid = document.getElementById('matches-grid');
    
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

    grid.innerHTML = renderMatchesHTML(matches);
}

function renderMatchesHTML(matches) {
    return matches.map(match => {
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
                <span class="tag ${match.goals > 0 ? 'highlight' : ''}">Goals: ${match.goals}</span>
                <span class="tag ${match.assists > 0 ? 'highlight' : ''}">Assists: ${match.assists}</span>
            </div>
        </div>
    `}).join('');
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
