// import React, { Component } from 'react';
// import { Container,View, Text, Title ,Header,Left,
//     Right,Content, Button, Body , Icon,Subtitle, Row , Toast
// } from 'native-base';
// import { Actions } from 'react-native-router-flux';
// import { form , header , Grid} from '../../assets/styles/index';
// import { AsyncStorage , ImageBackground , Dimensions } from 'react-native';
// import MemberGrid from './grids/MemberGrid';
// import BuffetGrid from './grids/BuffetGrid';
// import GymGrid from './grids/GymGrid';
// import AppHeader from '../header';
// import { connect } from 'react-redux';
// import {putCheckToken} from '../../services';
// let window = Dimensions.get('window');
// class Home extends React.Component {
//     constructor(){
//         super();
//         this.state = {
//             viewComponent : <MemberGrid/>,
//             // viewComponent : <GymGrid/>,
//             // viewComponent : <BuffetGrid/>,
            
            
//         };
//     }
//     componentWillMount() {
//         //Check API Token for Member or Gym or Buffet Pannel
//         const {typememberid} = this.props.user;
//         if (typememberid===6||typememberid===1||typememberid===2||typememberid===3){
//             this.setState({viewComponent : <MemberGrid/>}); 
//         } else if (typememberid===5) {
//             this.setState({viewComponent : <BuffetGrid/>}); 
//         } else if (typememberid===4) {
//             this.setState({viewComponent : <GymGrid/>}); 
//         }
//         this._putCheckToken();
//     }    
//     render(){
//         const pannel=
//         //  this.props.user.typememberid === 1 ? 
//             <View style={{flex:4,justifyContent:'flex-end'}}>
//                     <View style={{justifyContent:'center',alignItems:'center'}}>
//                         <Text style={{textAlign:'center'}}>
//                             عوض کردن به حالت:
//                         </Text>
//                     </View>
//                     <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
//                             <View style={{flex:1,margin:2}}>
//                                 <Button full style={[form.submitButton , {marginTop : 5}]} onPress={()=>this.setState({viewComponent : <GymGrid/>})}>
//                                     <Text style={form.submitText}>باشگاه دار</Text>
//                                 </Button>
//                             </View>
//                             <View style={{flex:1,margin:2}}>
//                                 <Button full style={[form.submitButton , {marginTop : 5}]} onPress={()=>this.setState({viewComponent : <BuffetGrid/>})}>
//                                     <Text style={form.submitText}>بوفه دار</Text>
//                                 </Button>
//                             </View>
//                             <View style={{flex:1,margin:2}}>
//                                 <Button full style={[form.submitButton , {marginTop : 5}]} onPress={()=>this.setState({viewComponent : <MemberGrid/>})}>
//                                     <Text style={form.submitText}>ورزشکار</Text>
//                                 </Button>
//                             </View>
//                     </View>
//             {this.state.viewComponent}
//             </View>
//             // :
//             // <View style={{flex:2,justifyContent:'flex-end'}}>
//             //     {this.state.viewComponent}
//             // </View>
//         return(
//         <Container>
//              <AppHeader rightTitle="خانه"/>
//              <View style={{flex:1, padding:10}}>
//                 <View style={{flex:2}}>
//                     {/* <Button full style={[form.submitButton , {marginTop : 5}]} onPress={()=> Toast.show({
//                             text: 'نمایش باشگاه!',
//                             position:'top'
//                         })}>
//                         <Text style={form.submitText}>نمایش تمام باشگاه ها</Text>
//                     </Button> */}
//                     <Button full success
//                     // style={[form.submitButton , {marginTop : 5}]} 
//                     onPress={()=>Actions.fullMap()}
//                     >
//                     <Text style={form.submitText}>نمایش تمام باشگاه ها</Text>
//                     </Button>
//                 </View>
//                 <ImageBackground style={{flex:2,
//                         width : null ,
//                         height : null ,
//                         justifyContent:'center' ,
//                         alignItems: 'center'}} 
//                   imageStyle={{borderRadius : 5}} 
//                   source={{uri:'http://cakta.com/data/out/142/403722672-work-wallpapers.jpg'}} 
//                 >

//                     {/* <View style={Grid.IconView} >
//                         <Icon name={iconName} style={Grid.IconStyle} onPress={onPress}/>
//                     </View>
//                     <View style={Grid.TextView} >
//                         <Text style={Grid.TextStyle} onPress={onPress}>{title}</Text>
//                     </View> */}

//                 </ImageBackground>
//                 {/* <Image style={{flex:1,width:200,height:140}} source={require('../../assets/bg_home.jpg')} /> */}
//                 {pannel}
//             </View>
//             </Container>
//         )
//     }

//     async _putCheckToken(){
//         let {tokenmember , tokenapi} = await this.props.user;
//         await putCheckToken(tokenmember,tokenapi);
//     }

// }

// const mapStateToProps = (state) => {
//     return {
//         user: state.user,
//     }
// }

// export default connect(mapStateToProps,null)(Home);