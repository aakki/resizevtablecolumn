import Vue from 'vue';
import Vuetify from 'vuetify/lib';

const ICONS = {
    checkboxOn: 'check_box',
    checkboxOff: 'check_box_outline_blank'
};

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // 'md' || 'mdiSvg' || 'md' || 'fa' || 'fa4',
        values: ICONS
    },
    theme: {
        themes: {
            light: {
                primary: '#41B6E6',
                secondary: '#00B140',
                accent: '#9063CD',
                white: '#FFFFFF',
                black: '#27251F',
                purple: '#9063CD',
                red: '#EE2737',
                green: '#00B140',
                blue: '#41B6E6',
                error: '#EE2737'
            },
        },
        options: {
            customProperties: true
        }
    }
});
