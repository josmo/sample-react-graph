import React from 'react';
import {List, ListItem} from 'material-ui/List';
import SocialPerson from 'material-ui/svg-icons/social/person'
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import {
  gql,
  graphql,
} from 'react-apollo';



const mapEmployee = (employee) => {
  return (
    <ListItem
      key={employee.id}
      primaryText={employee.name}
      leftIcon={<SocialPerson />}
      initiallyOpen={false}
      primaryTogglesNestedList={true}
      nestedItems={[
        <Subheader key="a">Meetings</Subheader>,
        <ListItem
          key={1}
          primaryText="Meeting a"
          leftIcon={<ActionGrade />}
        />,
      ]}
    />
  );
};

const EmployeeList = ({ data: {loading, error, employees }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
      <div>
        <Paper zDepth={4}>
          <Subheader>Employees</Subheader>
          <List>
            {employees.map(mapEmployee)};
          </List>
        </Paper>
      </div>
  )
};

export default graphql(gql`
  query EmployeesQuery {
  employees {
    id
    name
  }
  }
`)(EmployeeList);