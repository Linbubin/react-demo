import React, { Component } from 'react';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      right: 10,
      top: 10,
      right_diff: 0,
      top_diff: 0,
      is_move: false
    }
  }

  onMouseMove = (e) => {
    if(this.state.is_move){
      const { right_diff, top_diff } = this.state;
      // 设置对应的right和top
      this.setState({right: right_diff - e.screenX, top: e.screenY-top_diff })
    }
  }

  onMouseDown = (e) => {
    // e.screenX 为 鼠标x轴位置
    // e.screenY 为 鼠标y轴位置
    const { right, top } = this.state;
    // 鼠标按下时，记录 right_diff --- [总宽度 = 鼠标到屏幕左边框 + 所选目标右边框到屏幕有边框的距离 (+ 拖动过程中一直不变的 鼠标位置到所选目标右边框距离)]
    // （）括号中包围的并未计算，因为拖动过程中不会变化
    
    // top_diff --- 鼠标到所选目标边框顶部的距离
    this.setState({is_move: true, right_diff: e.screenX + right, top_diff: e.screenY - top})
    
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
    const {right, top} = this.state;
    return(
      <div style={{height: 1000, backgroundColor: 'gray', position: 'relative'}}>
        <div style={{height: 100, width: 100, position: 'absolute', right: right, top: top, backgroundColor: 'blue'}} onMouseLeave={this.onMouseLeave} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} onMouseDown={this.onMouseDown} ></div>
      </div>
    )
  }
}

export default App;