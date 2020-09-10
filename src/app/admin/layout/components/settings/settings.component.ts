import { Component, OnInit, OnDestroy } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  public settingsVisible: boolean = false;
  public activeTab = "setting";
  public currentTheme:string = "theme-blush";
  private ngUnsubscribe = new Subject();

  constructor(private layoutService: LayoutService) {
    this.layoutService.settingsShow.pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
      this.settingsVisible = value;
    });

    this.layoutService.themeChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
      this.currentTheme = value;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  toggleTab(tab:string){
    this.activeTab = tab;
  }

  /**
   * Dark Layout Function
   */
  turnDark() {
    this.layoutService.turnDark();
  }

  /**
   * Light Layout Function
   */
  turnLight() {
    this.layoutService.turnLight();
  }

  changeTheme(theme){
    this.layoutService.changeTheme(theme);
  }
}
