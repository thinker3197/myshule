import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'

const roomTypes = [
  'Sound-proof room',
  'Cafeteria space',
  'Outdoor space',
  'Small classroom',
  'Large auditorium',
  'Meeting room'
];

const equipments = [
  'Projector',
  'Desks & Chairs',
  'Whiteboard',
  'Blackboard',
  'Computers'
]

const minDate = new Date()
const maxDate = new Date()

const numbers = [];
for (let i = 5; i < 100; i++ ) {
  numbers.push(<MenuItem value={i} key={i} primaryText={`${i} people`} />);
}

class LocationBookingContainer extends Component {
  state = {
    roomTypes: [],
    equipments: [],
    numberOfParticipants: 10,
    minDate: minDate,
    maxDate: maxDate
  }

  handleChangeEquipment = (e, i, values) => this.setState({ equipments: values })

  handleChangeRoomType = (e, i, values) => this.setState({ roomTypes: values })

  handleChangeNumber = (event, index, value) => this.setState({numberOfParticipants: value})

  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    })
  }

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    })
  }

  menuItems(values, items) {
    return items.map((item) => (
      <MenuItem
        key={item}
        insetChildren={true}
        checked={values && values.indexOf(item) > -1}
        value={item}
        primaryText={item}
      />
    ));
  }

  render() {
    return (
      <div>
        <NavBar title='Location Planning: Book a Space'/>
        <Paper style={{ width: '40%', marginLeft: 'auto', marginRight: 'auto', padding: 20, paddingTop: 50,  marginTop: 50 }}>
            <SelectField
              style={styles.centerField}
              multiple={true}
              hintText="Select a room type"
              value={this.state.roomTypes}
              onChange={this.handleChangeRoomType.bind(this)}
              name='roomTypes'
            >
            {this.menuItems(this.state.roomTypes, roomTypes)}
            </SelectField>
            <br />
            <SelectField
              style={styles.centerField}
              multiple={true}
              hintText="Select equipment needed"
              value={this.state.equipments}
              onChange={this.handleChangeEquipment.bind(this)}
              name='equipments'
            >
            {this.menuItems(this.state.equipments, equipments)}
          </SelectField>

          <SelectField
            style={styles.centerField}
            value={this.state.numberOfParticipants}
            onChange={this.handleChangeNumber}
            maxHeight={200}
          >
            {numbers}
        </SelectField>
        <DatePicker
          style={styles.centerField}
          onChange={this.handleChangeMinDate}
          floatingLabelText="Earliest Date"
          defaultDate={this.state.minDate}
        />
        <DatePicker
          style={styles.centerField}
          onChange={this.handleChangeMaxDate}
          floatingLabelText="Latest Date"
          defaultDate={this.state.maxDate}
        />

        <RaisedButton backgroundColor='#38c098' labelColor='#fff' style={Object.assign({}, styles.centerField, { marginTop: 40 } )} label='Search' />
      </Paper>
      </div>
    )
  }
}

const styles = {
  centerField: {
    display: 'inlineBlock',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%'
  }
}

export default LocationBookingContainer
