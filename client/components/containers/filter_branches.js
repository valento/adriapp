import React from 'react'
import { connect } from 'react-redux'
import Branch from '../ui/branch'
import { setBranchLocation } from '../../actions/'

const mapDispatchToProps = (dispatch) => {
  return {
    onChange(e){
      e.preventDefault()
      dispatch()
    }
  }
}

const mapStateToProps = state => {
  return {
    branch: state.settings.branch
  }
}

const FilterBranches = connect(
  mapStateToProps,
  { setBranchLocation }
)(Branch)

export default FilterBranches
