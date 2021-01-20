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
    'LAC': 'https://brandslogo.net/wp-content/uploads/2012/12/los-angeles-clippers-logo-vector.png',
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

var wins = 0
var losses = 0
var header = document.querySelector('.schedule-standings');

init()

function init() {
    fetchData()
}

function fetchData() {
    fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2010&team_ids[]=5&per_page=82`).then((response) => {
        return response.json();
    }).then((scheduleJson) => {

        for (const [index, game] of scheduleJson.data.sort((a, b) => (a.date > b.date ? 1 : -1)).entries()) {
            appendGame(index, game)
        }
    });
}

function appendGame(index, game) {

    let otherTeamAbbr = getOtherTeamAbbreviation(game)
    let chicagoWon = didChicagoWin(game)

    var date = createChild('span', 'schedule-date', stringFromDate(game.date))
    var score = createChild('span', 'schedule-score', game.home_team_score + ' - ' + game.visitor_team_score)
    var winLoss = createChild('span', 'schedule-win-loss', generateWinLossLetter(chicagoWon))
    
    if (chicagoWon) {
        winLoss.style.color = '#30b07a'
    } else {
        winLoss.style.color = '#b53140'
    }

    var logo = createChild('img', 'schedule-logo', '')
    logo.src = logoMap[otherTeamAbbr]

    var triangle = createChild('div', 'schedule-triangle', '')

    var li = document.createElement('li')
    li.appendChild(date)
    li.appendChild(score)
    li.appendChild(winLoss)
    li.appendChild(triangle)
    li.appendChild(logo)
    addListenersAndAppend(li, index, chicagoWon)
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

function generateWinLossLetter(chicagoWon) {
    if (chicagoWon) {
        return 'W'
    } else {
        return 'L'
    }
}

function stringFromDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-GB', {
        day : 'numeric', month : 'short'
    });
}

function didChicagoWin(game) {
    if (game.home_team.abbreviation === 'CHI') {
        return game.home_team_score > game.visitor_team_score
    } else {
        return game.home_team_score < game.visitor_team_score
    }
}

function getOtherTeamAbbreviation(game) {
    if (game.home_team.abbreviation === 'CHI') {
        return game.visitor_team.abbreviation
    } else {
        return game.home_team.abbreviation
    }
}

function addListenersAndAppend(li, index, chicagoWon) {

    let img = li.querySelector('.schedule-logo')
    
    li.style.transition = '1.5s'
    
    li.addEventListener('mouseover', function (event) {
        img.style.filter = 'grayscale(0%)'
        img.style.opacity = '1'
    })

    li.addEventListener('mouseout', function (event) {
        img.style.filter = 'grayscale(60%)'
        img.style.opacity = '0.3'
    })

    setTimeout(function () {

        li.style.opacity = 1

        if (chicagoWon) {
            wins++
        } else {
            losses++
        }
        
        document.querySelector('.schedule-standings').innerHTML = wins + " - " + losses
        list.appendChild(li)

    }, 800 * index); 
}