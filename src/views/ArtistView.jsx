import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

// components
import GroupedListView from 'listView/GroupedListView';
import LoadingIndicator from 'LoadingIndicator';

// mui
import Divider from 'material-ui/Divider';

// actions
import * as actions from 'actions/playerActions';

export class ArtistView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            error: false,
            errorMsg: '',
            loading: true
        };
    }

    componentDidMount = () => {
        if(this.state.loading) {
            this.loadArtistData();
        }
    }

    loadArtistData = () => {
        const id = this.props.match.params.id || 1;
        const URL = 'http://localhost:8080/artists/' + id;
        axios.get(URL).then((response) => {
            let mappedData = this.mapData(response.data);
            this.setState({error:false, errorMsg:'', loading:false, data:mappedData});
        }).catch((error) => {
            if(error.response) {
                this.setState({error:true, errorMsg:error.response.status, loading:false, data:[]});
            } else if(error.request) {
                this.setState({error:true, errorMsg:'no response', loading:false, data:[]});
            } else {
                this.setState({error:true, errorMsg:'request error', loading:false, data:[]});
            }
        });
    }

    songClickHandler = (group, index) => {
        this.props.dispatch(actions.setSongs(this.state.data.groups[group].items, index));
    }

    mapData = (data) => {
        let mappedData = {};
        mappedData.artistName = data.artistName; 
        mappedData.groups = [];
        data.albums.forEach((album, index) => {
            let grp = {};
            let grpIndex = index;
            grp.groupTitle = album.albumTitle;
            grp.items = [];
            album.songs.forEach((song, index) => {
               grp.items.push({
                   avatar: song.cover_url != '' ? 'http://localhost:8080' + song.cover_url : 'default',
                   primaryText: song.title,
                   clickHandler: (e) => { 
                        e.preventDefault();
                        this.songClickHandler(grpIndex, index);
                   },
                   menu: [{text:'test', onClick: () => {console.log('menu click')}}],
                   songId: song.songId
               }); 
            });
           mappedData.groups.push(grp); 
        });
        return mappedData;
    }

    getRender = () => {
        if(this.state.loading) {
            return (<LoadingIndicator isLoading={true}></LoadingIndicator>)
        }
        else if(this.state.error) {
            return (<h2>Oops, something went wrong!<br/>{this.state.errorMsg}</h2>);
        }
        else {
            return (<div>
                <h2>{this.state.data.artistName}</h2>
                <Divider></Divider>
                <GroupedListView groups={this.state.data.groups}></GroupedListView>
            </div>);
        }
    }

    render = () => {
        const renderTarget = this.getRender();
        return renderTarget;
    }
};

export default connect()(ArtistView);