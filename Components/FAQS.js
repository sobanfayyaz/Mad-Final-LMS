import * as React from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons'
export default function FAQS() {
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Ionicons
              style={{ marginLeft: 10, marginTop:2 }}
              name="menu"
              size={35}
              color="red"
            />
          </TouchableOpacity>
          <Text style={styles.fashionista}>Fashionista/FAQS</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Text style={styles.search}>SEARCH</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="cart" style={styles.cart} size={30} color="red" />
          </TouchableOpacity>
        </View>
        </View>

        <View
          style={{
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 'bold' }}>Are prices the same on the online store and at my local store?</Text>
          <Text style={{ fontSize:20, paddingLeft: 10 }}>Yes, but if there are any discrepencies between the prices that appear on the website and those marked on garment tags, the correct prices always the on the tag.</Text>
        </View>

        <View style={{ borderBottomWidth: 2, margin: 10 }}></View>
         <View
          style={{
            marginTop: 5,
            justifyContent: 'space-between',
          }}>
          <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 'bold' }}>Will you restock items that are marked as ‘SOLD OUT’?</Text>
          <Text style={{ fontSize: 20, paddingLeft: 10 }}>If an item is sold out, you can request that we notify you when it is back in stock. If it becomes available againwithin 15 days.</Text>
        </View>

        <View style={{ borderBottomWidth: 2, margin: 10 }}></View>

         <View
          style={{
            marginTop: 5,
            justifyContent: 'space-between',
          }}>
          <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 'bold' }}>Can i cancel my order?</Text>
          <Text style={{ fontSize: 20, paddingLeft: 10 }}>Yes only if the order is not dispatched yet. You can contact our customer service department to get your order canceled.</Text>
        </View>

        <View style={{ borderBottomWidth: 2, margin: 10 }}></View>

         <View
          style={{
            marginTop: 5,
            justifyContent: 'space-between',
          }}>
          <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 'bold' }}>How much shipping cost?</Text>
          <Text style={{ fontSize: 20, paddingLeft: 10 }}>PKR 150 will be charged on order value less than PKR 2000. We provide free shipping for orders valued above PKR 2000 within Pakistan.</Text>
        </View>

        <View style={{ borderBottomWidth: 2, margin: 10 }}></View>

         <View
          style={{
            marginTop: 5,
            justifyContent: 'space-between',
          }}>
          <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 'bold' }}>Do i have to pay for returns?</Text>
          <Text style={{ fontSize: 20, paddingLeft: 10 }}>In case you have recieved a wrong or damaged article, we will get your article picked and will bear the courier charges.</Text>
        </View>

        <View style={{ borderBottomWidth: 2, margin: 10 }}></View>

         <View
          style={{
            marginTop: 5,
            justifyContent: 'space-between',
          }}>
          <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 'bold' }}>How will my money be refunded?</Text>
          <Text style={{ fontSize: 20, paddingLeft: 10 }}>Once the return has been approved, you will recieve the amout via coupon or refund in your account.</Text>
        </View>
       
       <View style={{ borderBottomWidth: 2, margin: 10 }}></View>

        <View
          style={{
            marginTop: 5,
            justifyContent: 'space-between',
          }}>
          <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 'bold' }}>Do you refund the shipping costs if i return all the items in an order?</Text>
          <Text style={{ fontSize: 20, paddingLeft: 10 }}>No.</Text>
        </View>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fashionista: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginLeft:10,
    marginTop: 8,
  },
  search: {
    fontSize: 15,
    fontWeight: '',
    color: 'red',
   marginRight:10,
    marginTop: 15,
  },
  cart: {
    marginTop: 5,
    marginRight:10
  },
});