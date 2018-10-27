import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import App from './app';

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
