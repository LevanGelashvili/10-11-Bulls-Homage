let list = document.querySelector('.schedule-container')
let logoMap = {
    'ATL': 'http://loodibee.com/wp-content/uploads/atlanta-hawks-logo-2007-2015.png',
    'BKN': 'http://loodibee.com/wp-content/uploads/nba-boston-celtics-logo.png',
    'BOS': 'http://loodibee.com/wp-content/uploads/new-jersey-nets-1997-2012.png',
    'CHA': 'http://loodibee.com/wp-content/uploads/charlotte-bobcats-2008-2012.png',
    'CHI': 'http://loodibee.com/wp-content/uploads/nba-chicago-bulls-logo.png',
    'CLE': 'http://loodibee.com/wp-content/uploads/cleveland-cavaliers-2010-2017.png',
    'DAL': 'http://loodibee.com/wp-content/uploads/dallas-mavericks-2001-2017.png',
    'DEN': 'http://loodibee.com/wp-content/uploads/denver-nuggets-2009-2018.png',
    'DET': 'http://loodibee.com/wp-content/uploads/detroit-pistons-2005-2017.png',
    'GSW': 'http://loodibee.com/wp-content/uploads/nba-golden-state-warriors-logo.png',
    'HOU': 'http://loodibee.com/wp-content/uploads/nba-houston-rockets-logo.png',
    'IND': 'http://loodibee.com/wp-content/uploads/indiana-pacers-2005-2017.png',
    'LAC': 'https://assets.stickpng.com/images/58419c59a6515b1e0ad75a60.png',
    'LAL': 'http://loodibee.com/wp-content/uploads/nba-los-angeles-lakers-logo.png',
    'MEM': 'http://loodibee.com/wp-content/uploads/memphis-grizzlies-2004-2018.png',
    'MIA': 'http://loodibee.com/wp-content/uploads/miami-heat-logo-symbol.png',
    'MIL': 'http://loodibee.com/wp-content/uploads/milwaukee-bucks-2006-2015.png',
    'MIN': 'http://loodibee.com/wp-content/uploads/minnesota-timberwolves-2008-2017.png',
    'NOP': 'http://loodibee.com/wp-content/uploads/new-orleans-hornets-2008-2013.png',
    'NYK': 'http://loodibee.com/wp-content/uploads/nba-new-york-knicks-logo.png',
    'OKC': 'http://loodibee.com/wp-content/uploads/nba-oklahoma-city-thunder-logo.png',
    'ORL': 'http://loodibee.com/wp-content/uploads/nba-orlando-magic-logo.png',
    'PHI': 'http://loodibee.com/wp-content/uploads/philadelphia-76ers-2010-2014.png',
    'PHX': 'http://loodibee.com/wp-content/uploads/phoenix-suns-2000-2013.png',
    'POR': 'http://loodibee.com/wp-content/uploads/portland-trail-blazers-2004-2017.png',
    'SAC': 'http://loodibee.com/wp-content/uploads/sacramento-kings-1994-2016.png',
    'SAS': 'http://loodibee.com/wp-content/uploads/san-antonio-spurs-2002-2017.png',
    'TOR': 'https://freepngimg.com/thumb/symbol/84499-toronto-pink-graphic-miami-heat-design-nba.png',
    'UTA': 'http://loodibee.com/wp-content/uploads/utah-jazz-2010-2016.png',
    'WAS': 'http://loodibee.com/wp-content/uploads/washington-wizards-2011-2015.png'
}

init()

function init() {
    fetchData()
}

function fetchData() {
    fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2010&team_ids[]=5&per_page=82`).then((response) => {
        return response.json();
    }).then((scheduleJson) => {

        for (game of scheduleJson.data) {
            console.log(game.home_team.abbreviation)
            appendGame(game)
        }
    });
}

function appendGame(game) {

    let [chicagoHome, chicagoWon] = getChicagoDetails(game)

    var date = createChild('p', 'schedule-date', stringFromDate(game.date))
    var score = createChild('p', 'schedule-score', game.home_team_score + ' - ' + game.visitor_team_score)
    var homeAway = createChild('p', 'schedule-home-away', generateHomeAwayLetter(chicagoHome))
    
    var winLoss = createChild('p', 'schedule-win-loss', generateWinLossLetter(chicagoWon))
    if (chicagoWon) {
        winLoss.style.color = 'green'
    } else {
        winLoss.style.color = '#ce1141'
    }

    var logo = createChild('img', 'schedule-logo', '')
    logo.src = logoMap[getOtherTeamAbbreviation(game)]

    var li = document.createElement('li')
    li.appendChild(date)
    li.appendChild(score)
    li.appendChild(winLoss)
    li.appendChild(homeAway)
    li.appendChild(logo)
    list.appendChild(li)
}

function createChild(type, className, text) {
    var child = document.createElement(type)
    if (className) {
        child.setAttribute('class', className)
    }
    if (text) {
        child.innerHTML = text
    }
    return child
}

function generateHomeAwayLetter(chicagoHome) {
    if (chicagoHome) {
        return '@'
    } else {
        return 'VS'
    }
}

function generateWinLossLetter(chicagoWon) {
    if (chicagoWon) {
        return 'W'
    } else {
        return 'L'
    }
}

function stringFromDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-GB', {
        month : 'short', day : 'numeric'
    });
}

// [chicago was home, chicago won]
function getChicagoDetails(game) {
    if (game.home_team.abbreviation === 'CHI') {
        return [true, game.home_team_score > game.visitor_team_score]
    } else {
        return [false, game.home_team_score < game.visitor_team_score]
    }
}

function getOtherTeamAbbreviation(game) {
    if (game.home_team.abbreviation === 'CHI') {
        return game.visitor_team.abbreviation
    } else {
        return game.home_team.abbreviation
    }
}