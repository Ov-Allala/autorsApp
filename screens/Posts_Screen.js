import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';

class Posts_Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      autorId: props.route.params.autorId,
      autorName:props.route.params.autorName
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const autorId = this.state.autorId;
 
    const url = 'https://jsonplaceholder.typicode.com/posts';
    this.setState({ loading: true });

    fetch(url)
    
      .then((res) => res.json())
      .then((res) => {
        
        this.setState({
          data: res.filter(d=>d.userId===autorId),
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.filter(d=>d.userId===autorId)
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };
  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.title.toUpperCase()} ${item.body.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={(text) => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
    const autorName = this.state.autorName;
   
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Text style={{  fontSize: 20,
          fontWeight: "bold"}} >{autorName}`s Posts</Text>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem 
          title={<Text style={{  fontSize: 15,
            fontWeight: "bold"}} >{item.title.toUpperCase()}</Text>} 
          subtitle={item.body} />
          )}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
      
    );
  }
}

export default Posts_Screen;