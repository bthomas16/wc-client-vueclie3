<template>
    <b-container fluid>
        <b-row class="w-100" no-gutters>
            <b-col>

                <!-- Button to manage collection Collection -->
                <b-row class=" mb-2 mb-md-2 relative" no-gutters align-h="center">
                    <b-col cols="12" md="10" class="border-bottom"></b-col>
                    <b-col cols="12" md="10" class="px-2 px-md-0">
                        <b-row no-gutters align-h="between" align-v="center">
                            <b-col cols="12">
                                <strong v-if="isTryingShuffle" class="left red h4 m-h2" >*Can't organize while Managing Collection</strong>
                            </b-col>
                            <b-col cols="12" md="6" class="left-align gray bold h4 m-h2 my-1" v-if="isManagingCollection" >
                                <b-btn variant="outline-success" class="p-1 px-2 green pointer" @click="toggleIsManagingCollection">Done</b-btn>
                                <b-btn v-if="sortCategory != null || searchTermToFilterBy != ''" variant="outline-secondary" class="p-1 px-2 ml-4 pointer" @click="resetCollectionFilter">Reset Filters</b-btn>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>

            <!-- FILTER & SORT WATCH ARRAY -->
                <b-row ref="sortFilterId" class="px-0 px-md-2" align-v="start" align-h="center" v-if="isManagingCollection" no-gutters>
                    <b-col cols="4" md="5"  class="manage-btn-border px-2" >
                        <b-row align-v="start" align-h="center" id="watch-controls">
                            <b-col lg="6" cols="12" class="mx-auto center" >
                                <b-button id="manageButton" variant="default" class="m-h5 bg-light-blue white randomFont" block size="" @click="selectRandomWatch">Random Watch</b-button>
                            </b-col>
                            <b-col lg="6" cols="12" class="mt-2 mt-lg-0">
                                <b-button class="randomFont bg-green white" id="addWatchButton" variant="default" @click="addNewWatch" size="" block>Add Watch</b-button>
                            </b-col>
                        </b-row>
                        <b-row align-h="between" align-v="center" class="d-none d-lg-flex" no-gutters>
                            <b-col cols="2">
                                <b-col cols="12" class="mt-2 mt-md-3 nowrap">
                                    <b-form-checkbox
                                        id="toggleFlags"
                                        v-model="isShowEditFlags"
                                        :value="true"
                                        :unchecked-value="false">
                                        <span class="m-h3" v-if="!isShowEditFlags">Show Flags</span>
                                        <span class="m-h3" v-else>Hide Flags</span>
                                    </b-form-checkbox>
                                </b-col>
                            </b-col>
                            <b-col cols="7">
                                <button :class="currentCardSize == 'sm' ? 'btn m-2 bg-navy white border' : 'btn bg-darkgray m-2'" variant="primary" size="sm" @click="sizeCardToUse('sm')">sm</button>
                                <button :class="currentCardSize == 'md' ? 'btn m-2 bg-navy white border' : 'btn bg-darkgray m-2'" variant="primary" size="sm" @click="sizeCardToUse('md')">md</button>
                                <button :class="currentCardSize == 'lg' ? 'btn m-2 bg-navy white border' : 'btn bg-darkgray m-2 d-md-none'" class="d-inline-block d-lg-none d-xl-inline-block" variant="primary" size="sm" @click="sizeCardToUse('lg')">lg</button>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="8" md="7">
                        <b-row no-gutters>
                            <b-col cols="12" class="mx-auto selectWrapper">
                                <b-input-group prepend="&#9906;" class="px-1" size="">
                                    <b-form-input id="searchInput" type="text" placeholder="Search" size="" @input="filterBySearchTerm" v-model="searchTermToFilterBy"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row align-v="start" align-h="start" no-gutters class="mt-2">
                            <b-col cols="5" class="mx-auto px-1">
                                <b-form-select class="h6 m-h3" id="categoryOptions" :options="sortCategories" v-model="sortCategory" @change="selectSortCategory"></b-form-select>
                            </b-col>
                            <b-col cols="7" class="mx-auto px-1">
                                <b-form-select class="h6 m-h3" id="categoryOptions" :options="categoryOptions" v-model="categoryOption" @change="selectCategoryOption" :disabled="!sortCategory"></b-form-select>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>

                <b-row align-v="center" align-h="start" class="d-lg-none mt-2" v-if="isManagingCollection" no-gutters>
                    <b-col cols="4" md="5">
                        <b-col cols="12" md="auto" class="nowrap">
                            <b-form-checkbox
                                id="toggleFlags"
                                v-model="isShowEditFlags"
                                :value="true"
                                :unchecked-value="false">
                                <span class="m-h3" v-if="!isShowEditFlags">Show Flags</span>
                                <span class="m-h3" v-else>Hide Flags</span>
                            </b-form-checkbox>
                        </b-col>
                    </b-col>
                    <b-col cols="7" md="auto" offset="1" offset-md="0" class="nowrap">
                        <button :class="currentCardSize == 'sm' ? 'btn m-1 bg-navy white border' : 'btn bg-darkgray m-1'" variant="primary" size="sm" @click="sizeCardToUse('sm')">sm</button>
                        <button :class="currentCardSize == 'md' ? 'btn m-1 bg-navy white border' : 'btn bg-darkgray m-1'" variant="primary" size="sm" @click="sizeCardToUse('md')">md</button>
                        <button :class="currentCardSize == 'lg' ? 'btn m-1 bg-navy white border' : 'btn bg-darkgray m-1'" variant="primary" size="sm" @click="sizeCardToUse('lg')">lg</button>
                    </b-col>
                </b-row>

                <b-row v-if="!isManagingCollection" no-gutters>
                    <b-col class="mx-auto" cols="11" md="8">
                        <b-btn variant="default" class="white my-0 bg-light-blue" size="sm" @click="toggleIsManagingCollection" block>Manage Collection</b-btn>
                    </b-col>
                </b-row>
                <b-row no-gutters align-v="center" align-h="between" id="mobileRow" class="w-75 mx-auto px-3 px-md-5 mt-md-2" v-if="!isManagingCollection">
                    <b-col cols="4" md="auto" class="mt-1 mt-md-0 left-align left nowrap">
                        <b-form-checkbox
                            id="toggleFlags"
                            v-model="isShowFlags"
                            :value="true"
                            :unchecked-value="false">
                            <span class="m-h3" v-if="!isShowFlags">Show Flags</span>
                            <span class="m-h3" v-else>Hide Flags</span>
                        </b-form-checkbox>
                    </b-col>
                    <b-col cols="8" md="auto" class="nowrap">
                        <button :class="currentCardSize == 'sm' ? 'btn m-2 bg-navy white border' : 'btn bg-darkgray m-2'" variant="primary" size="sm" @click="sizeCardToUse('sm')">sm</button>
                        <button :class="currentCardSize == 'md' ? 'btn m-2 bg-navy white border' : 'btn bg-darkgray m-2'" variant="primary" size="sm" @click="sizeCardToUse('md')">md</button>
                        <button :class="currentCardSize == 'lg' ? 'btn m-2 bg-navy white border' : 'btn bg-darkgray m-2'" variant="primary" size="sm" @click="sizeCardToUse('lg')">lg</button>
                    </b-col>
                </b-row>
            </b-col>

        <!-- END MANAGE COLLECTION -->
        <!-- END MANAGE COLLECTION -->
        <!-- END MANAGE COLLECTION -->
        <!-- END MANAGE COLLECTION -->
        <!-- END MANAGE COLLECTION -->

        </b-row>
    </b-container>
</template>
<script>
export default {
  name: 'manageCollection',
  props: [],

  data () {
    return {
      conditionToFilterBy: '',
      styleToFilterBy: '',
      statusToFilterBy: '',
      searchTermToFilterBy: '',

      sortCategory: null,
      sortCategories: [
        { value: null, text: 'Sort By', disabled: true },
        { value: 'condition', text: 'Condition' },
        { value: 'status', text: 'Status' },
        { value: 'style', text: 'Style' },
        { value: 'favorites', text: 'Favorites' },
        { value: 'previous', text: 'Removed' }
      ],

      categoryOptions: [{ value: null, text: 'Select Options', disabled: true }],
      categoryOption: null
    }
  },
  methods: {
    sizeCardToUse (val) {
      this.$store.dispatch('sizeCardToUse', val).then(() => {

      })
    },

    toggleIsManagingCollection () {
      this.resetCollectionFilter()
      this.$store.dispatch('toggleIsManagingCollection')
    },

    selectSortCategory (eventValue) {
      this.searchTermToFilterBy = ''
      this.sortCategory = eventValue
      this.categoryOption = null

      switch (eventValue) {
        case 'condition':
          this.categoryOptions = [
            { value: null, text: 'Select Condition', disabled: true },
            { value: 8, text: '8-10' },
            { value: 5, text: '5-7' },
            { value: 1, text: '0-4' }
          ]
          break
        case 'status':
          this.categoryOptions = [
            { value: null, text: 'Select Status', disabled: true },
            { value: 'keeper', text: 'Keeper' },
            { value: 'sale', text: 'For Sale' },
            { value: 'trade', text: 'For Trade' },
            { value: 'fsot', text: 'Sale / Trade' }
          ]
          break
        case 'style':
          this.categoryOptions = [
            { value: null, text: 'Select Style', disabled: true },
            { value: 'diver', text: 'Diver' },
            { value: 'dress', text: 'Dress' },
            { value: 'chronograph', text: 'Chronograph' },
            { value: 'tourbillon', text: 'Tourbillon' },
            { value: 'black tie', text: 'Black Tie' },
            { value: 'sport', text: 'Sport' },
            { value: 'smart', text: 'Smart' },
            { value: 'apple', text: 'Apple' },
            { value: 'casual', text: 'Casual' },
            { value: 'orienteering', text: 'Orienteering' }
          ]
          break
        case 'favorites':
          this.selectCategoryOption('all')
          this.categoryOptions = [
            { value: 'all', text: 'All Favorites' }
            // { value: 'inCollection', text: 'Favorites in Collection'},
            // { value: 'notInCollection', text: 'Favorites not in Collection'},
            // { value: 'pastFavorites', text: 'Previous Favorites'},
          ]
          break
        case 'previous':
        //   this.searchTermToFilterBy = null
          this.selectCategoryOption('all')
          this.categoryOptions = [
            { value: 'all', text: 'All Previous' }
          ]
          break
        default:
          this.sortCategory = null
          this.categoryOption = null
          this.categoryOptions = [{ value: null, text: 'Select Options', disabled: true }]
      }
    },

    selectCategoryOption (eventValue) {
      this.categoryOption = eventValue
      this.filterCollection(this.sortCategory, this.categoryOption)
    },

    filterCollection (sortCategory, categoryOption) {
      let filterObj = {
        category: sortCategory,
        option: categoryOption
      }
      this.$store.dispatch('isTryingShuffleWhileManage', false) 
      this.$store.dispatch('getFilteredCollection', filterObj)
        if (sortCategory != 'previous') {
          this.$store.dispatch('viewingPreviousWatches', false)
      }
    },

    filterBySearchTerm (eventValue) {
    if (eventValue) {
        this.$store.dispatch('isTryingShuffleWhileManage', false) 
        this.$store.dispatch('getFilteredCollectionBySearchTerm', eventValue.toLowerCase())
      }
    },

    selectRandomWatch () {
      this.$emit('selectRandomWatch')
    },

    addNewWatch () {
      this.$emit('addNewWatch')
      this.isAddingWatch = true
      this.isEditingExistingWatch = false
    },

    resetCollectionFilter () {
      this.selectSortCategory()
      this.$store.dispatch('viewingPreviousWatches', false)
      this.$store.state.FilteredCollection = this.$store.state.Collection // TODO: BAD, Brent!
      this.$store.dispatch('isTryingShuffleWhileManage', false) 
    }

  },

  computed: {
    isManagingCollection: {
      get () {
        return this.$store.state.isManagingCollection
      },
      set (value) {
        this.$store.dispatch('toggleIsManagingCollection')
      }
    },

    isShowFlags: {
      get () {
        return this.$store.state.isShowFlags
      },
      set (value) {
        this.$store.dispatch('toggleIsShowFlags')
      }
    },

    isShowEditFlags: {
      get () {
        return this.$store.state.isShowEditFlags
      },
      set (value) {
        this.$store.dispatch('toggleIsShowEditFlags', value)
      }
    },

    currentCardSize () {
      return this.$store.state.CurrentCardSize
    },

    isTryingShuffle() {
        return this.$store.state.isShuffleWhileManage
    }
  }

}
</script>
<style scoped>
    .form-control {
        padding: .25rem;
    }

    .randomFont {
        font-size: 1rem;
        height: 2.35rem;
    }

    /* .btn {
        height:2.75em;
    } */

    .btn:focus {
        outline: none;
        border:none;
    }

    @media(max-width: 750px) {
    #mobileRow {
        width: 100% !important;
    }

    .randomFont {
        font-size: .75rem;
    }
}

@media(max-width: 750px) {
    #mobileRow {
        width: 100% !important;
    }
}


@media(max-width: 550px) {
    #mobileRow {
        width: 100% !important;
    }
}
</style>
