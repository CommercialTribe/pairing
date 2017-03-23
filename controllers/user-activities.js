var activityService = require('../services/activity-service');
var userService = require('../services/user-service');

function _getUsers(ids) {
	if (!Array.isArray(ids)) {
		throw new Error("ids must be an array");
	}

	return userService
		.getAllByIdsAsync(ids);
}

function _getActivities(ids) {
	if (!Array.isArray(ids)) {
		throw new Error("ids must be an array");
	}

	return activityService
		.getAllByIdsAsync(ids);
}

function _buildActivityObject(activity, user) {
	return {
		activityName: activity.name,
		ownerId: user.id,
		activityId: activity.id,
		ownerName: user.name
	};
}

function getActivityByIdAsync(actId) {
	return _getActivities([actId])
		.then(activities => {
			const activity = activities[0];
			const userId = activity.ownerId;

			return _getUsers([userId])
				.then(users => {
					const user = users[0];
					return [activity, user];
				});
		})
		.then(([activity, user]) => {
			return [_buildActivityObject(activity, user)];
		})
}

function getActivitiesByOwnersAsync(ownerIds) {
	return Promise
		.all([
			activityService.getAllAsync(),
			_getUsers(ownerIds)
		])
		.then(([activities, users]) => {

		})

}

function getActivitiesByOwnerAsync(ownerId) {
	return _getUsers([ownerId])
		.then(users => {
			const user = users[0];

			return activityService.getAllAsync().then(acts => {
				const activities = acts.filter(activity => {
					return activity.ownerId == ownerId;
				});

				return [activities, user];
			});
		})
		.then(([activities, user]) => {
			return activities.map(activity => (
				_buildActivityObject(activity, user)));
		});
}

module.exports = {
	getActivityByIdAsync,
	getActivitiesByOwnerAsync,
	getActivitiesByOwnersAsync
}