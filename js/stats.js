document.querySelectorAll('figure').forEach(item => {
            
    item.addEventListener('click', function () {

        if (item.id === 'coach') {
            return
        }

        fetch(`https://www.balldontlie.io/api/v1/players?search=${item.id}`).then(response => {
            return response.json()
        }).then(playerDataJson => {
            
            let data = playerDataJson.data[0]
            let name = data.first_name + ' ' + data.last_name

            fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2010&player_ids[]=${data.id}`).then(response => {
                return response.json()
            }).then(seasonAvgsJson => {

                loadStatsAvatar(name)

                let statsPanel = document.getElementsByClassName('stats')[0]
                statsPanel.style.display = 'flex'
                
                loadStats(statsPanel, seasonAvgsJson.data[0])
            })
        })
    })
})

function loadStatsAvatar(name) {

    document.getElementById('stats-name').innerHTML = name
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

function loadStats(statsPanel, data) {
    setStat('stats-minutes', data.min)
    setStat('stats-games', data.games_played)
    setStat('stats-points', data.pts)
    setStat('stats-assists', data.ast)
    setStat('stats-rebounds', data.reb)
    setStat('stats-steals', data.stl)
    setStat('stats-blocks', data.blk)
    setStat('stats-turnovers', data.turnover)
    setStat('stats-fg%', data.fg_pct.toLocaleString('en', {style: 'percent'}))
    setStat('stats-3p%', data.fg3_pct.toLocaleString('en', {style: 'percent'}))
    setStat('stats-ft%', data.ft_pct.toLocaleString('en', {style: 'percent'}))
}

function setStat(id, value) {
    let arr = document.getElementById(id).innerHTML.split(' ')
    if (arr.length > 1) {
        arr = arr.slice(0, -1)
    }
    document.getElementById(id).innerHTML = arr.join(' ') + ' ' + value
}