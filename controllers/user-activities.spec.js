const userActivitiesCtrl = require('./user-activities');

describe('user-activities', () => {
	beforeEach(() => {
	});

	it('has getActivityById defined', () => {
		expect(userActivitiesCtrl.getActivityById).toBeDefined();
	});

	it('returns the activity for the given id', () => {
		expect(userActivitiesCtrl.getActivityById(1)).toEqual([
				{
					activityName: 'Certification',
					activityId: 1,
					ownerName: 'Tyler',
					ownerId: 1
				}
			]
		);
	});

	it('has getActivityByOwners defined', () => {
		expect(userActivitiesCtrl.getActivityByOwners).toBeDefined();
	});

});