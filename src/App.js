import "./App.css";
import React, { Component } from "react";
import Button from "./components/Button";
import Slider from "rc-slider";
import moment from 'moment';
import {
  LineChart,
  Line,
  XAxis,
  ReferenceLine,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import config from "./constants";

const marks = {
  25: "Last 24h",
  45: "Last 7 days",
  65: "Last 14 days",
  85: "Last mounth",
  100: "Last year"
};



const getData = (k) => {
  const res = [];
  let date = moment();
  for (let i = 0; i < k/2; i++) {
    date = date.add(1,'day');
    console.log(date.format("ddd DD/MM/YYYY"));
    res.push({
      name: date.format("ddd DD/MM/YYYY"),
      calories: 200 + Math.ceil(Math.random() * 1000),
      fats: 200 + Math.ceil(Math.random() * 1000),
      carbonohidrates: 0 + Math.ceil(Math.random() * 1000),
      frozen: 200 + Math.ceil(Math.random() * 1000),
    });
  }
  return res;
};
const data = getData();

class App extends Component {
  state = {
    hidden: {},
    data: []
  };
  componentDidMount(){
    this.setState({
      data: getData(25)
    })
  }

  onSlideChange = (v)=>{
    console.log(v);
    this.setState({
      data: getData(v)
    })
  }
  toggle = key => () => {
    this.setState({
      hidden: {
        ...this.state.hidden,
        [key]: !this.state.hidden[key]
      }
    });
  };
  render() {
    return (
      <div>
        <div className="slider-container">
          <Slider min={25} marks={marks} step={null} onChange={this.onSlideChange} defaultValue={0} />
        </div>
        <div className="action-container">
          <Button
            onClick={this.toggle("calories")}
            inverted={this.state.hidden["calories"]}
            color={config.green}
          >
            Calories
          </Button>
          <Button
            onClick={this.toggle("carbonohidrates")}
            inverted={this.state.hidden["carbonohidrates"]}
            color={config.red}
          >
            Carbonohidradtes
          </Button>
          <Button
            inverted={this.state.hidden["frozen"]}
            color={config.yellow}
            onClick={this.toggle("frozen")}
          >
            Frozen
          </Button>
          <Button
            onClick={this.toggle("fats")}
            inverted={this.state.hidden["fats"]}
            color={config.blue}
          >
            Fats
          </Button>
        </div>
        <ResponsiveContainer width={"100%"} height={800}>
          <LineChart
            data={this.state.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" scale={"utcTime"} />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={250} stroke={config.blue} strokeWidth={2} />
            <ReferenceLine y={1000} stroke={config.red}  strokeWidth={2}/>
            <Legend />
            {!this.state.hidden.calories
              ? <Line
                  type="monotone"
                  strokeWidth={4}
                  dataKey="calories"
                  isAnimationActive={false}
                  stroke="green"
                />
              : <div />}
            {!this.state.hidden.frozen
              ? <Line
                  type="monotone"
                  strokeWidth={4}
                  dataKey="frozen"
                  isAnimationActive={false}
                  stroke={config.yellow}
                />
              : <div />}
            {!this.state.hidden.carbonohidrates
              ? <Line
                  type="monotone"
                  strokeWidth={4}
                  dataKey="carbonohidrates"
                  isAnimationActive={false}
                  stroke={config.red}
                />
              : <div />}
            {!this.state.hidden.fats
              ? <Line
                  type="monotone"
                  strokeWidth={4}
                  isAnimationActive={false}
                  dataKey="fats"
                  stroke={config.blue}
                />
              : <div />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default App;
