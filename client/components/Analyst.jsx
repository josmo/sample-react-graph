import React from 'react';
import {List, ListItem} from 'material-ui/List';
import SocialPerson from 'material-ui/svg-icons/social/person'
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const baseAnalysts = "http://localhost:8888/v1/analysts";

const style = {
  marginRight: 20,
  marginLeft: 20,
};
const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const onDelete = (item) => {
  fetch(`${baseAnalysts}/${item.id}`, {
    method: 'delete'
  })
    .then(response => response.json());
};

const rightIconMenu = (item) => (
  <IconMenu iconButtonElement={iconButtonElement}>
    {/*<MenuItem>Edit</MenuItem>*/}
    <MenuItem onTouchTap={() => onDelete(item)}>Delete</MenuItem>
  </IconMenu>
);


export default class Analyst extends React.Component {
  state = {
    analysts: [],
    samAccountName: '',
    name: ''
  };

  addUser() {
    fetch(`${baseAnalysts}/new`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: this.state.name, sAMAccountName: this.state.samAccountName})
    }).then(response => {
      return response.json();
    }).then(data => {
      var adding = this.state.analysts;
      adding.push(data);
      this.setState({analysts: adding});
    });
  }

  rightIconMenu (item) {
    return (
      <IconMenu iconButtonElement={iconButtonElement}>
        {/*<MenuItem>Edit</MenuItem>*/}
        <MenuItem onTouchTap={() => onDelete(item)}>Delete</MenuItem>
      </IconMenu>
    )
  };

  mapAnalyst (analyst) {
    return (
      <ListItem
        key={analyst.id}
        primaryText={analyst.name}
        secondaryText={analyst.sAMAccountName}
        leftIcon={<SocialPerson />}
        initiallyOpen={false}
        rightIconButton={rightIconMenu(analyst)}
        primaryTogglesNestedList={true}
      />
    );
  };

  componentDidMount() {
    fetch(baseAnalysts)
      .then(result => result.json())
      .then(result => {
        this.setState({ analysts: result });
      });
  }

  render() {
    if (this.state.analysts.length === 0){
      return <p>Loading .....</p>
    }
    return (
      <div>
        <Paper zDepth={4}>
          <Subheader>Analysts</Subheader>
          <List>
            {this.state.analysts.map(this.mapAnalyst)}
          </List>
          <TextField
            hintText="Fred Flinstone"
            floatingLabelText="Name"
            onBlur={event => this.setState({name: event.target.value})}
          />
          <TextField
            hintText="someid"
            floatingLabelText="Other System"
          />
          <TextField
            hintText="frflinstone"
            floatingLabelText="AD SAMAccountName"
            onBlur={event => this.setState({samAccountName: event.target.value})}
          />
          <FloatingActionButton style={style} onClick={() => this.addUser()}>
            <ContentAdd />
          </FloatingActionButton>
        </Paper>
      </div>
    )
  }
}




