<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    Hours -->
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Flight Data',
      hours : null,
    }
  },
  methods : {
    fetch_flight_data :async  function  () {
      const Flight = Parse.Object.extend('Flight');
      const flight = new Parse.Query(Flight);

       console.log(flight)
       
      // flight.get("Lb9g8GHEQy")
      // .then((result) => {
      // console.log(result)
      // }, (error) => {
      //   console.log(error)
      // });
      flight.equalTo("nightTime",0)
      const results = await flight.find();
      console.log(results)

    }
  },
  mounted(){
    this.fetch_flight_data();
  }
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
