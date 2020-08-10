<template>
<div class="md-layout table">      
   <div v-if='true' class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">

      <div class='md-card results_holder'>
        <h3>Filter Referrals</h3>
        <!-- From Date -->
        <div class="md-layout-item md-size-30 md-small-size-100">
          <md-datepicker v-model="fromDate">
            <label>From</label>
          </md-datepicker>
        </div>
        <!-- To Date -->
        <div class="md-layout-item md-size-30 md-small-size-100">
          <md-datepicker v-model="toDate">
            <label>To</label>
          </md-datepicker>
        </div>
        <div class="md-layout-item md-size-30 md-small-size-100">
          <button type="button" @click="setDateRange" class="md-button md-theme-default">
            <div class="md-ripple">
              <div class="md-button-content">
                <i class="md-icon md-icon-font material-icons md-theme-default">filter_list</i>
              </div>
            </div>
          </button>
          <button type="button" @click="resetDates" class="btn_red md-button md-theme-default">
            <div class="md-ripple">
                Reset
            </div>
          </button>
        </div>
      </div>
    </div>

    <div v-if='true' class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
    <md-card>
      <md-card-content>
        <md-table
          md-fixed-header
          :value="referrals"
          :md-sort.sync="currentSort"
          :md-sort-order.sync="currentSortOrder"
          :md-sort-fn="customSort"
          class="paginated-table table-striped table-hover"
        >
          <md-table-toolbar>
            <md-field>
              <label for="kiosks">Per page</label>
              <md-select v-model="pagination.perPage" name="kiosks">
                <md-option
                  v-for="item in pagination.perPageOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                  {{ item }}
                </md-option>
              </md-select>
            </md-field>
            <md-button @click="saveEmailsCSV(csvData)" id="export-csv-btn">
                <md-icon class="material-icons">save_alt</md-icon>
              </md-button>
            <!-- <md-field>
              <md-input
                type="search"
                class="mb-3"
                clearable
                style="width: 200px"
                placeholder="Search records"
                v-model="searchQuery"
              >
              </md-input> -->
            <!-- </md-field> -->
          </md-table-toolbar>

          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Name" md-sort-by="email">
              {{ item.referral }}
            </md-table-cell>
            <md-table-cell md-label="Date" md-sort-by="date">
              {{ getTime(item.created) }}
            </md-table-cell>
            <md-table-cell md-label="Kiosk" md-sort-by="kiosk">
              {{ item.kiosk }}
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-card-content>
      <md-card-actions md-alignment="space-between">
        <div class="">
          <p class="card-category">
            Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
          </p>
        </div>
        <pagination
          class="pagination-no-border pagination-success"
          v-model="pagination.currentPage"
          :per-page="pagination.perPage"
          :total="total"
        >
        </pagination>
      </md-card-actions>
    </md-card>
    </div>
  </div>

</template>

<script>
var moment = require('moment');
import { Pagination } from "@/components";
import Fuse from "fuse.js";
import { db } from "@/config/firebaseInit";
import Swal from "sweetalert2";
import router from "@/router";
import {
  StatsCard,
  ChartCard,
  ProductCard,
  AnimatedNumber,
  GlobalSalesCard,
  GlobalSalesTable
} from "@/components";

export default {
  components: {
    Pagination,
    StatsCard,
    AnimatedNumber
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    }
  },
  data() {
    return {
      colors: ['blue','rose','warning','green'],
      currentSort: "date",
      currentSortOrder: "asc",
      pagination: {
        perPage: 50,
        currentPage: 1,
        perPageOptions: [50, 100, 200],
        total: 0
      },
      footerTable: [
        "Kiosk",
        "Description",
        "Location",
        "Last Signal",
        "Init URL","Actions",""
        ],
      searchQuery: "",
      propsToSearch: [
        "description",
        "last_signal",
        "slug"
      ],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
      referrals:[],
      fromDate: '',
      toDate: ''
    };
  },
  firestore() {
    return {
      referrals: db.collection("referral"),
    };
  },
  methods: {
    setDateRange() {
     this.queriedData()
    },
    queriedData() {
      console.log("Run query data")
      let tempReferral = []
       if(this.fromDate && this.toDate){
      let fromTimestamp = moment(this.fromDate).unix()*1000
      let toTimestamp = moment(this.toDate).unix()*1000
     var subscribe = db.collection("referral").where("created",">=",fromTimestamp).where("created","<=",toTimestamp).orderBy("created").onSnapshot(result=>{
        result.docs.forEach(e=>{
          tempReferral.push(e.data())
        })
        this.referrals = tempReferral
        subscribe()
    })
      }else if(this.fromDate){
      let fromTimestamp = moment(this.fromDate).unix()*1000
     var subscribe =  db.collection("referral").where("created",">=",fromTimestamp).orderBy("created").onSnapshot(result=>{
        result.docs.forEach(e=>{
          tempReferral.push(e.data())
        })
        this.referrals = tempReferral
        subscribe()
    })
      }
      else if(this.toDate){
        let toTimestamp = moment(this.toDate).unix()*1000
        var subscribe = db.collection("referral").where("created","<=",toTimestamp).orderBy("created").onSnapshot(result=>{
        result.docs.forEach(e=>{
          tempReferral.push(e.data())
        })
        this.referrals = tempReferral
        subscribe()
    })
      }else{
      var subscribe =    db.collection("referral").orderBy("created").onSnapshot(result=>{
        result.docs.forEach(e=>{
          tempReferral.push(e.data())
        })
        this.referrals = tempReferral
        subscribe()
    })
      }
    },
    resetDates() {
      this.allEmails = true
      this.fromDate = null
      this.toDate = null
    },
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },
    filterByDate(emails){
      let newEmails = emails.sort(function(a,b){
        return new Date(b.created) - new Date(b.created);
      });
      return newEmails
    },
    getTime(time){
      return moment(time).format('LLL');
    },
    saveEmailsCSV() {
      let vm = this;
      let referrals = vm.tableData;

      let filteredReferrals = referrals.map(referral => ({
        Created: moment(referral.created).format("MM/DD/YYYY"),
        FirstName: referral.first_name,
        LastName: referral.last_name,
        FullName: referral.referral,
        Name: referral.name,
        Kiosk: referral.kiosk
      }))
      console.log(filteredReferrals);

      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [
        Object.keys(filteredReferrals[0]).join(";"),
        ...filteredReferrals.map(item => Object.values(item).join(";"))
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "export.csv");
      link.click();
    }
  },
  created() {
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["name", "url"],
      threshold: 0.3
    });
    this.queriedData()
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    }
  }
};
</script>

<style lang="css">
  .paginated-table .md-table-head-container.md-ripple,.md-table.md-theme-default .md-table-row td,.paginated-table .md-table-cell:last-child .md-table-cell-container, .paginated-table .md-table-head:last-child,.paginated-table .md-table-cell:last-child .md-table-cell-container, .paginated-table .md-table-head:last-child {
    text-align: left !important;
    justify-content: flex-start;
  }
</style>
