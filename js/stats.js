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

                loadStatsParams(data)
                loadStatsAvatar(data.first_name + ' ' + data.last_name)

                let statsPanel = document.getElementsByClassName('stats')[0]
                statsPanel.style.display = 'flex'
                
                loadStats(statsPanel, seasonAvgsJson.data[0])
            })
        })
    })
})

function loadStatsParams(data) {

    var name = data.first_name + ' ' + data.last_name
    var height = 'Height: '
    var weight = 'Weight: '

    // API doesn't return some of the height/weights, so we have to add them manually
    switch (name) {
        case 'Omer Asik':
            height += "7'0"
            weight += "255"
            break
        case 'Carlos Boozer':
            height += "6'9"
            weight += "258"
            break
        case 'Ronnie Brewer':
            height += "6'7"
            weight += "235"
            break
        case 'C.J. Watson':
            height += "6'2"
            weight += "175"
            break
        case 'Keith Bogans':
            height += "6'5"
            weight += "215"
            break
        default:
            height += data.height_feet + "'" + data.height_inches
            weight += data.weight_pounds
    }

    document.getElementById('stats-name').innerHTML = name
    document.getElementById('stats-height').innerHTML = height
    document.getElementById('stats-weight').innerHTML = weight
}

function loadStats(statsPanel, data) {
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

function loadStatsAvatar(name) {

    let image = document.getElementById('stats-avatar')
    
    if (name === 'Derrick Rose') {
        image.src = 'https://cdn.nba.com/headshots/nba/latest/1040x760/201565.png'
    } else if(name === 'Joakim Noah') {
        image.src = 'https://cdn.nba.com/headshots/nba/latest/1040x760/201565.png'
    } else if(name === 'Carlos Boozer') {
        image.src = 'https://cdn.nba.com/headshots/nba/latest/1040x760/201565.png'
    } else if(name === 'Luol Deng') {
        image.src = 'https://cdn.nba.com/headshots/nba/latest/1040x760/201565.png'
    } else if(name === 'Taj Gibson') {
        image.src = 'https://cdn.nba.com/headshots/nba/latest/1040x760/201565.png'
    } else if(name === 'C.J. Watson') {
        image.src = 'https://cdn.nba.com/headshots/nba/latest/1040x760/201565.png'
    } else if(name === 'Kyle Korver') {
        image.src = 'https://cdn.nba.com/headshots/nba/latest/1040x760/201565.png'
    } else if(name === 'Omer Asik') {
        image.src = 'https://cdn.nba.com/headshots/nba/latest/1040x760/201565.png'
    } else if(name === 'Keith Bogans') {
        image.src = 'https://cdn.nba.com/headshots/nba/latest/1040x760/201565.png'
    } else if(name === 'Ronnie Brewer') {
        image.src = 'https://cdn.nba.com/headshots/nba/latest/1040x760/201565.png'
    }
}