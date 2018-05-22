// import React from 'react';
// import { View , Text , ImageBackground , TouchableOpacity , TextInput, AsyncStorage, Alert } from 'react-native';
// import BaseLightBox from './BaseLightBox';
// import { Input, Button , Item , Label  } from 'native-base';
// //styles
// import {SignStyle} from '../../assets/styles/sign';
// import { Actions } from 'react-native-router-flux';
// import { connect } from 'react-redux';
// import { setUser, setTokenmember } from '../../redux/actions';
// import { putCodeLogin } from '../../services';
// import { logError } from '../../services/log';
// import { postBuffetMaterial } from '../../services/orderMaterial';

// class addPercent extends React.Component {
//     constructor(){
//         super();
//         this.state={
//             Active:false,
//             Percent:''
//         }
//     }
//     async _postBuffetMaterial(food){
//         try {
//             const {Active,Percent} = await this.state;
//             const {tokenapi,tokenmember,buffetid} = await this.props;
//             let result = await postBuffetMaterial(food.idmaterial,buffetid,Active,Percent,tokenmember,tokenapi);
//             if (result === 1) {
//                 Alert.alert('ثبت غذا',`غذای ${food.namematerial} به منوی شما اضافه شد`,[{text:'باشه'}]);
//                 Actions.pop();
//             }
//         } catch (error) {
//             logError(error,'postBuffetMaterial','lightbox/addPercent','_postBuffetMaterial');
//         }
//     }
//     render(){
//         const {food} = this.props;
//         return(
//             <BaseLightBox verticalPercent={0.90} horizontalPercent={0.50}>
//                 <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
//                     <Text style={{flex:1,textAlign:'center',margin:5}}>اضافه کردن {food.namematerial} به سبد</Text>
//                     <Text style={{flex:1,textAlign:'center',margin:5}}>درصد اضافه شدن قیمت شما به این محصول را وارد کنید.</Text>
//                     <Item floatingLabel>
//                         <Label>درصد (10،15،20و...)</Label>
//                         <Input  
//                             style={{flex:1,margin:10}}
//                             onChangeText={(number)=>this.setState({Percent:number})}
//                             value={this.state.Percent}/>
//                     </Item>
//                     <Text style={{flex:1,textAlign:'center',margin:5}}>قیمت اولیه: {(food.pricematerial).toLocaleString('fa')}</Text>
//                     <Text style={{flex:1,textAlign:'center',margin:5}}>قیمت نهایی: {(food.pricematerial*(1+this.state.Percent/100)).toLocaleString('fa')}</Text>
//                     <Button success style={{flex:1,margin:5}} onPress={()=>this._postBuffetMaterial(food)}>
//                         <Text style={{flex:1,textAlign:'center'}}>اضافه به لیست!</Text>
//                     </Button>
                    
//                 </View>

//             </BaseLightBox>
//       )
//     }
// }
// const mapStateToProps = (state) => {
//     return {
//         user: state.user,
//         tokenmember: state.user.tokenmember,
//         tokenapi: state.buffet.tokenapi,
//         buffetid: state.buffet.buffetid,
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setTokenmember: user => dispatch(setTokenmember(user))
//     }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(addPercent);