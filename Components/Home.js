import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Home({navigation}) {
  return (
    <ScrollView>
      <View>
        <ImageBackground
          style={styles.logo}
          source={require('../assets/pexels.jpg')}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Menu');
                }}>
                <Ionicons
                  style={{marginLeft: 10, marginTop: 6}}
                  name="menu"
                  size={35}
                  color="red"
                />
              </TouchableOpacity>
              <Text style={styles.fashionista}>Fashionista</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <Text style={styles.search}>SEARCH</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="cart"
                  style={styles.cart}
                  size={30}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.lower}>
            <View style={{flexDirection:'row',justifyContent: 'space-evenly', bottom:"20%"}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Home2', {
                    Gender : "Men"
                  });
                }}>
                <Text style={styles.intext}>MEN</Text>
              </TouchableOpacity>
              <TouchableOpacity
              ouchableOpacity
              onPress={() => {
                navigation.navigate('Home2', {
                  Gender : "Kids"
                });
              }}>
                <Text style={styles.intext}>KIDS</Text>
              </TouchableOpacity>
              <TouchableOpacity
              ouchableOpacity
              onPress={() => {
                navigation.navigate('Home2', {
                  Gender : "Women"
                });
              }}>
                <Text style={styles.intext}>WOMEN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 800,
    width: 'auto',
  },
  fashionista: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 10,
    marginTop: 8,
  },
  search: {
    fontSize: 15,
    fontWeight: '',
    color: 'red',
    marginRight: 10,
    marginTop: 15,
  },
  cart: {
    marginTop: 5,
    marginRight: 10,
  },
  lower: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  intext: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'red',
  },
});
