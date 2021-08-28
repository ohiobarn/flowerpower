<template>
  <div>
    <p></p>
    <h3>Forecast availability</h3>
    <p></p>
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col"></th>
          <th scope="col">SKU</th>
          <th scope="col">Crop</th>
          <th scope="col">Variety</th>
          <th scope="col">This Week</th>
          <th scope="col">Next Week</th>
          <th scope="col">Future Week</th>
          <th scope="col"><i>spb</i></th>
        </tr>
      </thead>
      <tr v-for="rec in forecastRecords" :key="rec.RecID">
        <td v-if="!rec.Image || !rec.Image.length"></td>
        <td v-else><img :src="rec.Image[0].thumbnails.small.url"></td>
        <td>{{ rec['SKU #'] }}</td>
        <td>{{ rec.Crop}}</td>
        <td>{{ rec.Variety}}</td>
        <td>{{ rec['This Week']}}</td>
        <td>{{ rec['Next Week']}}</td>
        <td>{{ rec.Future}}</td>
        <td>{{ rec['Stems per Bunch'] }}</td>
      </tr>
    </table>
    <small><i>Record count: {{ forecastRecords.length }}</i></small>
  </div>
</template>

<script>
export default {
  data(){
    return {
      forecastRecords: []
    }
  },

  mounted(){

    const done = (err) => {
      if (err) { console.error(err); return; }
    }

    const page = (records, fetchNextPage) => {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            var rec = record.fields
            recs.push(rec)
            // this.forecastRecords.push(rec)
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    }

    //
    // Array to hold query records
    //
    var recs = []

    var Airtable = require('airtable');
    var airConf = {
        endpointUrl: 'https://api.airtable.com',
        apiKey: this.$auth.user['https://app.madriverfloralcollective.com/airtable'] 
    }
    Airtable.configure(airConf);
    var base = Airtable.base('apptDZu7d1mrDMIFp'); //MRFC
    var selConf = {
        // maxRecords: 999,
        pageSize: 100,
        view: "MRFC Grid Public"
    }
    base('Forecast (MRFC)').select(selConf).eachPage(page,done);

    //
    // Populate data
    //
    this.forecastRecords = recs

  }

}
</script>

<style scoped>

    
</style>

<!-- 

Sample Record

{
    "Crop": "Ageratum",
    "Availability Months": [
        "July",
        "August",
        "September",
        "October"
    ],
    "Grower": "GRF",
    "Category": "Flower",
    "Image": [
        {
            "id": "attCYZnDZawjjFu6m",
            "width": 272,
            "height": 240,
            "url": "https://dl.airtable.com/.attachments/31643b93901912bfcb172330e3747333/f50dce71/AgeratumBlueHorizon.JPG",
            "filename": "AgeratumBlueHorizon.JPG",
            "size": 27386,
            "type": "image/jpeg",
            "thumbnails": {
                "small": {
                    "url": "https://dl.airtable.com/.attachmentThumbnails/cd848c8f06fba37a8166f9161714a342/7946ae66",
                    "width": 41,
                    "height": 36
                },
                "large": {
                    "url": "https://dl.airtable.com/.attachmentThumbnails/cf150ef80a0658370275997c119b055b/cdc39b75",
                    "width": 272,
                    "height": 240
                },
                "full": {
                    "url": "https://dl.airtable.com/.attachmentThumbnails/96d3a2afa5859d3c5d30fc4c8c7a23d6/5056c6c1",
                    "width": 3000,
                    "height": 3000
                }
            }
        }
    ],
    "This Week": 3,
    "Next Week": 10,
    "Future": 10,
    "Stems per Bunch": 5,
    "Variety": "Blue Horizon",
    "SKU": "AGE-BLUHZ",
    "Shop Description": "Tall, upright, sturdy stems. Very similar to Tall Blue Planet. This classic filler adds texture and interest to bouquets and also attracts bees and butterflies to the garden. The tight blue flower clusters are 1 1/2-3\" across and are long-lasting for bouquets. Ageratum is also known as flossflower or blue mink",
    "Color": "Blue",
    "Tier": "1",
    "Price per Bunch": "3.50",
    "SKU #": "AGE-BLUHZ",
    "This week | Next week | Future": "3 | 10 | 10 (@5 spb)",
    "Buy now": {
        "label": "Buy now",
        "url": "https://ohiobarnflowerfarm.com/mrfc/p/age-bluhz"
    },
    "Preorder": {
        "label": "Preorder",
        "url": "https://airtable.com/shrb8jaLEpA886b4i?prefill_SKU=AGE-BLUHZ"
    }
}
-->