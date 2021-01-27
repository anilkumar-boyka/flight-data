<template>
  <div class="hello">
    Enter email:
    <input type="email" v-model="email">
    Enter password:
    <input type="password" v-model="password">
    <button @click="login">Login</button>

    <div v-if="error_display">{{error_display}}</div>
    <div v-if="valid_email">
      <h1>Logged In as: {{email}}</h1>
      <h2>{{ msg }}</h2>

      <div>
        <div>Flights -->{{flight}}</div>
        <div>Total Hours -->{{total_hours}}</div>
        <div>Aircrafts -->{{aircrafts}}</div>
        <div>Take Offs -->{{take_offs}}</div>
        <div>Landings -->{{landings}}</div>
        <div>Airports-->{{airports}}</div>
      </div>

     <span v-if="this.whole_flight_data">
       <div v-for="(l,i) in last_days" :key="i">
        last {{l}} days -->{{get_time_data_according_to_dates(l)}}</div>
     </span> 

    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Flight Data',
      flight : null,
     // total_hours : null,
      aircrafts : null,
      take_offs : null,
      landings :null,
      airports : null,
      total_hours : null,
      email : '',
      password : '',
      valid_email : false,
      error_display : '',
      whole_flight_data : null,
      last_days:[7,30,90,183,365]

    }
  },
  methods : {
    fetch_flight_data :  async function() {
       
      let takeOffs,landings,airports,aircrafts;;
     
      const Flight = Parse.Object.extend('Flight');
      const flightQuery = new Parse.Query(Flight);
      
      flightQuery.withCount();
      //flights
      const results1 = await flightQuery.find();
      this.flight = results1.count;
      flightQuery.limit(results1.count)
      const results2 = await flightQuery.find();
      this.whole_flight_data = results2.results;

      // //total hours
      this.total_hours = (results2.results.reduce((currentTotal,element)=>{
        return element.attributes.blockTime + currentTotal;
      },0))/60;

      //aircrafts
      aircrafts=results2.results.map(item=>{
        return item.attributes.aircraftRegistration
      })
      this.aircrafts = [...new Set(aircrafts)].length;

      //Take offs
      takeOffs=results2.results.filter(item =>{
        return item.attributes.pfTakeoff ===true;
      })
      this.take_offs =takeOffs.length;

      // landings
      landings=results2.results.filter(item =>{
        return item.attributes.pfLanding ===true;
      })
      this.landings =landings.length;
     
      //airports

      airports=results2.results.map(item=>{
        return item.attributes.departure;
      })
      this.airports= [...new Set(airports)].length;
    },
    get_time_data_according_to_dates : function (days) {
     
      let date = new Date();
      let last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
      last = last.getTime();

      let time = this.whole_flight_data.filter(item =>{
      var x= item.attributes.flightDate.getTime();
      return last < x
      }) 
      let last_days_time = (time.reduce((currentTotal,element)=>{
        return element.attributes.blockTime + currentTotal;
      },0)/60);
      return last_days_time;
     
    },
    login :function () {
      const vm=this;
      Parse.User.logIn(this.email,this.password).then(function(user) {
        vm.valid_email = true;
        vm.error_display = false;
        vm.fetch_flight_data();
        }).catch(function(error){
          vm.valid_email = false;
            vm.error_display = error.message
        });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
