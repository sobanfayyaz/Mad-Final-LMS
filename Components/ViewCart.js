import React, {useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ViewCart({navigation, route}) {
  const [cart, setcart] = React.useState(route.params.cart);
  let ArrayOfCartObject = Object.values(cart);

  function header(){
    return <View>
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
            <Ionicons name="cart" style={styles.cart} size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop: 15}}>
        <Text style={{fontSize: 30, fontWeight: 'bold', paddingLeft: 15}}>
          Shopping Cart
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'space-between',
        }}>
        <Text style={{paddingLeft: 15, fontSize: 20}}>Product</Text>
      </View>

      <View style={{borderBottomWidth: 2, margin: 10}}></View>
      </View>
  }
  function footer(){
    return <View>
        <View
          style={{
            borderBottomWidth: 2,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 20,
          }}></View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}></Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width:'80%',
            alignSelf:'center'
          }}>
          <Text style={{fontSize: 20}}>
            Total and shipping calculated at checkout
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Checkout');
          }}
          style={{
            backgroundColor: 'red',
            margin: 10,
            marginTop: 50,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: '', color: 'white'}}>
            CHECKOUT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.push('Home2', {
              Gender: null,
              Category: null,
            });
          }}
          style={{
            backgroundColor: 'grey',
            margin: 10,
            marginTop: 10,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: '', color: 'white'}}>
            CONTINUE SHOPPING
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 2,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 40,
          }}></View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            justifyContent: 'space-between',
          }}>
          <Text style={{paddingLeft: 15, fontSize: 20}}>CONTACT US?</Text>
          <Text style={{fontSize: 20, paddingRight: 15}}>FAQS</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}>
          <TouchableOpacity>
            <Ionicons name="logo-whatsapp" style={{}} size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="logo-facebook" style={{}} size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="logo-instagram"
              style={{}}
              size={25}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" style={{}} size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
  }
  /*function total(){
    var price = 0;
    for (const document of cart) {
      price = price + +document.Price;
    }
    setprice(price)
  }*/
  const renderr = ({item}) => (
    <View>
      <View style={{margin: 25, flexDirection: 'row'}}>
        <Image
          source={{uri: item.imageurl}}
          style={{height: 200, width: 160}}
        />
        <View style={{width: '45%'}}>
          <Text style={{fontSize: 20, paddingLeft: 15, fontWeight: 'bold'}}>
            {item.Name}
          </Text>
          <Text style={{fontSize: 20, paddingLeft: 15, paddingTop: 10}}>
            PKR {item.Price}
          </Text>
          <Text style={{fontSize: 20, paddingLeft: 15, paddingTop: 10}}>
            Color: {item.Color}
          </Text>
          <Text style={{fontSize: 20, paddingLeft: 15, paddingTop: 10}}>
            Size: {route.params.Size}
          </Text>
        </View>
        <View style={{}}>
          <TouchableOpacity>
            <Ionicons
              name="trash-outline"
              style={{marginTop: 165}}
              size={25}
              color="red"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView>
        <FlatList
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={{alignSelf: 'center',}}
          data={ArrayOfCartObject}
          renderItem={renderr}
          ListHeaderComponent={header}
          ListFooterComponent={footer}
          
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fashionista: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 15,
    marginTop: 6,
  },
  search: {
    fontSize: 15,
    fontWeight: '',
    color: 'red',
    marginTop: 13,
    marginRight: 5,
  },
  cart: {
    marginTop: 6,
    marginRight: 5,
  },
});
