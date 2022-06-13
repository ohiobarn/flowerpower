<template>
  <div class="container-fluid p-3">
    <div class="row justify-content-center">
      <div class="col-lg-6 p-0 d-flex flex-column align-items-start">
        <h3>Order No. {{ order.OrderNo }}</h3>
        <form>
          <hr />
          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label for="ClientJobName">Client/Job Name</label>
                <input type="text" v-model="order['Client/Job']" class="form-control" id="ClientJobName" placeholder="For example, The Johnson Wedding" />
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label for="TeamMemberName">Team Member Name</label>
                <input type="text" v-model="order['Team Member']" class="form-control" id="TeamMemberName" placeholder="For example, Karen" />
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col">
              <small class="form-text text-muted">
                When you need to contact us about this order it may be more convenient to use the client or job name rather than having to remember the order number. And if we need to reach out to
                you, please give us a contact name so we know who to ask for.
              </small>
            </div>
          </div>

          <div class="form-row">
            <div class="col">
              <p></p>
            </div>
          </div>

          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label for="DueDate">Due Date</label>
                <input type="text" v-model="order['Due Date']" class="form-control" id="DueDate" placeholder="mm/dd/yyyy" aria-describedby="DueDateHelp" />
                <small id="DueDateHelp" class="form-text text-muted">This is the pickup or delivery date the order.</small>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label for="Notes">Notes</label>
                <textarea v-model="order.Notes" class="form-control" id="Notes" rows="3"></textarea>
                <small id="NotesHelp" class="form-text text-muted">Please provide any notes that may be useful in fulfilling this order.</small>
              </div>
            </div>
          </div>

          <br />
          <h3 id="order-detail-header">Varieties</h3>

          <hr />

          <!-- prototype order detail layout -->
          <ul class="pl-0">
            <li v-for="(detail, index) in orderDetails" :key="index" :class="{ 'hide-item': Number(detail.Bunches) === 0 }">
              <div class="lineItem">
                <div class="top-row d-flex flex-row justify-content-between align-items-start">
                  <span class="lead">{{ detail.Crop }}</span>
                  <i class="color-dot fas fa-leaf" style="color: #f4c9c9"></i>
                </div>

                <div class="middle-row my-2 d-flex flex-row justify-content-center">
                  <span
                    ><strong> {{ detail.Variety }} </strong></span
                  >
                </div>

                <div class="d-flex flex-row justify-content-between align-items-center">
                  <div class="d-flex flex-column align-items center">
                    <p><small class="sku text-muted">SKU</small></p>
                    <p>
                      <small class="sku">{{ detail.SKU }}</small>
                    </p>
                  </div>

                  <div class="d-flex flex-column align-items center">
                    <p><small class="bunches text-muted">BUNCHES ({{ detail["Stems per Bunch"] }}/spb)</small></p>
                    <p>
                      <span class="bunches">
                        <select name="bunches" id="bunches" v-model="orderDetails[index].Bunches" v-on:change="onChangeQuantity">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                          <option value="21">21</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                          <option value="24">24</option>
                          <option value="24">24</option>
                        </select>

                        x ${{ detail["Price per Bunch"] }}</span
                      >
                    </p>
                  </div>

                  <div class="d-flex flex-column align-items center">
                    <p>
                      <small class="extended text-muted">EXTENDED</small>
                    </p>
                    <p>
                      <span class="extended">${{ detail.Extended }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <!--

            Search

          -->
<center>
  <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModal" @click="startSearch">
    Add Variety 
  </button>
</center>

<hr>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="exampleModalLabel">Add Variety</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <p>Select a variety from the list below. Specify filters to pare down this list</p>
          <div id="search-filter" class="px-2 py-2">
            <h5>Filters:</h5>
            <!-- Color Dots/Swatches -->
            <ul class="d-flex flex-row flex-wrap justify-content-between mb-1">
              <li v-for="swatch in colorOptions" :key="swatch">
                <input type="checkbox" :id="swatch" :value="swatch" class="mr-1" v-model="checkedColors" />
                <label for="swatch">
                  <i class="color-dot fas fa-seedling" :style="{ color: swatch }"></i>
                </label>
              </li>
            </ul>

            <!-- checkbox for select by category -->
            <div class="d-flex flex-row justify-content-between">
              <div>
                <input type="checkbox" id="dried" value="Dried" class="mr-1" v-model="checkedCategories" />
                <label for="dried">Dried</label>
              </div>
              <div>
                <input type="checkbox" id="flower" value="Flower" class="mr-1" v-model="checkedCategories" />
                <label for="flower">Flower</label>
              </div>
              <div>
                <input type="checkbox" id="filler" value="Filler" class="mr-1" v-model="checkedCategories" />
                <label for="flower" class="form-check-label">Filler</label>
              </div>
              <div>
                <input type="checkbox" id="foliage" value="Foliage" class="mr-1" v-model="checkedCategories" />
                <label for="flower">Foliage</label>
              </div>
            </div>

            <form class="search d-flex flex-row align-items-center" @submit.prevent="prevent()">
              <!-- SEARCH BAR -->
              <input id="searchBar" type="text" class="form-control" v-model="searchTerm" placeholder="Search by Crop/Variety" />

              <div id="priceFilter" class="d-flex flex-column align-items-center">
                <select name="price-range" id="price-range" v-model="priceRange">
                  <option value="2">$</option>
                  <option value="4">$$</option>
                  <option value="6" selected>$$$</option>
                </select>
              </div>
            </form>

            <hr />

            <!-- Search Results -->
            <div>
              <ul>
                <li v-for="(rec, i) in filteredForecast" :key="i" class="border border-secondary rounded my-2 px-1" :class="{'selected-li':true}" @click="addToOrder(rec)" >
                  <div>
                    <!-- toprow -->
                    <div class="d-flex flex-column align-items-start my-1">
                      <span class="">{{ rec.Crop }}</span>
                    </div>
                    <div class="d-flex flex-column align-items-center my-1">
                      <span class="font-weight-bold">{{ rec.Variety }}</span>
                    </div>

                    <!-- middle row -->
                    <div class="d-flex justify-content-between my-1 mx-1">
                      <table border="0" width="100%">
                        <tr>
                          <td width="50%">
                            <p>
                              <i class="color-dot fas fa-seedling" :style="{ color: rec.Color }"></i><small>({{ rec.Color }})</small>
                            </p>
                          </td>
                          <td width="25%">
                            <!-- <span class="badge badge-pill badge-primary" @click="clickColorBadge">{{rec.Color}}</span> -->
                            <span class="badge badge-pill badge-success" @click="clickCategoryBadge"> {{ rec.Category }}</span>
                          </td>
                          <td width="25%" style="text-align: right">
                            <span class="badge badge-pill badge-secondary" @click="clickDollarBadge">{{ toDollarSings(Number(rec.Tier)) }}</span>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- bottom row -->
                    <div class="d-flex justify-content-between my-1 mx-1">
                      <small class="text-muted">({{ rec["SKU #"] }}) {{ rec["Price per Bunch"] }}/bu @ {{ rec["Stems per Bunch"] }} spb</small>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Done</button>
      </div>
    </div>
  </div>
</div>

          <div class="form-row my-2">
            <div class="col d-flex flex-row justify-content-center">
              <button type="button" class="btn-primary-custom" v-on:click="saveOrder">
                Save Changes
              </button>
            </div>
            <div class="col d-flex flex-row justify-content-center">
              <router-link to="/order" class="btn btn-warning">Discard Changes</router-link>
            </div>
          </div>
        </form>

        <hr />
        <div
          class="
            lineItem
            d-flex
            flex-row
            justify-content-between
            align-items-center
          "
        >
          <span class="lead">Total: </span>
          <span class="fs-5">
            <strong>${{ runningTotal }}</strong></span
          >
        </div>

        <div v-if="showScrollUp" id="scroll-btn" @click.prevent="scrollUp">
          <i class="fas fa-chevron-up"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    RecID: String,
  },
  data() {
    return {
      orderTotal: 0,
      order: Object,
      orderDetails: [],
      forecastRecords: [],
      searchTerm: "",
      colorOptions: ["red", "orange", "yellow", "green", "blue", "indigo", "violet"],
      priceRange: null,
      checkedCategories: [],
      checkedColors: [],
      scrollToPoint: null,
      showScrollUp: false,
    };
  },

  methods: {
    clickCategoryBadge(event) {
      event.stopPropagation();
      let category = event.target.innerText;
      this.checkedCategories.push(category);
    },
    clickColorBadge(event) {
      event.stopPropagation();
      let color = event.target.innerText;
      this.checkedColors.push(color.toLowerCase());
    },
    clickDollarBadge(event) {
      event.stopPropagation();
      let dollars = event.target.innerText;

      switch (dollars) {
        case "$":
          this.priceRange = "2";
          break;
        case "$$":
          this.priceRange = "4";
          break;
        case "$$$":
          this.priceRange = "6";
          break;
        default:
          break;
      }
    },

    prevent() {
      // this is to prevent the search bar from refereshing the page by accident
      console.log("prevent refresh");
    },

    startSearch() {
      const getScrollPoint = () => {
        let searchFilter = document.getElementById("search-filter");
        this.scrollToPoint = searchFilter.offsetTop - 190;
      };

      setTimeout(getScrollPoint, 500); // gives page time to re-render before grabbing Y-value of element
    },

    resetSearch() {
      this.searchCriteria = [];
      this.checkedColors = [];
      this.checkedColors = [];
    },

    addToOrder(rec) {
      if (this.orderDetails.some((order) => order.SKU === rec.SKU)) {
        // This item is already part of your order, so do nothing an go back
        this.resetSearch();
      } else {
        rec.Bunches = 1;
        rec.Extended = Number(rec["Price per Bunch"]) * Number(rec.Bunches);
        rec.isNew = true;

        this.orderDetails.push(rec);
        this.resetSearch();
      }
    },

    onChangeQuantity() {
      this.refreshLines();
    },
    //
    // refresh line
    //
    refreshLines() {
      let orderTotal = 0;

      this.orderDetails.forEach((rec) => {
        if (Number(rec.Bunches) < 0) {
          rec.Bunches = 0;
        }

        // Extend the price
        let extended = Number(rec["Price per Bunch"]) * Number(rec.Bunches);

        rec.Extended = Number(extended).toFixed(2);

        orderTotal = orderTotal + extended;
      });

      this.orderTotal = Number(orderTotal).toFixed(2);
    },
    //
    // Save order to AirTable
    //
    saveOrder() {
      //
      // Save Order Detail to AirTable
      //
      const doDetail = () => {
        // Update Order Detail
        this.saveOrderDetail();

        // Go back to the Order List
        this.$router.push({ path: "/order" });
      };

      //
      // Done
      //
      const done = (err) => {
        if (err) {
          console.error(err);
          return;
        }
      };

      var Airtable = require("airtable");
      var atConf = {
        endpointUrl: "https://api.airtable.com",
        apiKey: this.$auth.user["https://app.madriverfloralcollective.com/airtable"],
      };

      Airtable.configure(atConf);
      var base = Airtable.base("apptDZu7d1mrDMIFp"); //MRFC

      var order = {
        Notes: this.order.Notes,
        Account: this.order.Account,
        "Client/Job": this.order["Client/Job"],
        "Team Member": this.order["Team Member"],
        "Due Date": this.order["Due Date"],
      };

      base("Order")
        .update(this.order.RecID, order)
        .then(doDetail)
        .catch(done);
    },
    //
    // Save Order Detail to AirTable
    //
    saveOrderDetail() {
      //
      // Done
      //
      const done = (err) => {
        if (err) {
          console.error(err);
          return;
        }
      };

      var Airtable = require("airtable");

      Airtable.configure({
        endpointUrl: "https://api.airtable.com",
        apiKey: this.$auth.user["https://app.madriverfloralcollective.com/airtable"],
      });
      var base = Airtable.base("apptDZu7d1mrDMIFp"); //MRFC

      //
      // Loop through detail and if Bunches is > 0 then
      // add or update the OrderDetail
      //
      for (let i = 0; i < this.orderDetails.length; i++) {
        // if (this.orderDetails[i].SKU.length > 0) {

        let detail = {
          Account: this.order.Account,
          SKU: this.orderDetails[i].SKU,
          Crop: this.orderDetails[i].Crop,
          Variety: this.orderDetails[i].Variety,
          Color: this.orderDetails[i].Color,
          Bunches: Number(this.orderDetails[i].Bunches),
          "Price per Bunch": Number(this.orderDetails[i]["Price per Bunch"]),
          "Stems per Bunch": Number(this.orderDetails[i]["Stems per Bunch"]),
          Extended: Number(this.orderDetails[i].Extended),
          OrderRecID: [this.order.RecID],
        };
        console.log("detail");
        console.log(detail);

        // If New and SKU and Bunches specified then create
        if (this.orderDetails[i].isNew && this.orderDetails[i].SKU.length > 0 && this.orderDetails[i].Bunches > 0) {
          base("OrderDetail")
            .create(detail)
            .catch(done);
        }

        // If existing and SKU and Bunches specified then update
        else if (!this.orderDetails[i].isNew && this.orderDetails[i].SKU.length > 0 && this.orderDetails[i].Bunches > 0) {
          base("OrderDetail")
            .update(this.orderDetails[i].RecID, detail)
            .catch(done);
        }

        // If existing and SKU is blank then delete
        else if (!this.orderDetails[i].isNew && this.orderDetails[i].SKU.length == 0) {
          base("OrderDetail")
            .destroy(this.orderDetails[i].RecID)
            .catch(done);
        }

        // If existing and Bunches = 0 then delete
        else if (!this.orderDetails[i].isNew && this.orderDetails[i].Bunches == 0) {
          base("OrderDetail")
            .destroy(this.orderDetails[i].RecID)
            .catch(done);
        } else {
          console.log("No action taken?");
        }

        // }
      }
    },
    //
    // Get order from AirTable
    //
    getOrder() {
      //
      // Get Order Detail from AirTable
      //
      const getOrderDetail = (record) => {
        // Order Header
        this.order = record.fields;

        // Get Order Detail
        var selectRecord = {
          pageSize: 25,
          view: "fp-grid",
          // filterByFormula: 'Account = "' + account + '"',
          filterByFormula: 'OrderRecID = "' + record.id + '"',
        };

        base("OrderDetail")
          .select(selectRecord)
          .eachPage(page, orderDetailDone);

        // Populate model
        this.orderDetails = orderDetails;
      };

      //
      // Page
      //
      const page = (records, fetchNextPage) => {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          var orderDetail = record.fields;

          orderDetail.isNew = false;

          // orderDetail["Price per Bunch"] = Number(record["Price per Bunch"]).toFixed(2)
          orderDetail["Price per Bunch"] = Number(orderDetail["Price per Bunch"]).toFixed(2);

          let extended = Number(orderDetail["Price per Bunch"]) * Number(orderDetail.Bunches);

          orderDetail.Extended = extended.toFixed(2);

          orderDetails.push(orderDetail);
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      };

      //
      // Done
      //
      const done = (err) => {
        if (err) {
          console.error(err);
          return;
        }
      };

      // Done
      //
      const orderDetailDone = (err) => {
        if (err) {
          console.error(err);
          return;
        }
      };

      var orderDetails = [];

      var Airtable = require("airtable");

      var atConf = {
        endpointUrl: "https://api.airtable.com",
        apiKey: this.$auth.user["https://app.madriverfloralcollective.com/airtable"],
      };

      Airtable.configure(atConf);

      var base = Airtable.base("apptDZu7d1mrDMIFp"); //MRFC

      base("Order")
        .find(this.RecID) // Order #
        .then(getOrderDetail)
        .catch(done);
    },
    //
    // Get forecast records from AirTable
    //
    getForecastRecords() {
      //
      // Page
      //
      const page = (records, fetchNextPage) => {
        // This function (`page`) will get called for each page of records.
        records.forEach(function(record) {
          var rec = record.fields;
          recs.push(rec);
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      };

      //
      // Done
      //
      const done = (err) => {
        if (err) {
          console.error(err);
          return;
        }
      };

      var recs = [];
      var Airtable = require("airtable");
      var atConf = {
        endpointUrl: "https://api.airtable.com",
        apiKey: this.$auth.user["https://app.madriverfloralcollective.com/airtable"],
      };

      Airtable.configure(atConf);
      var base = Airtable.base("apptDZu7d1mrDMIFp"); //MRFC
      var selConf = {
        // maxRecords: 999,
        pageSize: 100,
        view: "MRFC Grid Public",
      };

      base("Forecast (MRFC)")
        .select(selConf)
        .eachPage(page, done);

      // Populate model
      this.forecastRecords = recs;
    },

    scrollUp() {
      window.scrollTo({ top: this.scrollToPoint, behavior: "smooth" });
    },
    handleScroll() {
      if ((this.scrollToPoint && document.documentElement.scrollTop > this.scrollToPoint) || document.body.scrollTop > this.scrollToPoint > this.scrollToPoint) {
        this.showScrollUp = true;
      } else {
        this.showScrollUp = false;
      }
    },
    toDollarSings(tier) {
      switch (tier) {
        case 1:
          return "$";
        case 2:
          return "$";
        case 3:
          return "$$";
        case 4:
          return "$$";
        case 5:
          return "$$$";
        case 6:
          return "$$$";
        default:
          return "NA";
      }
    },
  },
  mounted() {
    this.getForecastRecords();
    this.getOrder();

    window.addEventListener("scroll", this.handleScroll);
  },

  computed: {
    filteredForecast() {
      let filteredList = this.forecastRecords;
      // DEVTODO filter out items already selected in orderDetails
      // For each record in forcast, if record does not contain the selected color remove it from the list
      // Right now this does not work for Mixes, but if Color was an Array it would
      if (this.checkedColors.length > 0) {
        filteredList = filteredList.filter((rec) => {
          return this.checkedColors.includes(rec.Color.toLowerCase());
        });
      }

      // filter by search term (if 3 characters or longer)
      if (this.searchTerm.length > 2) {
        filteredList = filteredList.filter((rec) => {
          let cropVarietySKU = rec.Crop + " " + rec.Variety + " " + rec.SKU;

          return cropVarietySKU.toLowerCase().includes(this.searchTerm.toLowerCase());
        });
      }

      if (this.priceRange) {
        console.log("filter by price");
        filteredList = filteredList.filter((rec) => {
          return parseInt(rec.Tier) <= this.priceRange;
        });
      }

      // Filter out any record in the search result that does not belong to one of the selected categories
      if (this.checkedCategories.length > 0) {
        filteredList = filteredList.filter((rec) => {
          return this.checkedCategories.includes(rec.Category);
        });
      }

      // if search criteria have been provided, return result of search. else return the unfiltered forecast
      if (this.checkedCategories.length > 0 || this.checkedColors.length > 0 || this.searchTerm.length > 2 || this.priceRange) {
        return filteredList;
      } else {
        return this.forecastRecords;
      }
    },
    dollarSigns() {
      return this.toDollarSings(this.priceRange);
    },
    runningTotal() {
      let sum = 0;

      this.orderDetails.forEach((rec) => {
        sum += Number(rec.Extended);
      });

      return sum;
    },
  },
};
</script>

<style scoped>
/* possible button styling instead of bootstrap's primary */
.btn-primary-custom {
  background-color: #f4c9c9;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
}

.bottom-row {
  font-size: 0.75em;
}

#priceFilter {
  display: flex;
  flex-flow: column nowrap;
  color: grey;
  margin-left: 1em;
  margin-right: 1em;
}

span.badge {
  font-size: 0.7em;
  font-weight: 400;
}

.lineItem {
  border: solid 2px lightgray;
  border-radius: 0.25em;
  margin: 0.5em 0;
  padding: 0.5em 0.5em;
}

#addItemBtn {
  color: gray;
}
#addItemBtn:hover {
  cursor: pointer;
}

i.color-dot {
  border-radius: 50%;
}

li {
  list-style-type: none;
}

ul {
  padding-left: 0;
}

p {
  margin-bottom: 0;
}

#scroll-btn {
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 10px;
  margin-bottom: 20px;
}

.fa-chevron-up {
  color: gray;
}

.hide-item {
  display: none;
}

.selected-li{
  background-color: red;
}
</style>
