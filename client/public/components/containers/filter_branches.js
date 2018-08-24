import React from 'react'
import { connect } from 'react-redux'
import Branch from '../ui/branch'
import { setBranchLocation } from '../../actions/'

mapStateToProps = (state, ownProps) => {
  return {
    city: ownProps.branch
  }
}


mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      console.log('dispatch an action')
    }
  }
}

const FilterBranches = connect(
  null,//mapStateToProps,
  mapDispatchToProps
)(Branch)

export default FilterBranches
