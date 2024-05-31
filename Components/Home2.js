import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
var arr = []
function footer (){
  return(
    <View style={{margin:20}}></View>
  )
}
import {auth, db, get, child} from '../firebase';
import {ref, set} from 'firebase/database';
export default function Home2({navigation,route}) {
  React.useEffect(()=>{
    const dbRef = ref(db)
    get(child(dbRef,('products'))).then((snapshot) => {
        if (snapshot.exists()) {
          if(route.params.Gender == null && route.params.Category == null){
            snapshot.forEach(snapshot => {
                const obj = {...snapshot.val(),key:snapshot.key}
                setdata(prev=>[...prev,obj]) 
            })
          }
          else if(route.params.Gender != null && route.params.Category == null){
            snapshot.forEach(snapshot => {
              if(snapshot.val().Gender === route.params.Gender){
                const obj = {...snapshot.val(),key:snapshot.key}
                setdata(prev=>[...prev,obj]) 
              }

            })
          }
          else if(route.params.Category != null && route.params.Gender == null){
            snapshot.forEach(snapshot => {
              if(snapshot.val().Category === route.params.Category){
                const obj = {...snapshot.val(),key:snapshot.key}
                setdata(prev=>[...prev,obj]) 
              }

            })
          }


            /*if(route.params.Gender === "Men"){
              setgenderdata(()=>{
                for(const document of data){
                  if(document.Gender === "Men"){
                    arr.push(document)
                  }
                }
                return arr;
              })
            }else if(route.params.Gender === "Women"){
              setgenderdata(()=>{
                for(const document of data){
                  if(document.Gender === "Women"){
                    arr.push(document)
                  }
                }
                return arr;
              })
            }else{
              setgenderdata(()=>{
                for(const document of data){
                  if(document.Gender === "Kids"){
                    arr.push(document)
                  }
                }
                return arr;
              })
        
            }*/

        } else {
            console.log("No data available")
        }
    }).catch((error) => {
        console.error(error)
    })
    setTimeout(() => {
			setLoader(false);
		}, 3000);
}, []);
  const [data, setdata] = React.useState([]);
  const [loader, setLoader] = React.useState(true);

  let ArrayOfProductsObject = Object.values(data);

  const renderr = ({item}) => (
    <TouchableOpacity style={{margin:3}} onPress={()=>{
      navigation.navigate("productdetails", {
        item
      })
    }}>
      <View>
        <ImageBackground
          source={{uri: item.imageurl}}
          style={{height: 250, width: 165}}>
          <Ionicons
            name="add"
            style={{alignSelf: 'flex-end', marginTop: 210}}
            size={35}
            color="red"
          />
        </ImageBackground>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.Name}</Text>
          <TouchableOpacity>
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: 'blue',
                marginLeft: 4,
                borderRadius: 20,
              }}></View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: 'black',
                marginLeft: 6,
                borderRadius: 20,
              }}></View>
          </TouchableOpacity>
        </View>
        <Text style={{marginTop: 5, fontSize: 15}}>
          Price: {item.Price} PKR
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <SafeAreaView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity >
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
            {loader? (
              <View>
              <ActivityIndicator size='large' color='blue' />
              <Text
                style={{
                  color: '#020D28',
                  alignSelf: 'center',
                  margin: 20,
                }}>
                Fetching Products...
              </Text>
            </View>
            ):(
              
              <FlatList
         keyExtractor={(item, index) => String(index)}
          style={{alignSelf: 'center',height:'90%'}}
          data={ArrayOfProductsObject}
          numColumns={2}
          ListFooterComponent={footer}
          renderItem={renderr}
        />
            )}
        
      </SafeAreaView>
    </View>
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
    marginRight:5
  },
  cart: {
    marginTop: 6,
    marginRight: 5
  },
});
