import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeAll } from 'rxjs/operators';
import { Activity } from 'src/app/shared/models/activity';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { AppState } from 'src/app/store/app.state';
import { getActivities } from '../state/activities.selectors';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  activities!: (Activity & { signedUp?: boolean })[];
  selectedActivity!: Activity & { signedUp?: boolean };
  isFavorite?: boolean;
  constructor(
    private activityService: ActivityService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getActivities();
    this.getMyActivities();
    this.store.select(getActivities).subscribe((data) => console.log(data));
  }

  onSelect(activity: Activity): void {
    this.selectedActivity = activity;
  }

  getActivities(): void {
    this.activityService
      .getActivities()
      .subscribe((activities) => (this.activities = activities));
  }

  getMyActivities(): void {
    this.activityService
      .getMyActivities()
      .pipe(mergeAll())
      .subscribe((activity) => {
        const act = this.activities?.find((ac) => ac.id == activity.activityId);
        if (act) {
          act.signedUp = true;
        }
      });
  }
}
