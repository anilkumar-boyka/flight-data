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
    fetch_flight_data :  async function() {
      const Flight = Parse.Object.extend('SoccerPlayers');
      const User = Parse.Object.extend('User');
      const query = new Parse.Query(Flight);
      const userQuery = new Parse.Query(User);
      
      //console.log(query)

       //fetching soccerPlayers object
      query.get("CqcAONMbkH")
      .then((result) => {
      console.log(result)
      }, (error ) => {
        if(error.code === Parse.Error.OBJECT_NOT_FOUND)
        console.log('not found')
      });
      
      //fetching user data
      // query.equalTo("lastName",'ffecf382-7950-49cf-8e01-445ab6c1f5ec')
      userQuery.limit(10);
     const results = await userQuery.find({ useAppId: true });
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
