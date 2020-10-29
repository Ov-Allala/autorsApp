import { Text } from 'native-base';
import React,{ Component }  from 'react';
import { View, FlatList, ActivityIndicator, } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { Avatar } from 'react-native-paper';
class Autors_Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest() 
   
  }

  makeRemoteRequest = () => {
    const url = `https://jsonplaceholder.typicode.com/users`;
    this.setState({ loading: true });
   
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res;
      })
      
      .catch(error => {
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
          marginLeft: '14%'
          
        }
      }
      />
   );
  };
  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()} ${item.email.toUpperCase()}`;
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
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() { 
     
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    } 
    return (
     
      <View style={{ flex: 1 }}>
          <Text style={{  fontSize: 20,
          fontWeight: "bold"}} >Autors</Text>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
            onPress={() =>  {this.props.navigation.navigate('🔲', {autorId: item.id ,autorName:item.name })}}
              title={item.name}
              subtitle={item.email}
              leftElement={(<Avatar.Text size={50} label={item.name.match(/[A-Z]/g)}/>)}
              rightElement={<Text>10 posts › </Text>} />
          )}
          keyExtractor={item => item.email}
          
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
 }
};

export default Autors_Screen;