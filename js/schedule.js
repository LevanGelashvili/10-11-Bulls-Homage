let list = document.querySelector('.schedule-container')
let logoMap = {
    'ATL': 'https://i.ibb.co/BCjbfDB/hawks.png',
    'BKN': 'https://i.ibb.co/BKxGhxw/nets.png',
    'BOS': 'https://i.ibb.co/z5NwTwN/celtics.png',
    'CHA': 'https://i.ibb.co/vxqzps3/bobcat.png',
    'CHI': 'https://i.ibb.co/2tkQjBs/bulls.png',
    'CLE': 'https://i.ibb.co/0YXwYKw/cavs.png',
    'DAL': 'https://i.ibb.co/vPC4rTv/mavs.png',
    'DEN': 'https://i.ibb.co/Jqw4Y0z/nuggets.png',
    'DET': 'https://i.ibb.co/pnr9KF2/pistons.png',
    'GSW': 'https://i.ibb.co/fD79ysk/warriors.png',
    'HOU': 'https://i.ibb.co/3NLgfCZ/rockets.png',
    'IND': 'https://i.ibb.co/LpGLjKC/pacers.png',
    'LAC': 'https://i.ibb.co/Q6dm63K/clippers.png',
    'LAL': 'https://i.ibb.co/N61FMnM/lakers.png',
    'MEM': 'https://i.ibb.co/VMcp39F/grizzlies.png',
    'MIA': 'https://i.ibb.co/h2gzJLc/heat.png',
    'MIL': 'https://i.ibb.co/v3ww6Sp/bucks.png',
    'MIN': 'https://i.ibb.co/L8G7q4p/wolves.png',
    'NOP': 'https://i.ibb.co/KGG3wXP/hornets.png',
    'NYK': 'https://i.ibb.co/tP5tBLZ/knicks.png',
    'OKC': 'https://i.ibb.co/88FxQ4W/thunder.png',
    'ORL': 'https://i.ibb.co/fn47J61/magic.png',
    'PHI': 'https://i.ibb.co/3RFZ0hw/76ers.png',
    'PHX': 'https://i.ibb.co/ysprCMB/suns.png',
    'POR': 'https://i.ibb.co/QK6JYKH/blazers.png',
    'SAC': 'https://i.ibb.co/HXP85Zb/kings.png',
    'SAS': 'https://i.ibb.co/b1Bdzmm/spurs.png',
    'TOR': 'https://i.ibb.co/3p8LL5k/raptors.png',
    'UTA': 'https://i.ibb.co/r3SJ4x9/jazz.png',
    'WAS': 'https://i.ibb.co/D9PHyKK/wizards.png'
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