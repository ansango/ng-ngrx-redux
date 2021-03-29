import {
  Activity,
  ActivityCategory,
  ActivityLanguage,
  ActivitySubcategoryBeach,
} from 'src/app/shared/models/activity';

export interface ActivitiesState {
  activities: Activity[];
}

export const initialState: ActivitiesState = {
  activities: [
    {
      id: 1,
      name: 'Surfing',
      category: ActivityCategory.BEACH,
      subcategory: ActivitySubcategoryBeach.ACTIVITY,
      description:
        'Cras ultricies ligula sed magna dictum porta. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.',
      language: ActivityLanguage.EN,
      price: 20,
      date: new Date(2020, 10, 28),
      peopleRegistered: 1,
      adminId: 2,
    },
  ],
};
