import React from "react";

import HeaderBar from "../../commons/HeaderBar";
import TruckHeader from "../food_page/TruckHeader";
import { Typography, DatePicker, TimePicker, Form, Card, Input, Button, Modal, Alert, notification, Result } from 'antd';
import moment from 'moment';

const { Title } = Typography;
class Schedule extends React.Component {
  state = {
    userName: "David Liu",
    truck: {
      name: "Ideal Catering",
      rate: "5.0",
      location: "Bahen Centre for Information Technology",
      foodType: "• American • Fast Food • Hot Dogs",
      serveTime: "9:00 AM - 9:00 PM"
    },
    drawerVisible: false,
    foodList: this.props.history.location.state && this.props.history.location.state.foodList || [],
    pickupTime: null,
    pickupDate: null,
    result: false
  };

  componentDidMount() {
    console.log(this.props.history)
  }

  get cartFoodPrice() {
    let foodPrice = 0
    this.state.foodList.forEach(category => {
      category.foods.forEach(food => {
        if (food.num) {
          foodPrice = foodPrice + food.num * food.price.slice(1)
        }
      })
    })
    return foodPrice
  }

  get cartFoodNum() {
    let foodNum = 0
    this.state.foodList.forEach(category => {
      category.foods.forEach(food => {
        if (food.num) {
          foodNum = foodNum + food.num
        }
      })
    })
    return foodNum
  }

  backToCart() {
    this.props.history.goBack()
  }

  setDate(pickupDate) {
    this.setState({
      pickupDate: pickupDate
    })
  }

  setTime(pickupTime) {
    this.setState({
      pickupTime: pickupTime
    })
  }

  pickup() {
    if (this.state.pickupDate && this.state.pickupTime) {
      this.setState({
        result: true
      })
    } else {
      notification.config({
        placement: 'bottomRight',
      });
      notification.open({
        message: 'Tips',
        description:
          'Please choose a pick-up time.',
      });
    }
  }
  render() {
    return (
      <div>
        {
          !this.state.result &&
          <>
            <HeaderBar title="UofT Eats" username={this.state.userName} />

            <TruckHeader
              cartFoodNum={this.cartFoodNum}
              truckName={this.state.truck.name}
              rate={this.state.truck.rate}
              location={this.state.truck.location}
              foodType={this.state.truck.foodType}
              serveTime={this.state.truck.serveTime}
              showCartDrawer={() => this.showCartDrawer()}
            />
            <br></br>
            <Title level={2} style={{ paddingLeft: 20 }}>{this.state.userName}</Title>

            <Card title={`Items (${this.cartFoodNum})`} extra={<a onClick={() => this.backToCart()} style={{ color: '#1890ff' }}>Add Items</a>} style={{ margin: 20 }}>
              {this.state.foodList.map(category => {
                if (category.foods.find(food => {
                  return food.num
                })) {
                  return (
                    <>
                      <Card title={category.category} key={category.category} hoverable>
                        {category.foods.map(food => {
                          if (food.num) {
                            return <p key={food.id}>{food.name} * {food.num}</p>
                          } else {
                            return null
                          }
                        })}
                      </Card>
                      <br></br>
                    </>
                  )
                } else {
                  return null
                }
              })}
              <hr></hr>
              <Title level={4} style={{ paddingLeft: 20 }}>Total： ${this.cartFoodPrice.toFixed(2)}</Title>
            </Card>
            <Card title={`Schedule Pickup Time`} style={{ margin: 20 }}>

              <Form layout='vertical'>
                <Form.Item label="Date">
                  <DatePicker value={this.state.pickupDate} onChange={(value) => this.setDate(value)} />
                </Form.Item>
                <Form.Item label="Time">
                  <TimePicker value={this.state.pickupTime} onChange={(value) => this.setTime(value)} format="HH:mm" />
                </Form.Item>
                <Form.Item>
                  <Input placeholder="Leave a note for the food truck" />
                </Form.Item>
                <Button type="primary" onClick={() => this.pickup()}>Schedule Pickup</Button>
              </Form>
            </Card>
          </>
        }
        {
          this.state.result &&
          <Result
            status="success"
            title="Your pickup was successfully scheduled!"
            subTitle={`Date:${moment(this.state.pickupDate).format('YYYY/MM/DD')} Time:${moment(this.state.pickupTime, 'HH:mm').format('HH:mm')}`}
            extra={[
              <Button type="primary" key="console" onClick={() => {
                this.props.history.push('/')
              }}>
                Back to Home Page
              </Button>
            ]}
          />
        }
      </div>
    );
  }
}

export default Schedule;