import Controller, {inject as controller} from '@ember/controller';
import {readOnly} from '@ember/object/computed';
import {inject as service} from '@ember/service';

/* eslint-disable ghost/ember/alias-model-in-controller */
export default Controller.extend({

    postsController: controller('posts'),
    session: service(),
    ui: service(),

    availableTypes: readOnly('postsController.availableTypes'),
    selectedType: readOnly('postsController.selectedType'),
    availableTags: readOnly('postsController.availableTags'),
    selectedTag: readOnly('postsController.selectedTag'),
    availableAuthors: readOnly('postsController.availableAuthors'),
    selectedAuthor: readOnly('postsController.selectedAuthor'),
    availableExperts: readOnly('postsController.availableExperts'),
    selectedExpert: readOnly('postsController.selectedExpert'),
    availableOrders: readOnly('postsController.availableOrders'),
    selectedOrder: readOnly('postsController.selectedOrder')
});
