import React from 'react';

// util
import axios from 'axios';

// components
import LoadingIndicator from 'LoadingIndicator';
import ListView from 'listView/ListView';

// mui
import Divider from 'material-ui/Divider';

export class AlbumView extends React.Component {
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
            this.loadAlbumData();
        }
    }

    loadAlbumData = () => {
        const id = this.props.match.params.id || 1;
        const URL = 'http://localhost:8080/albums/' + id;
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

    mapData = (data) => {
        console.log(data);
        let mappedData = {};
        mappedData.title = data.albumTitle + ' by ' + data.artistName;
        mappedData.items = data.songs.map((song) => {
            return {
                primaryText: song.title,
                avatar: song.cover_url != '' ? 'http://localhost:8080' + song.cover_url : 'default',
                clickHandler: () => {console.log(song.songId)},
                menu: [{text:'test', onClick: () => {console.log('menu click')}}]
            };
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
                <h2>{this.state.data.title}</h2>
                <Divider></Divider>
                <ListView items={this.state.data.items}></ListView>
            </div>);
        }
    }

    render = () => {
        console.log(this.state.data);
        const renderTarget = this.getRender();
        return renderTarget;
    }
};

export default AlbumView;
