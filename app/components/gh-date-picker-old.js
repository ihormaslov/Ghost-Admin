import Component from '@ember/component';
import moment from 'moment';
import {computed} from '@ember/object';
import {isBlank, isEmpty} from '@ember/utils';
import {or, reads} from '@ember/object/computed';
import {inject as service} from '@ember/service';

export default Component.extend({
    settings: service(),

    tagName: '',

    date: '',
    errors: null,
    dateErrorProperty: null,

    _minDate: null,
    _maxDate: null,

    blogTimezone: reads('settings.activeTimezone'),
    hasError: or('dateError', 'timeError'),

    timezone: computed('blogTimezone', function () {
        let blogTimezone = this.blogTimezone;
        return moment.utc().tz(blogTimezone).format('z');
    }),

    dateError: computed('errors.[]', 'dateErrorProperty', function () {
        let errors = this.errors;
        let property = this.dateErrorProperty;

        if (errors && !isEmpty(errors.errorsFor(property))) {
            return errors.errorsFor(property).get('firstObject').message;
        }

        return '';
    }),

    didReceiveAttrs() {
        let date = this.date;
        let minDate = this.minDate;
        let maxDate = this.maxDate;
        let blogTimezone = this.blogTimezone;

        if (!isBlank(date)) {
            this.set('_date', moment(date));
        } else {
            this.set('_date', moment().tz(blogTimezone));
        }

        // unless min/max date is at midnight moment will diable that day
        if (minDate === 'now') {
            this.set('_minDate', moment(moment().format('YYYY-MM-DD')));
        } else if (!isBlank(minDate)) {
            this.set('_minDate', moment(moment(minDate).format('YYYY-MM-DD')));
        } else {
            this.set('_minDate', null);
        }

        if (maxDate === 'now') {
            this.set('_maxDate', moment(moment().format('YYYY-MM-DD')));
        } else if (!isBlank(maxDate)) {
            this.set('_maxDate', moment(moment(maxDate).format('YYYY-MM-DD')));
        } else {
            this.set('_maxDate', null);
        }
    },

    actions: {
        // if date or time is set and the other property is blank set that too
        // so that we don't get "can't be blank" errors
        setDate(date) {
            if (date !== this._date) {
                this.setDate(date);
            }
        }
    }
});
