<template>
  <div v-if="isMapReady">
    <l-map
      :zoom="zoom"
      :center="center"
      style="width: 100vw; height: 100vh"
      @click="clickOnMapEvent"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <template v-for="(marker, i) in markers">
        <l-marker
          :key="i"
          v-if="marker.latitude && marker.longitude"
          :lat-lng="[marker.latitude, marker.longitude]"
          :icon="icon"
          @click="clickOnMarkerEvent(marker)"
        />
      </template>
    </l-map>
    <v-dialog v-model="stationDialog" persistent max-width="600">
      <v-card class="d-flex flex-column align-center justify-space-between px-4">
        <v-row justify="space-between" class="my-8 px-2" style="width: 100%;">
          <v-icon
            x-large
            color="purple"
          >
            local_gas_station
          </v-icon>
          <v-btn
            icon
            color="primary"
            @click="stationDialog = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-row>
        <v-card-text v-if="form">
          <v-row>
            <v-col class="px-4 py-8">
              <v-row>
                <v-text-field
                  v-model="form.name"
                  label="Station name"
                  :error="$v.form.name.$dirty && $v.form.name.$invalid"
                  @blur="$v.form.name.$touch()"
                />
              </v-row>
              <v-row>
                <v-text-field
                  v-model="form.address"
                  label="Address"
                  :error="$v.form.address.$dirty && $v.form.address.$invalid"
                  @blur="$v.form.address.$touch()"
                />
              </v-row>
              <v-row>
                <v-text-field
                  v-model="form.city"
                  label="City"
                  :error="$v.form.city.$dirty && $v.form.city.$invalid"
                  @blur="$v.form.city.$touch()"
                />
              </v-row>
              <v-row>
                <v-col v-for="(type, i) in fuelTypes" :key="i" cols="4">
                  <v-row>
                    <span v-text="formatLabel(type)" class="text-capitalize" />
                  </v-row>
                  <v-row>
                    <v-text-field
                      :value="form.pumps[i].price"
                      @input="value => form.pumps[i].price = +value"
                      :error="$v.form.pumps.$each[`${i}`].price.$dirty && $v.form.pumps.$each[`${i}`].price.$invalid"
                      @blur="$v.form.pumps.$each[`${i}`].price.$touch()"
                    />
                  </v-row>
                  <v-row>
                    <v-select
                      v-model="form.pumps[i].available"
                      :items="availabilityItems"
                      item-value="value"
                      item-text="text"
                      :error="$v.form.pumps.$each[`${i}`].available.$dirty && $v.form.pumps.$each[`${i}`].available.$invalid"
                      @blur="$v.form.pumps.$each[`${i}`].available.$touch()" 
                      />
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-btn x-large block :disabled="$v.$dirty && $v.$invalid" color="purple" @click="validate">
                  Confirm
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { latLng, icon } from "leaflet";


export default {
  name: 'Home',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      isMapReady: false,
      zoom: 10,
      center: latLng(47.373878, 8.545094),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      icon: icon({
        iconUrl: require('../../../static/gas-station-point-svgrepo-com.svg'),
        iconSize: [48, 52],
        iconAnchor: [16, 37]
      }),
      form: null,
      stationDialog: false,
      fuelTypes: [
        'BENZIN_95',
        'BENZIN_98',
        'DIESEL'
      ],
      availabilityItems: [
        {
          value: true,
          text: 'Yes',
        },
        {
          value: false,
          text: 'No',
        },
      ]
    }
  },
  validations() {
    return {
      form: {
        name: { required },
        address: { required },
        city: { required },
        pumps: {
          $each: {
            price: { required },
            available: { required },
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({ markers: 'home/markers' }),
  },
  async created() {
    await this.$store.dispatch('home/getAllGasStations')
    this.isMapReady = true
  },
  methods: {
    generateId() {
      const { markers } = this
      const ids = markers.map(({ id }) => +id.split('_')[1])
      const nextAvailableId = ids.sort()[ids.length - 1] + 1
      return `MIGROL_${nextAvailableId}`
    },
    async clickOnMapEvent(e) {
      const { fuelTypes } = this
      const { latlng: { lat: latitude, lng: longitude } } = e
      const newStation = {
        id: this.generateId(),
        name: null,
        address: null,
        city: null,
        latitude,
        longitude,
        pumps: fuelTypes.map((fuel_type, i) => ({
          id: `1000${i + 1}`,
          fuel_type,
          price: 0,
          available: true,
        }))
      }

      const success = await this.$store.dispatch('home/postNewGasStation', newStation)
      if (success) await this.$store.dispatch('home/getAllGasStations')

    },
    async clickOnMarkerEvent(marker) {
      const { meta, ...rest } = marker
      this.form = rest
      this.stationDialog = true
    },
    async validate() {
      const { form } = this
      if (this.$v.$invalid) return
      const success = await this.$store.dispatch('home/updateGasStation', form)
      if (success) {
        this.stationDialog = false
        await this.$store.dispatch('home/getAllGasStations')
      }
    },
    formatLabel(type) {
      const split = type.split('_')
      return split
        .map(a => a.toLowerCase())
        .reduce((a, c) => `${a} ${c}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-dialog__content {
  z-index: 999 !important;
}
</style>
