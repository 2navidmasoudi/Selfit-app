import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {putCheckToken} from '../services';
import Video from 'react-native-video';
import Status from "./status";
import SplashVideo from '../assets/1.mp4';

class Splash extends Component {
    state = {
        tokenChecked: false,
    };

    componentDidMount(){
        if (this.props.rehydrated === true) {
            this.checkUserLogin()
                .then(status => {
                    if (status) {
                        this.setState({tokenChecked: true});
                    } else {
                        this.setState({tokenChecked: false});
                    }
                });
        }
    };

    render() {

        return (
            <Container style={{backgroundColor: 'white'}}>
                <Status/>
                <Video
                    resizeMode="cover"
                    source={SplashVideo}
                    onEnd={this.leadToScreen.bind(this)}
                    style={styles2.backgroundVideo}/>
                {/*<Image style={styles.LogoStyle} source={WelcomePage}/>*/}
                {/*<Text style={styles.welcome}>SelFit</Text>*/}
                {/*<Spinner color='red'/>*/}
                {/*<Image style={styles.fitnessGirl} source={AboutApp}/>*/}
            </Container>

        )
    }

    leadToScreen() {
        if (this.state.tokenChecked) {
            Actions.reset('root');
        } else {
            Actions.reset('sign');
        }
    }

    async checkUserLogin() {
        try {
            let {tokenmember} = await this.props.user;
            return tokenmember === (null || undefined)
                ? false
                : await this.checkUserLoginFromApi()
        } catch (error) {
            console.log(error);
        }
    }

    async checkUserLoginFromApi() {
        try {
            let {tokenmember, tokenapi} = await this.props.user;
            let json = await putCheckToken(tokenmember, tokenapi);
            return json === 1;
        } catch (error) {
            console.log(error);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        rehydrated: state.rehydrated
    }
};
const styles2 = StyleSheet.create({
    backgroundVideo: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'white'
        position: 'absolute',
        top: -50,
        left: -50,
        bottom: -50,
        right: -50,
    },
});
export default connect(mapStateToProps)(Splash);