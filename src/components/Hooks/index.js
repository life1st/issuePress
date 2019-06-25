import React, {Component, useState} from 'react'
import Child from './Child'
import css from './index.scss'
import data from './data.json'
const groups_data = data.feed[3]
groups_data.groups = [
  ...groups_data.groups,
  ...groups_data.groups,
  ...groups_data.groups,
  ...groups_data.groups,
].map(item => ({
  ...item,
  avatar: 'https://avatars1.githubusercontent.com/u/9943604?v=4'
}))
export default class RHook extends Component {
  state = {
    data: null,
    joinedGroup: []
  }

  componentDidMount() {
    
    console.log(groups_data)
    this.setState({
      data: groups_data
    })

  }

  handleJoin = (group) => {
    this.setState({
      joinedGroup: [
        ...this.state.joinedGroup,
        group
      ]
    })
  }
  render() {
    const {data, joinedGroup} = this.state
    if (!data) {
      return (
        <div>Loading~~~</div>
      )
    }

    const {groups} = data
    return (
      <div className={css.containor}>
        {
          groups.map((item, i) => (
            <Child 
              key={i} 
              to={true}
              data={item} 
              onJoin={this.handleJoin}/>
          ))
        }
        <div className={css.joinCount} ref={ref => {
          this.joinCountEl = ref
        }}>
          <p>Joined:</p>
          {
            joinedGroup.length > 0 && (
              <ul className={css.groupAvatars}>
              {
                joinedGroup.map((group, i) => {
                  return i < 3 ? (
                    <li key={i} className={css.avatarItem}>
                      <img src={group.avatar} alt=""/>
                    </li>
                  ) : (
                    null
                  )
                })
              }
              </ul>
            )
          }
        </div>
      </div>
    )
  }
}

// 放弃 不能这么用.