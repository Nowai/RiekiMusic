import React from 'react';

// components
import CardView from 'components/cardView/CardView';
import Card from 'components/cardView/Card';
import List from 'components/listView/List';
import ListElement from 'components/listView/ListElement';
import ListRow from 'components/listView/ListRow';
import ListRowCenter from 'components/listView/ListRowCenter';
import ListRowLeft from 'components/listView/ListRowLeft';
import ListRowRight from 'components/listView/ListRowRight';
import ListCover from 'components/listView/ListCover';
import PlayerSongWidget from 'components/PlayerSongWidget';
import ViewToggle from 'components/ViewToggle';
import ViewTitle from 'components/ViewTitle';

// mio
import IconButton from 'material-ui/IconButton';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import RaisedButton from 'material-ui/RaisedButton';

export class TestView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selection: 'cards'
        }
    }

    render = () => {
        return (
            <div>
                <CardView>
                    <Card primaryText='primtext longer text textasd asd asd' secondaryText='sectext long long john silver asdasd' imgsrc='https://placeimg.com/400/400/any'>
                    </Card>
                    <Card primaryText='primtext' secondaryText='sectext' imgsrc='https://placeimg.com/200/200/any'></Card>
                    <Card primaryText='primtext' secondaryText='sectext' imgsrc='https://placeimg.com/200/200/any'></Card>
                    <Card primaryText='primtext' secondaryText='sectext' imgsrc='https://placeimg.com/200/200/any'></Card>
                    <Card primaryText='primtext' secondaryText='sectext' imgsrc='https://placeimg.com/200/200/any'></Card>
                    <Card primaryText='primtext' secondaryText='sectext' imgsrc='https://placeimg.com/200/200/any'></Card>
                    <Card primaryText='primtext' secondaryText='sectext' imgsrc='https://placeimg.com/200/200/any'></Card>
                    <Card primaryText='primtext' secondaryText='sectext' imgsrc='https://placeimg.com/200/200/any'></Card>
                    <Card primaryText='primtext' secondaryText='sectext' imgsrc='https://placeimg.com/200/200/any'></Card>
                </CardView>
                <List>
                    <ListRow>
                        <ListRowLeft>
                            <ListCover src='https://placeimg.com/200/200/any'></ListCover>
                        </ListRowLeft>
                        <ListRowCenter>
                            <ListElement text='song title'/>
                            <ListElement text='artist name'/>
                            <ListElement text='album title'/>
                        </ListRowCenter>
                        <ListRowRight text='3:12'
                            isLikeable={true}
                            moreMenu={['test']}>
                        </ListRowRight>
                    </ListRow>
                    <ListRow>
                        <ListRowLeft>
                            <ListCover src='https://placeimg.com/200/200/any'></ListCover>
                        </ListRowLeft>
                        <ListRowCenter>
                            <ListElement text='song title'/>
                            <ListElement text='artist name'/>
                            <ListElement text='album title'/>
                        </ListRowCenter>
                        <ListRowRight text='1:53:32'
                            isLikeable={true}
                            moreMenu={[{text:'test'}, {text:'test 2'}]}>
                        </ListRowRight>
                    </ListRow>
                    <ListRow>
                        <ListRowLeft>
                            <ListCover src='https://placeimg.com/200/200/any'></ListCover>
                        </ListRowLeft>
                        <ListRowCenter>
                            <ListElement text='this is a cool title'/>
                            <ListElement text='what is this artist'/>
                            <ListElement text='cool album'/>
                        </ListRowCenter>
                        <ListRowRight text='1:23:45'
                            isLikeable={false}
                            >
                        </ListRowRight>
                    </ListRow>
                </List>
                <br/>
                <br/>
                <div className="view-title">Songs</div>
                <div className="card-header-wrapper">
                    <div className="card-header-card-wrapper">
                        <div className="list-card">
                            <div className="list-card-image" style={{backgroundImage: `url(https://placeimg.com/200/200/any)`}}></div>
                        </div> 
                    </div>
                    <div className="card-header-text-wrapper">
                        <div className="card-header-text-title">Title</div>
                        <div className="card-header-text-subtitle">
                            <p>by </p><div> Artist</div><p>  • 12 Songs</p>
                        </div>
                    </div>
                </div>
                <div className="list-parent">
                    <div className="list-child">
                        <div className="list-left">
                            1
                        </div>
                        <div className="list-center">
                            <div className="child-major-text">This is a title</div>
                            <div className="child-minor-text">Artistname</div>
                        </div>
                        <div className="list-right">
                            <div className="child">Heart</div>
                            <div className="child">3:23</div>
                            <div className="child">...</div> 
                        </div>
                    </div>
                    <div className="list-child">
                        <div className="list-left">
                            <img src={'http://localhost:8080/songs/cover/2345'} className={'child-cover'}/> 
                        </div>
                        <div className="list-center">
                            <div className="child-major-text">short</div>
                            <div className="child-minor-text">short</div>
                            <div className="child-minor-text">short</div>
                        </div>
                        <div className="list-right">
                            <div className="child">H</div>
                            <div className="child">133:23</div>
                            <div className="child">...</div> 
                        </div>
                    </div>
                    <div className="list-child">
                        <div className="list-left">
                            <img src={'http://localhost:8080/songs/cover/2345'} className={'child-cover'}/> 
                        </div>
                        <div className="list-center">
                            <div className="child-major-text">This is a longer title test with more</div>
                            <div className="child-minor-text">Artistname feat blabla</div>
                            <div className="child-minor-text">Albumname vol. 4</div>
                        </div>
                        <div className="list-right">
                            <div className="child">Heart</div>
                            <div className="child">13:23</div>
                            <div className="child">...</div> 
                        </div>
                    </div>
                    <div className="list-child">
                        <div className="list-left">
                            <img src={'http://localhost:8080/songs/cover/2345'} className={'child-cover'}/> 
                        </div>
                        <div className="list-center">
                            <div className="child-major-text">This is a title</div>
                            <div className="child-minor-text">Artistname a bit longer why not</div>
                            <div className="child-minor-text">Albumname also longer</div>
                        </div>
                        <div className="list-right">
                            <div className="child">Heart</div>
                            <div className="child">3:23</div>
                            <div className="child">...</div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TestView;