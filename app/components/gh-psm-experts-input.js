import Component from '@ember/component';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Component.extend({

    store: service(),

    // public attrs
    selectedExperts: null,
    tagName: '',
    triggerId: '',

    // internal attrs
    availableExperts: null,

    // closure actions
    updateExperts() {},

    availableExpertNames: computed('availableExperts.@each.name', function () {
        return this.availableExperts.map(expert => expert.get('name').toLowerCase());
    }),

    init() {
        this._super(...arguments);
        // perform a background query to fetch all users and set `availableExperts`
        // to a live-query that will be immediately populated with what's in the
        // store and be updated when the above query returns
        this.store.query('user', {limit: 'all'});
        this.set('availableExperts', this.store.peekAll('user'));
    },

    actions: {
        updateExperts(newExperts) {
            this.updateExperts(newExperts);
        }
    }

});
