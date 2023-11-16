import { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from '../pages/Error';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const {
      state: { hasError },
      props: { children },
    } = this;

    return hasError ? <ErrorPage /> : children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ErrorBoundary;
