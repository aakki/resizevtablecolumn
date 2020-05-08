<template>
    <div id="app">
        <v-toolbar dark color="primary" fixed>
            <v-toolbar-title class="white--text">Resizable Vuetify Table Demo</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-toolbar>
        <div class="my-4 mx-4">
            <FindDuplicates></FindDuplicates>
            <v-layout v-resize="onResize" column>
                <v-data-table :headers="headers"
                              :items="desserts"
                              v-resizable-columns
                              :class="{mobile: isMobile}"
                              :search="search"></v-data-table>

                <!--<v-data-table :headers="headers" :items="desserts" :search="search"
                              :class="{mobile: isMobile}" v-resizable-columns>
                    <template slot="items" slot-scope="props">
                        <tr v-if="!isMobile">
                            <td width="20%">{{ props.item.name }}</td>
                            <td width="20%">{{ props.item.calories }}</td>
                            <td width="15%">{{ props.item.fat }}</td>
                            <td width="15%">{{ props.item.carbs }}</td>
                            <td width="20%">{{ props.item.protein }}</td>
                            <td width="10%">{{ props.item.iron }}</td>
                        </tr>
                        <tr v-else>
                            <td>
                                <ul class="flex-content">
                                    <li class="flex-item" data-label="Name">{{ props.item.name }}</li>
                                    <li class="flex-item" data-label="Calories">{{ props.item.calories }}</li>
                                    <li class="flex-item" data-label="Fat (g)">{{ props.item.fat }}</li>
                                    <li class="flex-item" data-label="Carbs (g)">{{ props.item.carbs }}</li>
                                    <li class="flex-item" data-label="Protein (g)">{{ props.item.protein }}</li>
                                    <li class="flex-item" data-label="Iron (%)">{{ props.item.iron }}</li>
                                </ul>
                            </td>
                        </tr>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>-->
            </v-layout>
        </div>
    </div>
</template>
<script>
    import desserts from '@/assets/data/desserts.json';
    import FindDuplicates from '@/components/FindDuplicates.vue';
    export default {
        data: () => ({
            search: '',
            isMobile: false,
            headers: [{
                text: 'Dessert (100g serving)',
                align: 'left',
                value: 'name'
            },
            {
                text: 'Calories',
                value: 'calories'
            },
            {
                text: 'Fat (g)',
                value: 'fat'
            },
            {
                text: 'Carbs (g)',
                value: 'carbs'
            },
            {
                text: 'Protein (g)',
                value: 'protein'
            },
            {
                text: 'Iron (%)',
                value: 'iron'
            }
            ],
            desserts: desserts
        }),
        components: {
            FindDuplicates
        },
        methods: {
            onResize() {
                if (window.innerWidth < 769)
                    this.isMobile = true;
                else
                    this.isMobile = false;
            }
        }
    }
</script>