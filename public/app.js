const API_URL = '/matches';
let allMatches = [];
let currentPage = 1;
let isLoading = false;
let hasMore = true;
let currentYearFilter = '';

document.addEventListener('DOMContentLoaded', () => {
    fetchAllMatches();
    fetchMatches();
    setupFilters();
    setupNavigation();
    setupInfiniteScroll();
    setupScrollProgress();
    setupBackToTop();
});

// Scroll Progress Bar
function setupScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Back to Top Button
function setupBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Animated Counter
function animateCounter(element, target, duration = 1500) {
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
            element.classList.add('counting');
            setTimeout(() => element.classList.remove('counting'), 500);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

async function fetchAllMatches() {
    try {
        const response = await fetch(`${API_URL}?limit=10000`);
        allMatches = await response.json();
        populateLists();
        renderStats(allMatches);
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

            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            views.forEach(view => {
                const el = document.getElementById(`view-${view}`);
                if (view === viewName) {
                    el.classList.remove('hidden');
                } else {
                    el.classList.add('hidden');
                }
            });
            
            // Scroll to top when switching views
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

function populateLists() {
    const teams = [...new Set(allMatches.map(m => m.team))].sort();
    renderGridList('teams-grid', teams, 'team');

    const competitions = [...new Set(allMatches.map(m => m.competition))].sort();
    renderGridList('competitions-grid', competitions, 'competition');

    const opponents = [...new Set(allMatches.map(m => m.opponent))].sort();
    renderGridList('opponents-grid', opponents, 'opponent');
    
    populateYears(allMatches);
}

function renderGridList(elementId, items, type) {
    const container = document.getElementById(elementId);
    container.innerHTML = items.map(item => `
        <div class="grid-item" onclick="showStats('${type}', '${item.replace(/'/g, "\\'")}')">
            <h3>${item}</h3>
            <p>Click to view stats</p>
        </div>
    `).join('');
}

async function showStats(type, value) {
    const viewId = type === 'team' ? 'teams' : type === 'competition' ? 'competitions' : 'opponents';
    const statsContainer = document.getElementById(`${type === 'team' ? 'team' : type === 'competition' ? 'competition' : 'opponent'}-stats`);
    
    const filteredMatches = allMatches.filter(m => m[type] === value);
    
    const totalMatches = filteredMatches.length;
    const goals = filteredMatches.reduce((acc, m) => acc + m.goals, 0);
    const assists = filteredMatches.reduce((acc, m) => acc + m.assists, 0);
    const hatTricks = filteredMatches.reduce((acc, m) => acc + m.hatTricks, 0);
    const motm = filteredMatches.reduce((acc, m) => acc + (m.motm ? 1 : 0), 0);
    const minutes = filteredMatches.reduce((acc, m) => acc + m.minutesPlayed, 0);

    statsContainer.innerHTML = `
        <div class="section-header">
            <h2>${value}</h2>
            <button class="btn btn-secondary" onclick="resetView('${viewId}')">← Back to List</button>
        </div>
        <div class="stats-summary">
            <div class="stat-card">
                <div class="stat-icon">⚽</div>
                <div class="stat-label">Goals</div>
                <div class="stat-value" data-target="${goals}">0</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🎯</div>
                <div class="stat-label">Assists</div>
                <div class="stat-value" data-target="${assists}">0</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">📊</div>
                <div class="stat-label">Matches</div>
                <div class="stat-value" data-target="${totalMatches}">0</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🎩</div>
                <div class="stat-label">Hat-tricks</div>
                <div class="stat-value" data-target="${hatTricks}">0</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">⭐</div>
                <div class="stat-label">MOTM</div>
                <div class="stat-value" data-target="${motm}">0</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">⏱️</div>
                <div class="stat-label">Minutes</div>
                <div class="stat-value" data-target="${minutes}">0</div>
            </div>
        </div>
        <div class="section-header" style="margin-top: 2rem;">
            <h2>Match History</h2>
        </div>
        <div class="matches-grid">
            ${renderMatchesHTML(filteredMatches)}
        </div>
    `;
    
    document.getElementById(`${viewId}-grid`).classList.add('hidden');
    statsContainer.classList.remove('hidden');
    
    // Animate stats counters
    setTimeout(() => {
        statsContainer.querySelectorAll('.stat-value[data-target]').forEach(el => {
            animateCounter(el, parseInt(el.dataset.target));
        });
    }, 100);
}

window.resetView = function(viewId) {
    document.getElementById(`${viewId}-grid`).classList.remove('hidden');
    const statsContainer = document.getElementById(`${viewId === 'teams' ? 'team' : viewId === 'competitions' ? 'competition' : 'opponent'}-stats`);
    statsContainer.classList.add('hidden');
    statsContainer.innerHTML = '';
};

async function fetchMatches(year = '') {
    if (isLoading) return;
    
    if (year !== currentYearFilter) {
        currentYearFilter = year;
        currentPage = 1;
        hasMore = true;
        document.getElementById('matches-grid').innerHTML = '';
    }

    if (!hasMore) return;

    isLoading = true;
    const grid = document.getElementById('matches-grid');
    
    if (currentPage === 1 && !grid.children.length) {
        grid.innerHTML = Array(6).fill('<div class="match-card loading"></div>').join('');
    }

    try {
        const url = `${API_URL}?page=${currentPage}&limit=20${year ? `&year=${year}` : ''}`;
        const response = await fetch(url);
        const matches = await response.json();

        if (currentPage === 1) {
            grid.innerHTML = '';
        }

        if (matches.length < 20) {
            hasMore = false;
        }

        if (matches.length === 0 && currentPage === 1) {
            grid.innerHTML = '<p class="no-results">No matches found for this criteria.</p>';
        } else {
            const matchesHTML = renderMatchesHTML(matches);
            grid.insertAdjacentHTML('beforeend', matchesHTML);
            currentPage++;
        }
    } catch (error) {
        console.error('Error fetching matches:', error);
        if (currentPage === 1) {
            grid.innerHTML = '<p class="error">Failed to load matches. Please try again later.</p>';
        }
    } finally {
        isLoading = false;
    }
}

function setupInfiniteScroll() {
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            if (!document.getElementById('view-home').classList.contains('hidden')) {
                fetchMatches(currentYearFilter);
            }
        }
    });
}

function renderStats(matches) {
    const totalMatches = matches.length;
    const totalGoals = matches.reduce((acc, match) => acc + (match.goals || 0), 0);
    const totalAssists = matches.reduce((acc, match) => acc + (match.assists || 0), 0);
    const totalHatTricks = matches.reduce((acc, match) => acc + (match.hatTricks || 0), 0);
    const totalMotm = matches.reduce((acc, match) => acc + (match.motm ? 1 : 0), 0);
    const totalMinutes = matches.reduce((acc, match) => acc + (match.minutesPlayed || 0), 0);

    const summaryHTML = `
        <div class="stat-card">
            <div class="stat-icon">⚽</div>
            <div class="stat-label">Total Goals</div>
            <div class="stat-value" data-target="${totalGoals}">0</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-label">Total Assists</div>
            <div class="stat-value" data-target="${totalAssists}">0</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-label">Total Matches</div>
            <div class="stat-value" data-target="${totalMatches}">0</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">🎩</div>
            <div class="stat-label">Hat-tricks</div>
            <div class="stat-value" data-target="${totalHatTricks}">0</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-label">Man of the Match</div>
            <div class="stat-value" data-target="${totalMotm}">0</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">⏱️</div>
            <div class="stat-label">Minutes Played</div>
            <div class="stat-value" data-target="${totalMinutes}">0</div>
        </div>
    `;

    document.getElementById('stats-summary').innerHTML = summaryHTML;
    
    // Animate counters after rendering
    setTimeout(() => {
        document.querySelectorAll('#stats-summary .stat-value[data-target]').forEach(el => {
            animateCounter(el, parseInt(el.dataset.target));
        });
    }, 300);
}

function getResultBadge(match) {
    const result = match.teamScore > match.opponentScore ? 'win' : 
                   match.teamScore < match.opponentScore ? 'loss' : 'draw';
    const label = result === 'win' ? 'W' : result === 'loss' ? 'L' : 'D';
    return `<span class="result-badge ${result}">${label}</span>`;
}

function renderMatchesHTML(matches) {
    return matches.map(match => {
        const homeTeam = match.home ? match.team : match.opponent;
        const awayTeam = match.home ? match.opponent : match.team;
        const homeScore = match.home ? match.teamScore : match.opponentScore;
        const awayScore = match.home ? match.opponentScore : match.teamScore;

        return `
        <div class="match-card">
            ${getResultBadge(match)}
            <div class="match-header">
                <span class="match-date">📅 ${new Date(match.matchDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                <span class="match-competition">${match.competition}</span>
            </div>
            <div class="match-teams">
                <div class="team">
                    <span class="team-name">${homeTeam}</span>
                    <span class="score">${homeScore}</span>
                </div>
                <div class="team">
                    <span class="team-name">${awayTeam}</span>
                    <span class="score">${awayScore}</span>
                </div>
            </div>
            <div class="match-details">
                <span class="tag ${match.goals > 0 ? 'highlight' : ''}">⚽ ${match.goals} goal${match.goals !== 1 ? 's' : ''}</span>
                <span class="tag ${match.assists > 0 ? 'highlight' : ''}">🎯 ${match.assists} assist${match.assists !== 1 ? 's' : ''}</span>
                ${match.motm ? '<span class="tag highlight-gold">⭐ MOTM</span>' : ''}
                ${match.hatTricks > 0 ? '<span class="tag highlight-gold">🎩 Hat-trick</span>' : ''}
            </div>
        </div>
    `}).join('');
}

function populateYears(matches) {
    const years = [...new Set(matches.map(m => new Date(m.matchDate).getFullYear()))].sort((a, b) => b - a);
    const select = document.getElementById('year-filter');
    
    while (select.options.length > 1) {
        select.remove(1);
    }

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
