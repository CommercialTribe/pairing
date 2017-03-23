describe('user-activities', () => {
	beforeEach(() => {
		this.userActivitiesCtrl = require('./user-activities');
		this.expectedSingle =
			[
				{
					activityName: 'Watch and Respond',
					ownerId: 2,
					activityId: 3,
					ownerName: 'Adam'
				}
			]
		this.expectedMultiple =
			[
				{
					activityName: 'Certification',
					ownerId: 1,
					activityId: 1,
					ownerName: 'Tyler'
				},
				{
					activityName: 'Benchmark',
					ownerId: 1,
					activityId: 2,
					ownerName: 'Tyler'
				}
			]
	});

	it('has getActivityById defined', () => {
		expect(this.userActivitiesCtrl.getActivityByIdAsync).toBeDefined();
	});

	describe('getActivityByIdAsync', () => {
		it('should return an array with one object', (done) => {
			return this
				.userActivitiesCtrl
				.getActivityByIdAsync(3)
				.then(results => {
					expect(results).toEqual(this.expectedSingle);
				})
				.then(done)
				.catch(done.fail);
		});

	});

	describe('getActivitiesByOwnerAsync', () => {
		it('should return an an array of activities by one owner', (done) => {
			return this
				.userActivitiesCtrl
				.getActivitiesByOwnerAsync(1)
				.then(results => {
					expect(results).toEqual(this.expectedMultiple);
				})
				.then(done)
				.catch(done.fail);
		})
	});

	describe('getActivitiesByOwnersAsync', () => {
		it('should return an array of activities by multiple owners', (done) => {
			return this
				.userActivitiesCtrl
				.getActivitiesByOwnersAsync([1, 2])
				.then(results => {
					expect(results).toEqual(this.expectedSingle.concat(this.expectedMultiple));
				})
				.then(done)
				.catch(done.fail);
		});
	});
});