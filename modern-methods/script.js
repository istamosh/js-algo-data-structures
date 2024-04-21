const teamName = document.getElementById('team');
const typeOfSport = document.getElementById('sport');
const worldCupYear = document.getElementById('year');
const headCoach = document.getElementById('head-coach');
const playerCards = document.getElementById('player-cards');
const playersDropdownList = document.getElementById('players');

// build out the data structure that will hold all of the information for your football team
const myFavoriteFootballTeam = {
    team: 'Argentina',
    sport: 'Football',
    year: 1986,
    isWorldCupWinner: true,
    headCoach: {
        coachName: 'Carlos Bilardo',
        matches: 7
    },
    players: [
        {
            name: "Sergio Almirón",
            position: "forward",
            number: 1,
            isCaptain: false,
            nickname: null
        },
        {
            name: "Sergio Batista",
            position: "midfielder",
            number: 2,
            isCaptain: false,
            nickname: null
        },
        {
            name: "Ricardo Bochini",
            position: "midfielder",
            number: 3,
            isCaptain: false,
            nickname: "El Bocha",
          },
          {
            name: "Claudio Borghi",
            position: "midfielder",
            number: 4,
            isCaptain: false,
            nickname: "Bichi",
          },
          {
            name: "José Luis Brown",
            position: "defender",
            number: 5,
            isCaptain: false,
            nickname: "Tata",
          },
          {
            name: "Daniel Passarella",
            position: "defender",
            number: 6,
            isCaptain: false,
            nickname: "El Gran Capitán",
          },
          {
            name: "Jorge Burruchaga",
            position: "forward",
            number: 7,
            isCaptain: false,
            nickname: "Burru",
          },
          {
            name: "Néstor Clausen",
            position: "defender",
            number: 8,
            isCaptain: false,
            nickname: null,
          },
          {
            name: "José Luis Cuciuffo",
            position: "defender",
            number: 9,
            isCaptain: false,
            nickname: "El Cuchu",
          },
          {
            name: "Diego Maradona",
            position: "midfielder",
            number: 10,
            isCaptain: true,
            nickname: "El Pibe de Oro",
          },
          {
            name: "Jorge Valdano",
            position: "forward",
            number: 11,
            isCaptain: false,
            nickname: "The Philosopher of Football",
          },
          {
            name: "Héctor Enrique",
            position: "midfielder",
            number: 12,
            isCaptain: false,
            nickname: null,
          },
          {
            name: "Oscar Garré",
            position: "defender",
            number: 13,
            isCaptain: false,
            nickname: null,
          },
          {
            name: "Ricardo Giusti",
            position: "midfielder",
            number: 14,
            isCaptain: false,
            nickname: null,
          },
          {
            name: "Luis Islas",
            position: "goalkeeper",
            number: 15,
            isCaptain: false,
            nickname: "El loco",
          },
          {
            name: "Julio Olarticoechea",
            position: "defender",
            number: 16,
            isCaptain: false,
            nickname: null,
          },
          {
            name: "Pedro Pasculli",
            position: "forward",
            number: 17,
            isCaptain: false,
            nickname: null,
          },
          {
            name: "Nery Pumpido",
            position: "goalkeeper",
            number: 18,
            isCaptain: false,
            nickname: null,
          },
          {
            name: "Oscar Ruggeri",
            position: "defender",
            number: 19,
            isCaptain: false,
            nickname: "El Cabezón",
          },
          {
            name: "Carlos Tapia",
            position: "midfielder",
            number: 20,
            isCaptain: false,
            nickname: null,
          },
          {
            name: "Marcelo Trobbiani",
            position: "midfielder",
            number: 21,
            isCaptain: false,
            nickname: "Calesita",
          },
          {
            name: "Héctor Zelada",
            position: "goalkeeper",
            number: 22,
            isCaptain: false,
            nickname: null,
          }
    ]
};

// will freeze this object and prevent any changes being made to it
Object.freeze(myFavoriteFootballTeam);

// access the key from the myFavoriteFootballTeam object
// const sport = myFavoriteFootballTeam.sport;
// const team = myFavoriteFootballTeam.team;

// accessing properties from the myFavoriteFootballTeam object using dot notation and assigning them to new const variables. But in JavaScript, there is an easier way to accomplish the same goal
// by using object destructuring syntax
const { sport, team, year, players } = myFavoriteFootballTeam;

// access the coachName value from the myFavoriteFootballTeam.headCoach object using the destructuring syntax
const { coachName } = myFavoriteFootballTeam.headCoach;

// displaying the team's information on the screen.
typeOfSport.textContent = sport;
teamName.textContent = team;
worldCupYear.textContent = year;
headCoach.textContent = coachName;

// Add a new parameter to your setPlayerCards function called arr and assign it a default value of players.
const setPlayerCards = (arr = players) => {

    // create a new array that will be responsible for adding the player card information to the page.
    // In order to access each of those properties inside the callback function, you will need to use object destructuring to unpack them into variables.
    // don't forget to implicitly return the template string (after =>, without the {} sign)
    // use a ternary operator to check if isCaptain is true. If so, return (Captain) otherwise return an empty string.
    // To remove the commas between each player-card so it does not show up on screen, chain the .join() method to the .map()
    playerCards.innerHTML += arr.map(({name, position, number, isCaptain, nickname}) => 
        `<div class="player-card">
            <h2>${name} ${isCaptain === true ? '(Captain)' : ''}</h2>
            <p>Position: ${position}</p>
            <p>Number: ${number}</p>
            <p>Nickname: ${nickname !== null ? nickname : 'N/A'}</p>
        </div>`
    ).join('');
};

// will detect when a user makes a selection from the playersDropdownList.
// e contains event parameter for the function
playersDropdownList.addEventListener('change', e => {
    playerCards.innerHTML = '';

    // switch statement which will check for the user's selection from the player dropdown menu and filter out cards based on the player's positions.
    switch (e.target.value) {
        // Call the setPlayerCards function with an argument of players.filter() with callback function with a parameter called player and implicitly return player.nickname is not null.
        case 'nickname':
            setPlayerCards(players.filter(player => player.nickname !== null));
            break;

        // callback function with a parameter of player that will check if player.position equals forward.
        case 'forward':
            setPlayerCards(players.filter(player => player.position === 'forward'));
            break;

        // checks if player.position equals midfielder
        case 'midfielder':
            setPlayerCards(players.filter(player => player.position === 'midfielder'));
            break;
        // checks if player.position equals defender
        case 'defender':
            setPlayerCards(players.filter(player => player.position === 'defender'));
            break;
        // checks if player.position equals goalkeeper
        case 'goalkeeper':
            setPlayerCards(players.filter(player => player.position === 'goalkeeper'));
            break;
        default:
            setPlayerCards();
    }
});