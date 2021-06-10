import React from 'react';
import {FlatList, RefreshControl} from 'react-native';

class TPFlatList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.loading !== nextProps.loading) {
      return {
        isRefreshing: nextProps.loading,
      };
    }
    return null;
  }

  onRefresh() {
    const {onRefresh} = this.props;

    if (onRefresh) {
      this.setState({isRefreshing: true});
      onRefresh();
    }
  }

  render() {
    const {onRefresh, page, loading, ...rest} = this.props;

    return (
      <FlatList
        nestedScrollEnabled={false}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing && loading}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
        {...rest}
      />
    );
  }
}

export default TPFlatList;
