// - should always return activity name, id, owner id, owner name
// - returns [{activityName, activityId, ownerName, ownerId}]
// - getActivityById(actId)
// - getActivitiesByOwners(userIds)
// - getActivitiesByOwner(userId)
const activityService = require('../services/activity-service.js');
const userService = require('../services/user-service.js');
const _ = require('lodash');

class userActivitiesCtrl {

	static getActivityById(id) {
		let user;
		let foundActivity;
		let activities = [];
    let activitiesById = activityService.getAllByIdsQ([id]);


		return _.map(activitiesById, (activity) => {
			foundActivity = activity;
			user = this.findUser(activity.ownerId)[0];
			return {
				activityName: foundActivity.name,
				activityId: foundActivity.id,
				ownerName: user.name,
				ownerId: user.id
			}
		})
	};

	static getActivityByOwners(ids) {
		let allActivities = activityService.getAllQ();

		let matchedActivities = allActivities.filter(
			(activity) => ids.indexOf(activity.ownerId) > -1
		);

		return _map(matchedActivities, activity => {
			return this.getActivityById(activity.id)
		});




	};

	static findUser(userId){
		return userService.getAllByIdsQ([userId]);
	}

}

module.exports = userActivitiesCtrl;

