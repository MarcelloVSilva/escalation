import React, {useState} from 'react';
import {MenuItem, TextField, Button, Typography, CardContent, Card, withStyles, CardActions, Chip, Avatar} from "@material-ui/core";
import {Face} from "@material-ui/icons"
import './App.css';

const styles = theme => ({
  app: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    justifyContent: "center",
    gridGap: "1em",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "auto"
    }
  },
  card: {
    margin: "1em",
    maxWidth: 350,
    transition: "all ease-in-out .3s",
    [theme.breakpoints.down("sm")]: {
      maxWidth: 300
    }
  },
  chips: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    justifyContent: "center",
    justifyItems: "center",
  },
  chip: {
    margin: '.5em'
  }
});

function App(props) {
  const {classes} = props;
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [players, setPlayers] = useState("");
  const [playersPerTeam, setPlayersPerTeam] = useState(4);
  const [teams, setTeams] = useState([]);

  const handleChange = event => {
    let {value} = event.target;
    if (value.match(/ ./))
      value = value.replace(" ", ";");
    setPlayers(value);
  };

  const sort = () => {
    const plys = players.split(";");
    const howManyTeams = parseInt(players.split(";").length / playersPerTeam);
    let allTeams = [];
    for (let i = 0; i < howManyTeams; i++) {
      let team = [];
      for (let j = 0; j < playersPerTeam; j++) {
        let idx = parseInt(Math.random() * (plys.length));
        let plyr = plys.splice(idx, 1);
        team.push(plyr[0]);
      }
      if ((i === howManyTeams - 1) && plys.length > 0)
        allTeams.push(plys);
      allTeams.push(team);
    }
    setTeams(allTeams);
  }

  return (
    <div className={classes.app}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4">
            Configurações
          </Typography>
          <div style={{
            display: "grid",
            gridTemplateColumns: "auto",
            gridGap: "1em",
            justifyContent: "center"
          }}>
            <TextField
              label="Jogadores por time"
              value={playersPerTeam}
              onChange={event => setPlayersPerTeam(event.target.value)}
              select>
              {options.map((opt) => {
                return <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              })}
            </TextField>
          </div>
          <TextField
            autoFocus
            id="outlined-multiline-flexible"
            label="Nomes"
            multiline
            rows="4"
            value={players}
            onChange={handleChange}
            margin="normal"
            helperText="Digite apenas um nome da cada jogador separando por espaço"
            variant="outlined" />
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "center"
          }}>
          <Button onClick={sort} variant="outlined">Sortear</Button>
        </CardActions>
      </Card>
      <Card className={`${classes.card} ${classes.chips}`}>
        {players.split(";").map((player, idx) => {
          return player !== "" &&
            <Chip
              className={classes.chip}
              key={idx}
              color="primary"
              label={player}
              onDelete={() => {
                var replace = `;${player}|${player};|${player}`;
                var match = new RegExp(replace, "g");
                setPlayers(players.replace(match, ""));
              }} avatar={<Avatar><Face /></Avatar>} />
        })}
      </Card>
      {teams.length > 0 && teams.map((team, id) => {
        return <Card key={id} className={`${classes.card} ${classes.chips}`}>
          {team.map((player, idx) => {
            return player !== "" &&
              <Chip
                className={classes.chip}
                key={idx}
                color={team.length === playersPerTeam ? "primary" : "secondary"}
                label={player}
                avatar={<Avatar><Face /></Avatar>} />
          })}
        </Card>
      })}
    </div>
  );
}

export default withStyles(styles)(App);
