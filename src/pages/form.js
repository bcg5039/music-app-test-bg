import React from 'react'
import Header from '../containers/header'
import { Link } from 'react-router-dom'
import { TextField, Button } from 'jrs-react-components'
import BigButton from '../components/big-button'
import { connect } from 'react-redux'
import {
  SET_FAVORITE_RANK,
  SET_FAVORITE_POSTER,
  SET_FAVORITE_BAND,
  SET_FAVORITE_TITLE,
  APPEND_FAVORITE,
  CLEAR_FAVORITE
} from '../constants'

const Form = props =>
  <div>
    <Header />
    <main>
      <div className="mw6 pv2 ph3 center mt2">
        <div className="fr">
          <Link to="/search">
            <Button>Search</Button>
          </Link>
        </div>
        <h2>Add New Favorite</h2>
        <form onSubmit={props.handleSubmit(props.history)}>
          <TextField
            value={props.favorite.title}
            onChange={props.setTitle}
            label="Name"
            optional={false}
            help="Enter Album Name"
          />
          <TextField
            value={props.favorite.band}
            onChange={props.setBand}
            label="Band"
            optional={false}
            help="Enter Band Name"
          />
          <TextField
            value={props.favorite.poster}
            onChange={props.setPoster}
            label="Poster"
            optional={false}
            help="Enter Album Poster Link"
          />
          <TextField
            value={props.favorite.rank}
            onChange={props.setRank}
            label="Rank"
            optional={false}
            help="Enter Rank"
            width={20}
          />
          <div className="mt4 center tc">
            <BigButton>Create Favorite</BigButton>
          </div>
        </form>
      </div>
    </main>
  </div>

function mapStateToProps(state) {
  return {
    favorite: state.favorite
  }
}

const setFavorite = history => (dispatch, getState) => {
  const favorite = getState().favorite
  fetch(process.env.REACT_APP_API + '/favorites', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(favorite)
  })
    .then(response => response.json())
    .then(favorite => {
      dispatch({ type: APPEND_FAVORITE, payload: favorite })
    })

  dispatch({ type: CLEAR_FAVORITE })
  history.push('/')
}

function mapActionsToProps(dispatch) {
  return {
    setTitle: event =>
      dispatch({ type: SET_FAVORITE_TITLE, payload: event.target.value }),
    setBand: event =>
      dispatch({ type: SET_FAVORITE_BAND, payload: event.target.value }),
    setPoster: event =>
      dispatch({ type: SET_FAVORITE_POSTER, payload: event.target.value }),
    setRank: event =>
      dispatch({ type: SET_FAVORITE_RANK, payload: event.target.value }),
    handleSubmit: history => event => {
      event.preventDefault()
      dispatch(setFavorite(history))
    }
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Form)
