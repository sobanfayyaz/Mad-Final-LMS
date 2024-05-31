import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Drawer({navigation}) {
  return (
    <SafeAreaView style={{ padding: 20 }}>
      <View style={{ justifyContent: 'space-between' }}>
        <View>
          <View
            style={{
              marginLeft: 20,
            }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home2', {
                  Gender : "Men"
                });
              }}>
                <Text style={{ fontSize: 30 }}>Men</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home2', {
                  Gender : "Women"
                });
              }}>
                <Text style={{ fontSize: 30 }}>Women</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home2', {
                  Gender : "Kids"
                });
              }}>
                <Text style={{ fontSize: 30 }}>Kids</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>
            New In
          </Text>
          <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 'bold' }}>
            Sale
          </Text>
          <Text style={{ color: 'red', padding: 10, fontSize: 20 }}>
            Bless Friday
          </Text>
          <Text style={{ fontWeight: 'bold', padding: 5, fontSize: 20,marginLeft:7 }}>
            Collections
          </Text>
          <View style={{ marginLeft: 20 }}>
            <TouchableOpacity onPress={() => {
              navigation.push('Home2', {
                Category : "Shirts"
              });
            }}>
              <Text style={{ fontSize: 20, padding: 2 }}>Shirts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.push('Home2', {
                Category : "Hoodies"
              });
            }}>
              <Text style={{ fontSize: 20, padding: 2 }}>Hoodies</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.push('Home2', {
                Category : "Coats"
              });
            }}>
              <Text style={{ fontSize: 20, padding: 2 }}>Coats</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.push('Home2', {
                Category : "T-Shirts"
              });
            }}>
              <Text style={{ fontSize: 20, padding: 2 }}>T-Shirts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.push('Home2', {
                Category : "Polo"
              });
            }}>
              <Text style={{ fontSize: 20, padding: 2 }}>Polo-Shirts</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => {
              navigation.push('Home2', {
                Category : "Jeans"
              });
            }}>
              <Text style={{ fontSize: 20, padding: 2 }}>Jeans</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.push('Home2', {
                Category : "Shoes"
              });
            }}>
              <Text style={{ fontSize: 20, padding: 2 }}>Shoes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.push('Home2', {
                Category : "Belts"
              });
            }}>
              <Text style={{ fontSize: 20, padding: 2 }}>Belts</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontWeight: 'bold', padding: 10, fontSize:20 }}>
            Track Your Order
          </Text>
          <Text onPress={()=>{navigation.navigate("FAQS")}} style={{ fontWeight: 'bold', padding: 10, fontSize:20 }}>FAQS?</Text>
        </View>
      </View>


      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginTop: 30,
        }}
      />
      
      <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            justifyContent: 'space-between',
          }}>
          <Text style={{ paddingLeft: 15, fontSize: 20 }}>CONTACT US?</Text>
          <Text style={{ fontSize: 20, paddingRight: 15 }}>FAQS</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:10}}>
        <TouchableOpacity><Ionicons
                name="logo-whatsapp"
                style={{ }}
                size={25}
                color="black"
              /></TouchableOpacity>
        <TouchableOpacity><Ionicons
                name="logo-facebook"
                style={{ }}
                size={25}
                color="black"
              /></TouchableOpacity>
        <TouchableOpacity><Ionicons
                name="logo-instagram"
                style={{ }}
                size={25}
                color="black"
              /></TouchableOpacity>
        <TouchableOpacity><Ionicons
                name="call"
                style={{ }}
                size={25}
                color="black"
              /></TouchableOpacity>
        
        </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
