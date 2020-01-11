import PostModel from './post-base';
import attr from 'ember-data/attr';

export default PostModel.extend({
    callDate: attr('moment-utc')
});
