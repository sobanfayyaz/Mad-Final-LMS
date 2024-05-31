import  React, {createContext} from 'react';
//import { CartContext } from './AppStateProvider';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function ProductDetails({navigation, route}) {
  var [cart, setcart] = React.useState([])
  var [size, setsize] = React.useState("")
  return (
    <ScrollView>
      <SafeAreaView>
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

        <View style={{marginLeft: 50, marginRight: 50}}>
          <ImageBackground
            source={{uri: route.params.item.imageurl}}
            style={{
              height: 550,
              width: 350,
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity>
              <Ionicons
                name="arrow-back-outline"
                style={{marginTop: 5, marginLeft: 9}}
                size={30}
                color="red"
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              paddingLeft: 12,
              paddingTop: 5,
              fontWeight: 'bold',
            }}>
            {route.params.item.Name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 8}}>
          <Text
            style={{
              fontSize: 20,
              paddingLeft: 12,
              paddingTop: 5,
              fontWeight: 'bold',
            }}>
            PKR: {route.params.item.Price}
          </Text>
          <TouchableOpacity style={{marginLeft: 150}}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: `${route.params.item.Color}`,
                marginLeft: 4,
                borderRadius: 20,
                marginTop: 5,
              }}></View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: 'black',
                marginLeft: 6,
                borderRadius: 20,
                marginTop: 5,
              }}></View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            marginLeft: 10,
          }}>
          <TouchableOpacity
           onPress={()=>{
            setsize("XS")
          }}
            style={{
              backgroundColor: 'grey',
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
              XS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>{
            setsize("S")
          }}
            style={{
              backgroundColor: 'grey',
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
              S
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
           onPress={()=>{
            setsize("M")
          }}
            style={{
              backgroundColor: 'grey',
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
              M
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
           onPress={()=>{
            setsize("L")
          }}
            style={{
              backgroundColor: 'grey',
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
              L
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
           onPress={()=>{
            setsize("XL")
          }}
            style={{
              backgroundColor: 'grey',
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
              XL
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={()=>{
            setcart(prev=>[...prev,route.params.item])
            console.log(cart)
          }}
          disabled={size===""}
          style={{
            backgroundColor: 'red',
            margin: 10,
            marginTop: 30,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            ADD TO CART
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cart', {
              cart: cart,
              Size: size
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
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            BUY NOW
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{fontSize: 20, marginLeft: 10, marginTop: 5}}>
            *Deliveries and Return
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
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