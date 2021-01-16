let paramsMap = {
    'Derrick Rose': {'height': "6,3", 'weight': '200', 'position': 'PG', 'avatar': 'https://cdn.nba.com/headshots/nba/latest/1040x760/201565.png'},
    'Joakim Noah': {'height': "6,11", 'weight': '232', 'position': 'C', 'avatar': 'https://www.nba.com/.element/img/2.0/sect/statscube/players/large/joakim_noah.png'},
    'Carlos Boozer': {'height': "6'9", 'weight': '258', 'position': 'PF / C', 'avatar': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1703.png'},
    'Keith Bogans': {'height': "6'5", 'weight': '215', 'position': 'SG / SF', 'avatar': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1995.png'},
    'Kyle Korver': {'height': "6'7", 'weight': '212', 'position': 'SG / SF', 'avatar': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2011.png'},
    'Luol Deng': {'height': "6'9", 'weight': '237', 'position': 'SF', 'avatar': 'https://alchetron.com/cdn/luol-deng-ed52bac7-845f-4b74-bc49-699c12b4e6a-resize-750.png'},
    'Taj Gibson': {'height': "6'9", 'weight': '232', 'position': 'PF', 'avatar': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3986.png&w=350&h=254'},
    'Omer Asik': {'height': "7'0", 'weight': '252', 'position': 'C', 'avatar': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3414.png'},
    'C.J. Watson': {'height': "6'2", 'weight': '175', 'position': 'PG', 'avatar': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3277.png'},
    'Ronnie Brewer': {'height': "6'7", 'weight': '235', 'position': 'SF / SG', 'avatar': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2991.png'}
}

let slideshow = document.querySelector('.slideshow')
let statsPanel = document.querySelector('.stats')
statsPanel.style.transition = '0.6s'

document.addEventListener('click', function(event) {
    if (!statsPanel.contains(event.target) && !slideshow.contains(event.target)) {
        statsPanel.style.opacity = 0
    }
});

document.querySelectorAll('figure').forEach(item => {
            
    item.addEventListener('click', function () {

        if (item.id === 'coach') {
            return
        }

        fetch(`https://www.balldontlie.io/api/v1/players?search=${item.id}`).then(response => {
            return response.json()
        }).then(playerDataJson => {
            
            let data = playerDataJson.data[0]

            fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2010&player_ids[]=${data.id}`).then(response => {
                return response.json()
            }).then(seasonAvgsJson => {
                
                statsPanel.style.opacity = 1

                let name = data.first_name + ' ' + data.last_name
                loadStatsParams(name)
                loadStats(seasonAvgsJson.data[0])
                document.getElementById('stats-avatar').src = paramsMap[name].avatar
            })
        })
    })
})

function loadStatsParams(name) {

    var position = 'Position: '
    var height = 'Height: '
    var weight = 'Weight: '
    var paramsObject = paramsMap[name]

    document.getElementById('stats-name').innerHTML = name
    document.getElementById('stats-position').innerHTML = position + paramsObject.position
    document.getElementById('stats-height').innerHTML = height + paramsObject.height
    document.getElementById('stats-weight').innerHTML = weight + paramsObject.weight
}

function loadStats(data) {
    setStat('stats-minutes', data.min)
    setStat('stats-games', data.games_played)
    setStat('stats-points', data.pts)
    setStat('stats-assists', data.ast)
    setStat('stats-rebounds', data.reb)
    setStat('stats-steals', data.stl)
    setStat('stats-blocks', data.blk)
    setStat('stats-turnovers', data.turnover)
    setStat('stats-fouls', data.pf)
    setStat('stats-fg%', data.fg_pct.toLocaleString('en', {style: 'percent'}))
    setStat('stats-3p%', data.fg3_pct.toLocaleString('en', {style: 'percent'}))
    setStat('stats-ft%', data.ft_pct.toLocaleString('en', {style: 'percent'}))
}

function setStat(id, value) {
    document.getElementById(id).querySelector('p').innerHTML = value
}