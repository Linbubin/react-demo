import React, { Component } from 'react';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      left: 10,
      top: 10,
      left_diff: 0,
      top_diff: 0,
      is_move: false
    }
  }

  onMouseMove = (e) => {
    if(this.state.is_move){
      const { left_diff, top_diff } = this.state;
      // 设置对应的left和top
      this.setState({left: e.screenX-left_diff, top: e.screenY-top_diff })
    }
  }

  onMouseDown = (e) => {
    // e.screenX 为 鼠标x轴位置
    // e.screenY 为 鼠标y轴位置
    const { left, top } = this.state;
    // 鼠标按下时，记录 left_diff --- [鼠标x轴位置- 所选目标初始left的位置]
    // 和top_diff --- 鼠标到边框顶部的距离
    // 边框为 所选目标边框
    this.setState({is_move: true, left_diff: e.screenX - left, top_diff: e.screenY - top})
    
  }

  onMouseUp = () => {
    // 不再移动
    this.setState({is_move: false})
  }

  onMouseLeave = () => {
    // 暂时把 鼠标离开被选区域 情况 直接让他停下来
    // 后续再修改
    this.onMouseUp();
  }

  render(){
    const {left, top} = this.state;
    return(
      <div style={{height: 1000, backgroundColor: 'gray', position: 'relative'}}>
        <div style={{height: 100, width: 100, position: 'absolute', left: left, top: top, backgroundColor: 'blue'}} onMouseLeave={this.onMouseLeave} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} onMouseDown={this.onMouseDown} ></div>
      </div>
    )
  }
}

export default App;