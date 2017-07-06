import React from 'react'
import Header from '../containers/header'
import { Link } from 'react-router-dom'
import { ImageListItem, Button, List, TextField } from 'jrs-react-components'
import { map } from 'ramda'
import { connect } from 'react-redux'
import {
  SET_FAVORITE,
  CLEAR_RESULTS,
  SET_SEARCH_TEXT,
  SET_SEARCH_RESULTS
} from '../constants'

const Search = props => {
  const songListItem = result => {
    console.log(result)
    return (
      <ImageListItem
        key={result.id}
        id={result.id}
        title={result.name}
        image={result.poster}
        link={
          <Button onClick={props.selectSong(props.history, result)}>
            Select
          </Button>
        }
      />
    )
  }

  return (
    <div>
      <Header />
      <main>
        <div className="mw6 center mt2 tc">
          <h2>Search</h2>
          <form className="ph2 tl" onSubmit={props.handleSubmit}>
            <TextField
              label="Search"
              value={props.searchText}
              onChange={props.handleChange}
            />
            <div>
              <Button>Search</Button>
            </div>
          </form>
          <List>

            {map(songListItem, props.searchResults)}
          </List>
        </div>
      </main>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    searchText: state.search.searchText,
    searchResults: state.search.searchResults
  }
}

function mapActionsToProps(dispatch) {
  return {
    selectSong: (history, song) => event => {
      const fav = {
        title: song.name,
        poster: song.poster,
        songId: song.id
      }
      console.log('THIS IS MY FAV', fav)
      dispatch({ type: SET_FAVORITE, payload: fav })
      dispatch({ type: CLEAR_RESULTS })
      history.push('/new')
    },
    handleSubmit: event => {
      event.preventDefault()

      dispatch(searchMusic)
    },
    handleChange: event => {
      dispatch({ type: SET_SEARCH_TEXT, payload: event.target.value })
    }
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

function searchMusic(dispatch, getState) {
  const searchText = getState().search.searchText
  fetch(`https://music-search.jrs.camp/?q=${searchText}`, {
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqcnMuY2FtcCIsImlhdCI6MTQ5ODg2OTM0MiwiZXhwIjoxNTkzNTYzNzQyLCJhdWQiOiJtdXNpYy1zZWFyY2guanJzLmNhbXAiLCJzdWIiOiIxMjM0In0.XtmiG7OD3pGdS748IC4CRJp_qUa7A_JvtNu2G_GcIP8'
    }
  })
    .then(res => res.json())
    .then(function stuff(songSearchResults) {
      //console.log('myresults2---', songSearchResults)
      return dispatch({
        type: SET_SEARCH_RESULTS,
        payload: songSearchResults
      })
    })
}

export default connector(Search)
