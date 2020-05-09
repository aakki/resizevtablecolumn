<template>
    <div class="text-right">
        <!--width="1380"-->
        <v-dialog v-model="dialog"
                  height="800" style="overflow:hidden;">
            <template v-slot:activator="{ on }">
                <v-btn color="primary"
                       dark
                       class="my-4"
                       v-on="on">
                    Open Duplicates
                </v-btn>
            </template>

            <div>
                <div class="mb-8">
                    <v-btn icon class="close"
                           @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
                <v-card class="custom-card">
                    <v-card-text class="custom-card-text">
                        <v-row>
                            <v-col cols="8" lg="8" sm="12">
                                <div class="headline lighten-2"
                                     primary-title>
                                    <v-row>
                                        <v-col md="11" xs="11">
                                            Search for duplicates
                                        </v-col>
                                        <!--<v-col md="1" xs="1" class="dialog-close">
                                            <v-btn icon
                                                   @click="dialog = false">
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                        </v-col>-->
                                    </v-row>
                                </div>
                                <div class="search-card mb-4">
                                    <v-row cols="12" sm="6" md="12">
                                        <v-col>
                                            <v-text-field v-model="search" label="Search"
                                                          append-icon="mdi-magnify"
                                                          single-line
                                                          clearable
                                                          placeholder="Search"
                                                          hide-details
                                                          solo></v-text-field>
                                        </v-col>
                                        <v-col class="text-right">
                                            <h2>
                                                <strong>Total: {{duplicatesData.length}} records</strong>
                                            </h2>
                                            <span>Choose records to add to the duplicate set</span>
                                        </v-col>
                                    </v-row>
                                </div>

                                <!--<v-data-table :single-select="singleSelect"
                                show-select
                                item-key="id"
                                v-model="selectedData"
                                :headers="headers"
                                :items="duplicatesData"
                                append-icon="mdi-checkbox"
                                v-resizable-columns
                                :search="search"></v-data-table>-->

                                <v-data-table v-model="selectedData"
                                              :headers="headers"
                                              :items="duplicatesData"
                                              item-key="id"
                                              :search="search"
                                              :single-select="singleSelect"
                                              show-select>
                                    <!--<template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
                                        <slot :name="slot" v-bind="scope" />
                                    </template>-->
                                    <template slot="items" slot-scope="props">
                                        <tr v-on:click="showAlert(props.item)">
                                            <td>
                                                <v-checkbox color="darkblue" v-model="props.selected"
                                                            primary></v-checkbox>

                                                <!--hide-details-->
                                            </td>
                                            <td>{{ props.item.source }}</td>
                                            <td class="text-xs-right">{{ props.item.master_id }}</td>
                                            <td class="text-xs-right">{{ props.item.name }}</td>
                                            <td class="text-xs-right">{{ props.item.billing_street }}</td>
                                            <td class="text-xs-right">{{ props.item.lead_source }}</td>
                                            <td class="text-xs-right">{{ props.item.biling_state }}</td>
                                            <td class="text-xs-right">{{ props.item.biling_city }}</td>
                                            <td class="text-xs-right">{{ props.item.phone }}</td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col cols="4" lg="4" sm="12" class="no-padding">
                                <div class="card-details px-6 py-6">
                                    <div>
                                        <h3>
                                            <strong>{{duplicatesData[1].name}}</strong>
                                        </h3>
                                        <span>
                                            Account ID: {{duplicatesData[1].master_id}}
                                        </span>
                                    </div>
                                    <v-divider class="my-4"></v-divider>
                                    <div class="tbl-selected-records" v-if="selectedData.length>0">
                                        <h4>Selected Records:</h4>
                                        <v-simple-table fixed-header class="border-none">
                                            <template v-slot:default>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Source</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(o, i) in selectedData"
                                                        :key="i">
                                                        <td>
                                                            <strong><ul><li>{{o.name}}</li></ul></strong>
                                                        </td>
                                                        <td>
                                                            {{o.source}}
                                                        </td>
                                                        <td class="text-right">
                                                            <v-btn icon @click="deleteRecords(i)">
                                                                <v-icon>mdi-delete</v-icon>
                                                            </v-btn>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tfoot class="footer">
                                                    <tr>
                                                        <td colspan="2">
                                                            <strong>Total: </strong>
                                                        </td>
                                                        <td>
                                                            <strong>{{selectedData.length}} records </strong>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </template>
                                        </v-simple-table>
                                    </div>
                                    <div v-if="selectedData.length>0">
                                        <v-btn color="darkblue" class="ma-2"
                                               dark style="float:right;"
                                               @click="doReview();">
                                            REVIEW
                                        </v-btn>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </div>
        </v-dialog>
    </div>
</template>

<script>
    import DuplicatesData from '@/assets/data/data.json';
    export default {
        data: () => ({
            dialog: false,
            singleSelect: false,
            selectedData: [],
            search: '',
            headers: [{
                text: 'Source',
                align: 'left',
                value: 'source'
            },
            {
                text: 'Master ID',
                value: 'master_id'
            },
            {
                text: 'Name',
                value: 'name'
            },
            {
                text: 'Billing Street',
                value: 'billing_street'
            },
            {
                text: 'Lead Source',
                value: 'lead_source'
            },
            {
                text: 'Biling State',
                value: 'biling_state'
            },
            {
                text: 'Biling City',
                value: 'biling_city'
            },
            {
                text: 'Phone',
                value: 'phone'
            }],
            duplicatesData: DuplicatesData
        }),
        methods: {
            doReview: function () {
                this.selectedData = [];
                this.dialog = false;
            },
            deleteRecords: function (item) {
                this.selectedData.splice(this.selectedData.indexOf(item), 1);
            },
            showAlert(a) {
                console.log(a.name);
                if (event.target.classList.contains('btn__content')) return;
                alert('Alert! \n' + a.name);
            }
        },
        computed: {
            show: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>