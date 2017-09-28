import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://graphql.classis.io/graphql',
    // opts: {
    //   mode: 'no-cors',
    // },
  }),
});
import EmployeeList from './EmployeeList.jsx';
import Analyst from './Analyst.jsx';

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Analyst/>
        {/*<EmployeeList/>*/}
      </ApolloProvider>);
  }
}
