import React from 'react'
import MusicCard from '../components/music-card'
import Header from '../containers/header'
import BigButton from '../components/big-button'
import { Link } from 'react-router-dom'
import { find, propEq, head } from 'ramda'
import { connect } from 'react-redux'
import { SET_FAVORITE } from '../constants'

class Show extends React.Component {
  componentDidMount() {
    //console.log('favorites: ', this.props.favorites)
    //console.log('id value is: ', this.props.match.params.id)
    const findSongPredFunction = propEq('id', this.props.match.params.id)
    //console.log('favorites here', this.props.favorites)
    const foundSong = find(findSongPredFunction, this.props.favorites)
    //console.log('did i find the movie?   ', foundSong)
    this.props.dispatch({ type: SET_FAVORITE, payload: foundSong })
  }
  render() {
    //console.log('here are my props', this.props)
    return (
      <div>
        <Header />
        <main>
          <div className="mw6 center mt2 tc">
            <MusicCard
              image={this.props.favorite.poster}
              title={this.props.favorite.name}
            />
          </div>
          <div className="mw6 tc center">
            <a
              className="link ba br2 w4 pa2 center db mb3"
              href={this.props.favorite.href}
              target="_blank"
            >
              Play Album
            </a>
            <Link to="/"><BigButton>Return</BigButton></Link>
          </div>
        </main>
      </div>
    )
  }
}
const connector = connect(mapStateToProps)

// function testLog(logMe) {
//   return console.log(logMe)
// }
function mapStateToProps(state) {
  //console.log('this is my state', state)
  return {
    favorites: state.favorites,
    favorite: state.favorite
  }
}

export default connector(Show)
